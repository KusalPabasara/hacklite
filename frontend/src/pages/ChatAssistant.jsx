import { useState, useRef, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import api from "../utils/api";
import Navbar from "../components/Navbar";
<<<<<<< HEAD
=======
import VoiceInput from "../components/VoiceInput";
>>>>>>> c2fbe43 (Initial commit)

function ChatAssistant() {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState([
    {
      content: "Hello! I'm MetaMind Assistant 🤖. I'm here to help you with career guidance, especially for VTA, NTS, and German Tech programs in Sri Lanka. How can I assist you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
<<<<<<< HEAD
=======
  const [currentLang, setCurrentLang] = useState('en');
>>>>>>> c2fbe43 (Initial commit)
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

<<<<<<< HEAD
=======
  const handleVoiceTranscript = (transcript) => {
    setCurrentMessage(transcript);
  };

>>>>>>> c2fbe43 (Initial commit)
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

<<<<<<< HEAD
=======
  // Detect current language from Google Translate
  useEffect(() => {
    const interval = setInterval(() => {
      const select = document.querySelector('select.goog-te-combo');
      if (select && select.value !== currentLang) {
        setCurrentLang(select.value || 'en');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentLang]);

>>>>>>> c2fbe43 (Initial commit)
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
      
      // Set language based on current i18n language
      const getLanguageCode = () => {
        const currentLang = i18n.language || 'en';
        switch (currentLang) {
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
  }, [i18n.language]);

  // Update recognition language when i18n language changes
  useEffect(() => {
    if (recognitionRef.current) {
      const getLanguageCode = () => {
        const currentLang = i18n.language || 'en';
        switch (currentLang) {
          case 'si': return 'si-LK';
          case 'ta': return 'ta-IN';
          default: return 'en-US';
        }
      };
      recognitionRef.current.lang = getLanguageCode();
    }
  }, [i18n.language]);

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
    <>
      <Navbar />
      <div className="main-content bg-white dark:bg-slate-900 text-gray-900 dark:text-white transition-all duration-300 overflow-y-auto">
        <style>{`
          /* Professional Chat Assistant Styling */
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }
          
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(6, 182, 212, 0.3); }
            50% { box-shadow: 0 0 30px rgba(6, 182, 212, 0.6); }
          }
          
          .float-animation {
            animation: float 3s ease-in-out infinite;
          }
          
          .pulse-glow {
            animation: pulse-glow 2s ease-in-out infinite;
          }
          
          /* Enhanced chat message styling */
          .chat-message {
            white-space: pre-wrap;
            line-height: 1.7;
            font-size: 0.875rem;
            word-wrap: break-word;
            overflow-wrap: break-word;
          }
          
          .chat-message p {
            margin-bottom: 0.5rem;
            line-height: 1.6;
          }
          
          .chat-message p:last-child {
            margin-bottom: 0;
          }
          
          .chat-message ul, .chat-message ol {
            margin: 0.5rem 0;
            padding-left: 1.5rem;
          }
          
          .chat-message li {
            margin-bottom: 0.25rem;
            line-height: 1.5;
          }
          
          .chat-message code {
            background-color: rgba(71, 85, 105, 0.8);
            padding: 0.125rem 0.25rem;
            border-radius: 0.25rem;
            font-size: 0.75rem;
            font-family: 'Courier New', monospace;
          }
          
          .chat-message pre {
            background-color: rgba(71, 85, 105, 0.8);
            padding: 0.75rem;
            border-radius: 0.5rem;
            overflow-x: auto;
            margin: 0.5rem 0;
          }
          
          .chat-message blockquote {
            border-left: 4px solid #22d3ee;
            padding-left: 1rem;
            margin: 0.5rem 0;
            font-style: italic;
            color: #cbd5e1;
          }
          
          .chat-message a {
            color: #22d3ee;
            text-decoration: underline;
          }
          
          .chat-message a:hover {
            color: #67e8f9;
          }
          
          .chat-message h1, .chat-message h2, .chat-message h3 {
            color: #ffffff;
            font-weight: 600;
            margin: 0.75rem 0 0.5rem 0;
          }
          
          .chat-message h1 {
            font-size: 1.125rem;
          }
          
          .chat-message h2 {
            font-size: 1rem;
          }
          
          .chat-message h3 {
            font-size: 0.875rem;
          }
          
          .chat-message hr {
            border-color: #475569;
            margin: 0.75rem 0;
          }
        `}</style>

        {/* Header - Dashboard Style */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-900 to-teal-900">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute -top-32 right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
            <div className="absolute -bottom-32 left-40 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center slide-up">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🤖</span>
              </div>
              <h1 className="text-h1 text-white dark:text-white mb-6">
                MetaMind <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Assistant</span>
              </h1>
              <p className="text-subtitle text-white/80 dark:text-white/80 max-w-3xl mx-auto">
                Your AI-powered tutor and career counselor for Sri Lankan students. Ask me anything - from career guidance to academic help, life advice, and general knowledge!
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Suggested Questions - Dashboard Card Style */}
          {messages.length === 1 && (
            <div className="mb-16">
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
                <h3 className="text-h2 text-gray-900 dark:text-white mb-6 text-center">💡 Try asking me anything:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {suggestedQuestions.slice(0, 9).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="text-left p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 hover:border-cyan-500 dark:hover:border-cyan-400 group"
                    >
                      <span className="text-small text-gray-700 dark:text-gray-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {question}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="text-small text-gray-600 dark:text-gray-400 mt-4 text-center">
                  🎓 Career guidance • 📚 Academic help • 💡 Life advice • 🌟 General knowledge
                </p>
              </div>
            </div>
          )}

          {/* Chat Container - Dashboard Card Style */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Messages Area */}
            <div className="h-96 overflow-y-auto p-6 space-y-4 scroll-smooth" style={{ scrollBehavior: 'smooth' }}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-cyan-500 to-teal-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === "bot" && (
                        <span className="text-lg mt-0.5">🤖</span>
                      )}
                      <div className="flex-1">
                        {message.sender === "bot" ? (
                          <div className="text-small leading-relaxed chat-message prose prose-invert prose-sm max-w-none">
                            <ReactMarkdown
                              components={{
                                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                                ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                                li: ({ children }) => <li className="text-small">{children}</li>,
                                strong: ({ children }) => <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>,
                                em: ({ children }) => <em className="italic">{children}</em>,
                                code: ({ children }) => <code className="bg-gray-200 dark:bg-gray-600 px-1 py-0.5 rounded text-xs">{children}</code>,
                                pre: ({ children }) => <pre className="bg-gray-200 dark:bg-gray-600 p-2 rounded text-xs overflow-x-auto">{children}</pre>,
                                blockquote: ({ children }) => <blockquote className="border-l-4 border-cyan-500 pl-4 italic">{children}</blockquote>,
                                a: ({ href, children }) => (
                                  <a 
                                    href={href} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 underline"
                                  >
                                    {children}
                                  </a>
                                ),
                                h1: ({ children }) => <h1 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{children}</h1>,
                                h2: ({ children }) => <h2 className="text-base font-bold mb-2 text-gray-900 dark:text-white">{children}</h2>,
                                h3: ({ children }) => <h3 className="text-sm font-bold mb-1 text-gray-900 dark:text-white">{children}</h3>,
                                hr: () => <hr className="border-gray-300 dark:border-gray-600 my-3" />
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          <p className="text-small leading-relaxed whitespace-pre-wrap">
                            {message.content}
                          </p>
                        )}
                        <p className={`text-xs mt-2 ${
                          message.sender === "user" ? "text-cyan-100" : "text-gray-500 dark:text-gray-400"
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-3 rounded-2xl">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">🤖</span>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <textarea
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t('chat.typeMessage') || "Ask me about career guidance, VTA programs, NTS applications, or German Tech courses..."}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                    rows="2"
                    disabled={isLoading}
                  />
                </div>
                
                {/* Voice Input Button */}
                {speechSupported && (
<<<<<<< HEAD
                  <button
                    onClick={isListening ? stopSpeechRecognition : startSpeechRecognition}
                    className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                      isListening 
                        ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse' 
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                    title={isListening ? (t('chat.stopListening') || 'Stop listening') : (t('chat.speak') || 'Speak')}
                  >
                    {isListening ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">🎤</span>
                        <span className="text-sm">{t('chat.listening') || 'Listening...'}</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">🎤</span>
                        <span className="text-sm hidden sm:block">{t('chat.speak') || 'Speak'}</span>
                      </div>
                    )}
                  </button>
=======
                  <VoiceInput 
                    onTranscript={handleVoiceTranscript} 
                    currentLang={currentLang}
                  />
>>>>>>> c2fbe43 (Initial commit)
                )}
                
                <button
                  onClick={sendMessage}
                  disabled={!currentMessage.trim() || isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    t('chat.send') || "Send"
                  )}
                </button>
              </div>
              
              {/* Voice Input Status */}
              {speechSupported && (
                <div className="mt-2 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t('chat.voiceInput') || 'Voice input available'} • {i18n.language === 'si' ? 'සිංහල' : i18n.language === 'ta' ? 'தமிழ்' : 'English'}
                  </p>
                </div>
              )}
              
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Press Enter to send, Shift+Enter for new line
              </p>
            </div>
          </div>

          {/* Footer Info - Dashboard Card Style */}
          <div className="mt-16">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-h2 text-gray-900 dark:text-white mb-6 text-center">🎯 What I can help you with:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-small text-gray-600 dark:text-gray-400">
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
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-small text-gray-500 dark:text-gray-400 text-center">
                  Specialized in: VTA Programs • NTS Applications • German Tech • Sri Lankan Education System
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatAssistant;
