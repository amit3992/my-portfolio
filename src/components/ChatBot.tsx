import { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

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
            {isBullet && <span className="mr-1">{'\u2022'}</span>}
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
  const [hasBeenClosed, setHasBeenClosed] = useState(() => {
    return localStorage.getItem('chatbot_closed') === 'true';
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const location = useLocation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
    audioRef.current = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3');
    return () => {
      if (audioRef.current) {
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (location.pathname === '/' && !hasBeenClosed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        if (audioRef.current) {
          audioRef.current.play().catch(err => console.error('Error playing sound:', err));
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, hasBeenClosed]);

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
            text: data.greeting || 'Hey! Ask me anything about Amit.',
            isUser: false,
            timestamp: Date.now()
          }]);
        } catch {
          setMessages([{
            text: "Hey! I'm Amit's assistant. Ask me anything about his work or experience.",
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
    localStorage.setItem('chatbot_closed', 'true');
    setHasBeenClosed(true);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 transition-all duration-200"
        >
          <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="absolute bottom-0 right-0 w-[380px] h-[500px] bg-white rounded-2xl shadow-2xl shadow-black/10 flex flex-col overflow-hidden border border-gray-100"
          style={{ animation: 'chatSlideUp 0.25s ease-out' }}
        >
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-[15px]">Chat with Amit's AI</h3>
              <p className="text-blue-100 text-xs mt-0.5">Ask about experience, skills, projects</p>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3 bg-gray-50/50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 text-[14px] leading-relaxed ${
                    message.isUser
                      ? 'bg-blue-500 text-white rounded-2xl rounded-br-md'
                      : 'bg-white text-gray-700 rounded-2xl rounded-bl-md shadow-sm border border-gray-100'
                  }`}
                >
                  <MessageContent text={message.text} />
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.text === '' && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-400 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-100">
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-gray-100 bg-white">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask something..."
                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:bg-white transition-colors placeholder:text-gray-400"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="p-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-40 disabled:hover:bg-blue-500"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};
