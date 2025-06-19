import { useState, useRef, useEffect } from 'react';
import { Maximize2, Minimize2, X } from 'lucide-react';

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

interface WindowSize {
  width: number;
  height: number;
}

const RATE_LIMIT = 10; // messages per window
const TIME_WINDOW = 5 * 60 * 1000; // 5 minutes in milliseconds
const COOLDOWN = 1000; // 1 second between messages
const MIN_WIDTH = 300;
const MIN_HEIGHT = 400;
const MAX_WIDTH = 600;
const MAX_HEIGHT = 800;

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [windowSize, setWindowSize] = useState<WindowSize>({ width: 320, height: 384 });
  const [isResizing, setIsResizing] = useState(false);
  const [rateLimit, setRateLimit] = useState<RateLimit>(() => {
    const stored = localStorage.getItem('chatbot_ratelimit');
    return stored ? JSON.parse(stored) : {
      count: 0,
      resetTime: Date.now() + TIME_WINDOW,
      lastMessageTime: 0
    };
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Call greeting API when chat first opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const fetchGreeting = async () => {
        setIsLoading(true);
        try {
          const response = await fetch('https://my-portfolio-bot-production.up.railway.app/api/greeting', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const data = await response.json();
          const greetingMessage = { 
            text: data.greeting || 'Hello! How can I help you today?', 
            isUser: false,
            timestamp: Date.now()
          };
          setMessages([greetingMessage]);
        } catch (error) {
          console.error('Greeting API Error:', error);
          const fallbackMessage = { 
            text: 'Hello! I\'m Amit\'s AI assistant. How can I help you today?', 
            isUser: false,
            timestamp: Date.now()
          };
          setMessages([fallbackMessage]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchGreeting();
    }
  }, [isOpen]);

  // Save rate limit data to localStorage
  useEffect(() => {
    localStorage.setItem('chatbot_ratelimit', JSON.stringify(rateLimit));
  }, [rateLimit]);

  // Reset rate limit counter when time window expires
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
    
    // Check cooldown
    if (now - rateLimit.lastMessageTime < COOLDOWN) {
      return `Please wait ${((COOLDOWN - (now - rateLimit.lastMessageTime)) / 1000).toFixed(1)} seconds before sending another message.`;
    }

    // Check rate limit
    if (rateLimit.count >= RATE_LIMIT && now < rateLimit.resetTime) {
      const minutesLeft = Math.ceil((rateLimit.resetTime - now) / (60 * 1000));
      return `Message limit reached. Please wait ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''} before sending more messages.`;
    }

    return null;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const rateLimitError = checkRateLimit();
    if (rateLimitError) {
      const errorMessage = { text: rateLimitError, isUser: false };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    // Update rate limit
    setRateLimit(prev => ({
      ...prev,
      count: prev.count + 1,
      lastMessageTime: Date.now()
    }));

    const userMessage = { 
      text: inputMessage, 
      isUser: true,
      timestamp: Date.now() 
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://my-portfolio-bot-production.up.railway.app/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      const data = await response.json();
      const botMessage = { 
        text: data.reply || 'Sorry, I encountered an error.', 
        isUser: false,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('ChatBot API Error:', error);
      const errorMessage = { text: 'Sorry, I encountered an error.', isUser: false };
      setMessages(prev => [...prev, errorMessage]);
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

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !chatWindowRef.current) return;

      const rect = chatWindowRef.current.getBoundingClientRect();
      const newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, e.clientX - rect.left));
      const newHeight = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, e.clientY - rect.top));

      setWindowSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMinimize = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-600 transition-colors"
      >
        💬
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          ref={chatWindowRef}
          className={`absolute bottom-20 right-0 bg-white rounded-lg shadow-xl flex flex-col ${
            isExpanded ? 'bottom-4 right-4' : ''
          }`}
          style={{ 
            width: isExpanded ? '50vw' : `${windowSize.width}px`, 
            height: isExpanded ? '50vh' : `${windowSize.height}px`,
            cursor: isResizing ? 'nw-resize' : 'default'
          }}
        >
          {/* Header */}
          <div className="p-4 bg-blue-500 text-white rounded-t-lg cursor-move flex justify-between items-center">
            <h3 className="font-medium">Chat with Amit</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleExpand}
                className="p-1 hover:bg-blue-600 rounded transition-colors"
                title={isExpanded ? "Minimize" : "Expand"}
              >
                {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
              <button
                onClick={handleMinimize}
                className="p-1 hover:bg-blue-600 rounded transition-colors"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-bl-none">
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>

          {/* Resize Handle - Only show when not expanded */}
          {!isExpanded && (
            <div
              className="absolute bottom-0 left-0 w-6 h-6 cursor-nw-resize bg-gray-400 hover:bg-gray-500 transition-colors"
              onMouseDown={handleMouseDown}
              style={{ 
                borderBottomLeftRadius: '8px',
                background: 'linear-gradient(135deg, transparent 50%, #9ca3af 50%)'
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};
