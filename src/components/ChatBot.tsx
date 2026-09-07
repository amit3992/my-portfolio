import { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';

interface Message {
  text: string;
  isUser: boolean;
  timestamp?: number;
}

interface RateLimit {
  count: number;
  resetTime: number;
  lastMessageTime: number;
}

const getSessionId = (): string => {
  let id = localStorage.getItem('chatbot_session_id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('chatbot_session_id', id);
  }
  return id;
};

const RATE_LIMIT = 10;
const TIME_WINDOW = 5 * 60 * 1000;
const COOLDOWN = 1000;

// Parse message text into renderable segments
type Segment = { type: 'text' | 'bold'; content: string };

const parseSegments = (text: string): Segment[] => {
  const segments: Segment[] = [];
  const regex = /\*\*(.*?)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', content: text.slice(lastIndex, match.index) });
    }
    segments.push({ type: 'bold', content: match[1] });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    segments.push({ type: 'text', content: text.slice(lastIndex) });
  }

  return segments;
};

const MessageContent = ({ text }: { text: string }) => {
  const lines = text.split('\n');

  return (
    <>
      {lines.map((line, i) => {
        const trimmed = line.trim();
        const isBullet = /^[•\-*]\s+/.test(trimmed);
        const content = isBullet ? trimmed.replace(/^[•\-*]\s+/, '') : line;
        const segments = parseSegments(content);

        return (
          <span key={i}>
            {isBullet && <span>{'\u2022'} </span>}
            {segments.map((seg, j) =>
              seg.type === 'bold' ? (
                <strong key={j}>{seg.content}</strong>
              ) : (
                <span key={j}>{seg.content}</span>
              )
            )}
            {i < lines.length - 1 && <br />}
          </span>
        );
      })}
    </>
  );
};

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rateLimit, setRateLimit] = useState<RateLimit>(() => {
    const stored = localStorage.getItem('chatbot_ratelimit');
    return stored ? JSON.parse(stored) : {
      count: 0,
      resetTime: Date.now() + TIME_WINDOW,
      lastMessageTime: 0
    };
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const fetchGreeting = async () => {
        setIsLoading(true);
        try {
          const response = await fetch('https://my-portfolio-bot-production.up.railway.app/api/greeting', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-Session-ID': getSessionId(),
            },
          });

          const data = await response.json();
          setMessages([{
            text: data.greeting || "Hey! I'm Veda, Amit's assistant. Ask me anything about his work or experience.",
            isUser: false,
            timestamp: Date.now()
          }]);
        } catch {
          setMessages([{
            text: "Hey! I'm Veda, Amit's assistant. Ask me anything about his work or experience.",
            isUser: false,
            timestamp: Date.now()
          }]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchGreeting();
    }
  }, [isOpen]);

  useEffect(() => {
    localStorage.setItem('chatbot_ratelimit', JSON.stringify(rateLimit));
  }, [rateLimit]);

  useEffect(() => {
    const checkRateLimit = () => {
      if (Date.now() > rateLimit.resetTime) {
        setRateLimit({
          count: 0,
          resetTime: Date.now() + TIME_WINDOW,
          lastMessageTime: rateLimit.lastMessageTime
        });
      }
    };

    const interval = setInterval(checkRateLimit, 1000);
    return () => clearInterval(interval);
  }, [rateLimit]);

  const checkRateLimit = (): string | null => {
    const now = Date.now();

    if (now - rateLimit.lastMessageTime < COOLDOWN) {
      return 'Hold on, one moment...';
    }

    if (rateLimit.count >= RATE_LIMIT && now < rateLimit.resetTime) {
      const minutesLeft = Math.ceil((rateLimit.resetTime - now) / (60 * 1000));
      return `Let's take a breather! Try again in ${minutesLeft}m.`;
    }

    return null;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const rateLimitError = checkRateLimit();
    if (rateLimitError) {
      setMessages(prev => [...prev, { text: rateLimitError, isUser: false }]);
      return;
    }

    setRateLimit(prev => ({
      ...prev,
      count: prev.count + 1,
      lastMessageTime: Date.now()
    }));

    const userMessage = { text: inputMessage, isUser: true, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Build conversation history from existing messages (skip greeting, limit to last 10 turns)
    const history = messages
      .filter(m => m.text && m.text.trim())
      .slice(-10)
      .map(m => ({
        role: m.isUser ? 'user' : 'assistant',
        content: m.text,
      }));

    const botMessage: Message = { text: '', isUser: false, timestamp: Date.now() };
    setMessages(prev => [...prev, botMessage]);

    try {
      const response = await fetch('https://my-portfolio-bot-production.up.railway.app/api/chat/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': '8e77b3e8f9c24dd5a6d9e1f8a2b3c4d5e6f7a8b9',
          'X-Session-ID': getSessionId(),
        },
        body: JSON.stringify({ message: inputMessage, history }),
      });

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });
        const lines = text.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') break;
            try {
              const parsed = JSON.parse(data);
              accumulated += parsed.token;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { ...updated[updated.length - 1], text: accumulated };
                return updated;
              });
            } catch {
              // skip malformed chunks
            }
          }
        }
      }

      if (!accumulated) {
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...updated[updated.length - 1], text: 'Sorry, something went wrong.' };
          return updated;
        });
      }
    } catch (error) {
      console.error('ChatBot API Error:', error);
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { ...updated[updated.length - 1], text: 'Something went wrong. Try again?' };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-50 px-4 py-2 text-[14px]"
        style={{
          fontFamily: 'var(--sans)',
          fontWeight: 500,
          color: 'var(--ink)',
          background: 'transparent',
          border: '1px solid var(--hairline)',
          borderRadius: '6px',
        }}
      >
        Ask about Amit&apos;s work ↗
      </button>
    );
  }

  return (
    <div
      className="fixed z-50 flex flex-col overflow-hidden"
      style={{
        bottom: '20px',
        right: '20px',
        width: '340px',
        height: '480px',
        background: 'var(--bg)',
        border: '1px solid var(--hairline)',
        borderRadius: '6px',
      }}
    >
      {/* Header */}
      <div
        className="px-4 py-3 flex justify-between items-center"
        style={{
          borderBottom: '1px solid var(--hairline)',
        }}
      >
        <div>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)' }}>
            Ask about Amit&apos;s work
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
            Veda, Amit&apos;s AI assistant
          </p>
        </div>
        <button
          onClick={handleClose}
          aria-label="Close chat"
          className="p-1"
          style={{ color: 'var(--ink)', borderRadius: '4px' }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div
        className="flex-1 px-4 py-3 overflow-y-auto"
        style={{ background: 'var(--bg)' }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className="flex"
            style={{ justifyContent: message.isUser ? 'flex-end' : 'flex-start' }}
          >
            <div
              className="text-[14px] leading-relaxed"
              style={{
                maxWidth: '85%',
                padding: message.isUser ? '8px 12px' : '8px 0',
                marginBottom: '12px',
                background: message.isUser ? '#ECEAE5' : 'transparent',
                color: 'var(--ink)',
                borderRadius: message.isUser ? '6px' : '0',
              }}
            >
              <MessageContent text={message.text} />
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.text === '' && (
          <div className="flex" style={{ justifyContent: 'flex-start' }}>
            <div
              className="text-[14px] leading-relaxed"
              style={{
                maxWidth: '85%',
                padding: '8px 12px',
                marginBottom: '12px',
                background: 'transparent',
                color: 'var(--muted)',
                borderRadius: '6px',
              }}
            >
              &hellip;
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        className="px-3 py-3 flex items-center gap-2"
        style={{
          borderTop: '1px solid var(--hairline)',
          background: 'var(--bg)',
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask something..."
          className="flex-1 px-3 py-2 text-sm"
          style={{
            fontFamily: 'var(--sans)',
            background: 'transparent',
            border: '1px solid var(--hairline)',
            borderRadius: '6px',
            color: 'var(--ink)',
            outline: 'none',
          }}
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || isLoading}
          aria-label="Send message"
          className="p-2"
          style={{
            background: 'var(--ink)',
            color: 'var(--bg)',
            borderRadius: '6px',
            opacity: !inputMessage.trim() || isLoading ? 0.4 : 1,
          }}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};
