import { useState, useRef, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import { Send, Mic, MicOff, Sparkles, MessageCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import api from "../utils/api";
import VoiceInput from "../components/VoiceInput";

function ChatAssistant() {
  const { isDarkMode, theme } = useTheme();
  const [messages, setMessages] = useState([
    {
      content: "Hello! I'm your Career Assistant 🤖. I'm here to help you with career guidance, especially for VTA, NTS, and German Tech programs in Sri Lanka. How can I assist you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleVoiceTranscript = (transcript) => {
    setCurrentMessage(transcript);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Detect current language from Google Translate
  useEffect(() => {
    const checkLanguage = () => {
      const select = document.querySelector('select.goog-te-combo');
      if (select) {
        setCurrentLang(select.value || 'en');
      }
    };
    
    // Check immediately
    checkLanguage();
    
    // Check periodically
    const interval = setInterval(checkLanguage, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setSpeechSupported(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      // Configure recognition
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.maxAlternatives = 1;
      
      // Set language based on current language
      const getLanguageCode = () => {
        const lang = currentLang || 'en';
        switch (lang) {
          case 'si': return 'si-LK'; // Sinhala (Sri Lanka)
          case 'ta': return 'ta-IN'; // Tamil (India) - closest available
          default: return 'en-US';   // English (US)
        }
      };
      
      recognitionRef.current.lang = getLanguageCode();
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setCurrentMessage(transcript);
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [currentLang]);

  // Update recognition language when language changes
  useEffect(() => {
    if (recognitionRef.current) {
      const getLanguageCode = () => {
        const lang = currentLang || 'en';
        switch (lang) {
          case 'si': return 'si-LK';
          case 'ta': return 'ta-IN';
          default: return 'en-US';
        }
      };
      recognitionRef.current.lang = getLanguageCode();
    }
  }, [currentLang]);

  const sendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    const userMessage = {
      content: currentMessage.trim(),
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");
    setIsLoading(true);

    try {
      const res = await api.post("/chat", { message: currentMessage.trim() });
      const botMessage = {
        content: res.data.reply,
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      const errorMessage = {
        content: "⚠️ I'm having trouble connecting right now. Please try again in a moment.",
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const suggestedQuestions = [
    "How can I apply to NTS without A/L biology?",
    "What is photosynthesis?",
    "How do I write a professional CV?",
    "Which VTA course is good for overseas work?",
    "Can you help me with a math problem?",
    "How do I register for German Tech electrical course?",
    "What's the salary for nurses in Sri Lanka?",
    "Tell me a motivational quote",
    "What are the requirements for VTA programs?",
    "How long does German Tech training take?",
    "I feel discouraged about my future",
    "What is cybersecurity?"
  ];

  const handleSuggestedQuestion = (question) => {
    setCurrentMessage(question);
  };

  const startSpeechRecognition = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 transition-all duration-500">
      <style jsx>{`
        /* Modern Chat Interface Animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-6px) rotate(1deg); }
          66% { transform: translateY(3px) rotate(-1deg); }
        }

        @keyframes pulse-gradient {
          0%, 100% {
            background: linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4);
            box-shadow: 0 0 30px rgba(99, 102, 241, 0.3);
          }
          50% {
            background: linear-gradient(135deg, #8b5cf6, #06b6d4, #10b981);
            box-shadow: 0 0 40px rgba(139, 92, 246, 0.4);
          }
        }

        @keyframes message-appear {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes typing-dots {
          0%, 20% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }

        .float-animation {
          animation: float 4s ease-in-out infinite;
        }

        .pulse-gradient {
          animation: pulse-gradient 3s ease-in-out infinite;
        }

        .message-appear {
          animation: message-appear 0.3s ease-out;
        }

        .typing-dot-1 { animation: typing-dots 1.5s infinite; }
        .typing-dot-2 { animation: typing-dots 1.5s infinite 0.3s; }
        .typing-dot-3 { animation: typing-dots 1.5s infinite 0.6s; }

        /* Enhanced chat message styling */
        .chat-message {
          white-space: pre-wrap;
          line-height: 1.7;
          font-size: 0.9rem;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        .chat-message p {
          margin-bottom: 0.75rem;
          line-height: 1.7;
        }

        .chat-message p:last-child {
          margin-bottom: 0;
        }

        .chat-message ul, .chat-message ol {
          margin: 0.75rem 0;
          padding-left: 1.5rem;
        }

        .chat-message li {
          margin-bottom: 0.5rem;
          line-height: 1.6;
        }

        .chat-message code {
          background-color: ${isDarkMode ? 'rgba(71, 85, 105, 0.8)' : 'rgba(99, 102, 241, 0.1)'};
          color: ${isDarkMode ? '#e2e8f0' : '#4f46e5'};
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-size: 0.8rem;
          font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
          font-weight: 500;
        }

        .chat-message pre {
          background-color: ${isDarkMode ? 'rgba(51, 65, 85, 0.9)' : 'rgba(99, 102, 241, 0.05)'};
          border: 1px solid ${isDarkMode ? 'rgba(71, 85, 105, 0.8)' : 'rgba(99, 102, 241, 0.2)'};
          padding: 1rem;
          border-radius: 0.75rem;
          overflow-x: auto;
          margin: 0.75rem 0;
        }

        .chat-message blockquote {
          border-left: 4px solid ${isDarkMode ? '#06b6d4' : '#6366f1'};
          background: ${isDarkMode ? 'rgba(6, 182, 212, 0.1)' : 'rgba(99, 102, 241, 0.05)'};
          padding: 1rem;
          border-radius: 0 0.5rem 0.5rem 0;
          margin: 0.75rem 0;
          font-style: italic;
        }

        .chat-message a {
          color: ${isDarkMode ? '#22d3ee' : '#4f46e5'};
          text-decoration: underline;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .chat-message a:hover {
          color: ${isDarkMode ? '#67e8f9' : '#6366f1'};
        }

        .chat-message h1, .chat-message h2, .chat-message h3 {
          color: ${isDarkMode ? '#ffffff' : '#1e293b'};
          font-weight: 600;
          margin: 1rem 0 0.5rem 0;
        }

        .chat-message strong {
          color: ${isDarkMode ? '#ffffff' : '#1e293b'};
          font-weight: 600;
        }

        /* Custom scrollbar */
        .chat-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .chat-scrollbar::-webkit-scrollbar-track {
          background: ${isDarkMode ? '#1e293b' : '#f1f5f9'};
          border-radius: 10px;
        }

        .chat-scrollbar::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? '#475569' : '#cbd5e1'};
          border-radius: 10px;
          transition: background 0.2s ease;
        }

        .chat-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${isDarkMode ? '#64748b' : '#94a3b8'};
        }
      `}</style>

        {/* Modern Header */}
        <div className="relative overflow-hidden">
          <div className={`${isDarkMode
            ? 'bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900'
            : 'bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-600'
          } transition-all duration-500`}>
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute top-1/2 -right-10 w-32 h-32 bg-cyan-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
              <div className="absolute -bottom-5 left-1/2 w-36 h-36 bg-purple-400/15 rounded-full blur-xl animate-pulse delay-500"></div>
            </div>

            <div className="relative max-w-6xl mx-auto px-4 py-16 sm:py-20">
              <div className="text-center">
                {/* Floating AI Avatar */}
                <div className="flex items-center justify-center mb-8">
                  <div className="relative">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 pulse-gradient rounded-3xl flex items-center justify-center float-animation shadow-2xl">
                      <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Career{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">
                    Assistant
                  </span>
                </h1>

                {/* Description */}
                <p className="text-lg sm:text-xl text-gray-100 max-w-3xl mx-auto mb-8 leading-relaxed">
                  Your AI-powered mentor for career guidance, academic support, and life advice.
                  Specialized in Sri Lankan education system with expertise in VTA, NTS, and German Tech programs.
                </p>

                {/* Feature badges */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  {[
                    { icon: "🎓", text: "Career Guidance" },
                    { icon: "📚", text: "Academic Help" },
                    { icon: "💡", text: "Life Advice" },
                    { icon: "🌟", text: "General Knowledge" }
                  ].map((badge, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium"
                    >
                      <span>{badge.icon}</span>
                      <span>{badge.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="mb-8">
              <div className="text-center mb-6">
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  💡 Popular Questions
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Click on any question to get started, or type your own!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {suggestedQuestions.slice(0, 9).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className={`group text-left p-4 rounded-2xl border transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                      isDarkMode
                        ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-700/70 hover:border-indigo-500/50'
                        : 'bg-white border-gray-200 hover:bg-indigo-50 hover:border-indigo-300 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        isDarkMode ? 'bg-indigo-600/20' : 'bg-indigo-100'
                      }`}>
                        <MessageCircle className={`w-4 h-4 ${
                          isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium leading-relaxed group-hover:scale-[1.02] transition-transform ${
                          isDarkMode ? 'text-gray-200 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'
                        }`}>
                          {question}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Modern Chat Container */}
          <div className={`relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ${
            isDarkMode
              ? 'bg-slate-900/90 border border-slate-700'
              : 'bg-white/95 border border-gray-200 shadow-xl'
          } backdrop-blur-xl`}>

            {/* Chat Header */}
            <div className={`px-6 py-4 border-b ${
              isDarkMode ? 'border-slate-700 bg-slate-800/50' : 'border-gray-100 bg-gray-50/80'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                  isDarkMode ? 'bg-indigo-600' : 'bg-indigo-100'
                }`}>
                  <Sparkles className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-indigo-600'}`} />
                </div>
                <div>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Career Assistant
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Online and ready to help
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className={`h-96 sm:h-[500px] overflow-y-auto p-6 space-y-6 chat-scrollbar ${
              isDarkMode ? 'bg-slate-900/30' : 'bg-gradient-to-b from-gray-50/50 to-white/50'
            }`}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} message-appear`}
                >
                  {message.sender === "bot" && (
                    <div className={`w-8 h-8 rounded-2xl flex items-center justify-center mr-3 mt-1 flex-shrink-0 ${
                      isDarkMode ? 'bg-indigo-600' : 'bg-indigo-100'
                    }`}>
                      <Sparkles className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-indigo-600'}`} />
                    </div>
                  )}

                  <div
                    className={`max-w-xs sm:max-w-md lg:max-w-lg px-4 py-3 rounded-3xl shadow-lg transition-all duration-300 hover:scale-[1.02] ${
                      message.sender === "user"
                        ? isDarkMode
                          ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-indigo-500/25"
                          : "bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-indigo-500/25"
                        : isDarkMode
                          ? "bg-slate-800 text-gray-100 border border-slate-700"
                          : "bg-white text-gray-900 border border-gray-200 shadow-gray-200/50"
                    }`}
                  >
                    <div className="space-y-2">
                      {message.sender === "bot" ? (
                        <div className="chat-message prose prose-sm max-w-none">
                          <ReactMarkdown
                            components={{
                              p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>,
                              ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1 pl-2">{children}</ul>,
                              ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1 pl-2">{children}</ol>,
                              li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                              strong: ({ children }) => (
                                <strong className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {children}
                                </strong>
                              ),
                              em: ({ children }) => <em className="italic">{children}</em>,
                              code: ({ children }) => (
                                <code className={`px-2 py-1 rounded-lg text-sm font-mono ${
                                  isDarkMode
                                    ? 'bg-slate-700 text-cyan-300'
                                    : 'bg-indigo-50 text-indigo-700'
                                }`}>
                                  {children}
                                </code>
                              ),
                              pre: ({ children }) => (
                                <pre className={`p-4 rounded-xl text-sm font-mono overflow-x-auto my-3 ${
                                  isDarkMode
                                    ? 'bg-slate-700 border border-slate-600'
                                    : 'bg-gray-50 border border-gray-200'
                                }`}>
                                  {children}
                                </pre>
                              ),
                              blockquote: ({ children }) => (
                                <blockquote className={`border-l-4 pl-4 my-3 italic ${
                                  isDarkMode
                                    ? 'border-indigo-400 bg-indigo-900/20'
                                    : 'border-indigo-300 bg-indigo-50/50'
                                } py-2 rounded-r-lg`}>
                                  {children}
                                </blockquote>
                              ),
                              a: ({ href, children }) => (
                                <a
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`font-medium underline decoration-2 underline-offset-2 transition-colors ${
                                    isDarkMode
                                      ? 'text-cyan-400 hover:text-cyan-300'
                                      : 'text-indigo-600 hover:text-indigo-700'
                                  }`}
                                >
                                  {children}
                                </a>
                              ),
                              h1: ({ children }) => (
                                <h1 className={`text-xl font-bold mb-3 ${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                  {children}
                                </h1>
                              ),
                              h2: ({ children }) => (
                                <h2 className={`text-lg font-bold mb-2 ${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                  {children}
                                </h2>
                              ),
                              h3: ({ children }) => (
                                <h3 className={`text-base font-semibold mb-2 ${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                  {children}
                                </h3>
                              ),
                              hr: () => (
                                <hr className={`my-4 ${
                                  isDarkMode ? 'border-slate-600' : 'border-gray-300'
                                }`} />
                              )
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <p className="leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                      )}

                      <p className={`text-xs mt-2 ${
                        message.sender === "user"
                          ? "text-white/70"
                          : isDarkMode ? "text-gray-500" : "text-gray-400"
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>

                  {message.sender === "user" && (
                    <div className={`w-8 h-8 rounded-2xl flex items-center justify-center ml-3 mt-1 flex-shrink-0 ${
                      isDarkMode
                        ? 'bg-gradient-to-br from-indigo-600 to-purple-600'
                        : 'bg-gradient-to-br from-indigo-500 to-purple-500'
                    } text-white font-semibold text-sm`}>
                      U
                    </div>
                  )}
                </div>
              ))}
              
              {/* Modern Loading indicator */}
              {isLoading && (
                <div className="flex justify-start message-appear">
                  <div className={`w-8 h-8 rounded-2xl flex items-center justify-center mr-3 mt-1 flex-shrink-0 ${
                    isDarkMode ? 'bg-indigo-600' : 'bg-indigo-100'
                  }`}>
                    <Sparkles className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-indigo-600'}`} />
                  </div>
                  <div className={`px-4 py-3 rounded-3xl shadow-lg ${
                    isDarkMode
                      ? "bg-slate-800 text-gray-100 border border-slate-700"
                      : "bg-white text-gray-900 border border-gray-200 shadow-gray-200/50"
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        <div className={`w-2 h-2 rounded-full animate-bounce typing-dot-1 ${
                          isDarkMode ? 'bg-indigo-400' : 'bg-indigo-500'
                        }`}></div>
                        <div className={`w-2 h-2 rounded-full animate-bounce typing-dot-2 ${
                          isDarkMode ? 'bg-indigo-400' : 'bg-indigo-500'
                        }`}></div>
                        <div className={`w-2 h-2 rounded-full animate-bounce typing-dot-3 ${
                          isDarkMode ? 'bg-indigo-400' : 'bg-indigo-500'
                        }`}></div>
                      </div>
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Thinking...
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Modern Input Area */}
            <div className={`border-t p-6 ${
              isDarkMode ? 'border-slate-700 bg-slate-900/50' : 'border-gray-200 bg-gray-50/80'
            }`}>
              <div className="flex items-end gap-4">
                {/* Input Container */}
                <div className="flex-1 relative">
                  <div className={`relative rounded-2xl transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-slate-800 border border-slate-700 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500/50'
                      : 'bg-white border border-gray-300 focus-within:border-indigo-400 focus-within:ring-1 focus-within:ring-indigo-400/50 shadow-sm'
                  }`}>
                    <textarea
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me about career guidance, VTA programs, NTS applications, or German Tech courses..."
                      className={`w-full px-4 py-3 bg-transparent border-0 rounded-2xl resize-none focus:outline-none focus:ring-0 placeholder-opacity-70 transition-all duration-200 ${
                        isDarkMode
                          ? 'text-white placeholder-gray-400'
                          : 'text-gray-900 placeholder-gray-500'
                      }`}
                      rows="2"
                      disabled={isLoading}
                      style={{ minHeight: '52px', maxHeight: '120px' }}
                    />

                    {/* Character count indicator */}
                    {currentMessage.length > 0 && (
                      <div className="absolute bottom-2 right-3">
                        <span className={`text-xs ${
                          isDarkMode ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          {currentMessage.length}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons Container */}
                <div className="flex items-center gap-2">
                  {/* Voice Input Button */}
                  {speechSupported && (
                    <button
                      onClick={isListening ? stopSpeechRecognition : startSpeechRecognition}
                      disabled={isLoading}
                      className={`p-3 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed ${
                        isListening
                          ? isDarkMode
                            ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/25'
                            : 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25'
                          : isDarkMode
                            ? 'bg-slate-700 hover:bg-slate-600 text-gray-300 border border-slate-600'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-600 border border-gray-200'
                      }`}
                      title={isListening ? 'Stop Recording' : 'Start Voice Input'}
                    >
                      {isListening ? (
                        <MicOff className="w-5 h-5" />
                      ) : (
                        <Mic className="w-5 h-5" />
                      )}
                    </button>
                  )}

                  {/* Send Button */}
                  <button
                    onClick={sendMessage}
                    disabled={!currentMessage.trim() || isLoading}
                    className={`p-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center min-w-[52px] ${
                      !currentMessage.trim() || isLoading
                        ? isDarkMode
                          ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : isDarkMode
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25'
                          : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                    }`}
                    title="Send Message"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Status and Help Text */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Voice Input Status */}
                  {speechSupported && (
                    <div className={`text-xs flex items-center gap-2 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <Mic className="w-3 h-3" />
                      <span>
                        Voice: {currentLang === 'si' ? 'සිංහල' : currentLang === 'ta' ? 'தமிழ்' : 'English'}
                      </span>
                    </div>
                  )}

                  {/* Listening Indicator */}
                  {isListening && (
                    <div className="flex items-center gap-2 text-xs text-red-500">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span>Listening...</span>
                    </div>
                  )}
                </div>

                {/* Keyboard Shortcut Hint */}
                <div className={`text-xs ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  <kbd className={`px-2 py-1 rounded-lg text-xs font-mono ${
                    isDarkMode ? 'bg-slate-700 border border-slate-600' : 'bg-gray-100 border border-gray-200'
                  }`}>
                    Enter
                  </kbd> to send • <kbd className={`px-2 py-1 rounded-lg text-xs font-mono ${
                    isDarkMode ? 'bg-slate-700 border border-slate-600' : 'bg-gray-100 border border-gray-200'
                  }`}>
                    Shift+Enter
                  </kbd> for new line
                </div>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-8 text-center">
            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">🎯 What I can help you with:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-300">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-2xl">🎓</span>
                  <span>Career Guidance</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-2xl">📚</span>
                  <span>Academic Help</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-2xl">💡</span>
                  <span>Life Advice</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-2xl">🌟</span>
                  <span>General Knowledge</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-700">
                <p className="text-xs text-gray-400">
                  Specialized in: VTA Programs • NTS Applications • German Tech • Sri Lankan Education System
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ChatAssistant;
