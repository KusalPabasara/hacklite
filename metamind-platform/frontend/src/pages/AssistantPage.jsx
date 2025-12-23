import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Mic, MicOff, Loader2, Lightbulb, GraduationCap, BookOpen, LightbulbIcon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const AssistantPage = () => {
  const { isDarkMode } = useTheme();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your career assistant. I'm here to help you with career guidance, answer questions about different career paths, and provide personalized advice. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleSend = async () => {
    if (input.trim() && !isLoading) {
      const userMessage = {
        id: Date.now(),
        text: input.trim(),
        sender: 'user',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = generateAIResponse(input.trim());
        const aiMessage = {
          id: Date.now() + 1,
          text: aiResponse,
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1500);
    }
  };

  const generateAIResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('career') || input.includes('job') || input.includes('work')) {
      return "Great question about careers! Based on your profile, I can see you're interested in exploring different career paths. We offer several career tracks including Technical (VTA, German Tech), Healthcare (NTS), and more. Would you like me to help you understand which path might be best for you?";
    }
    
    if (input.includes('nursing') || input.includes('healthcare') || input.includes('medical')) {
      return "The NTS (Nursing Training School) program is an excellent choice for healthcare careers! It provides comprehensive training in nursing and healthcare practices. Graduates often work in hospitals, clinics, and healthcare facilities. Would you like to know more about the requirements or career prospects?";
    }
    
    if (input.includes('technical') || input.includes('engineering') || input.includes('vta')) {
      return "The VTA (Vocational Training Academy) program focuses on practical technical skills. It's perfect for hands-on learners who want to work in technical fields like automotive, electrical, or mechanical engineering. The program emphasizes real-world applications and industry-relevant skills.";
    }
    
    if (input.includes('german') || input.includes('germany') || input.includes('international')) {
      return "The German Technical program is an amazing opportunity! It combines technical training with German language skills, opening doors to international career opportunities. Many graduates find excellent positions in Germany or with German companies. The program includes language training and cultural preparation.";
    }
    
    if (input.includes('quiz') || input.includes('assessment') || input.includes('test')) {
      return "Our career assessment quiz is designed to help you discover your strengths and interests. It analyzes your responses to provide personalized career recommendations. You can find it in the Quizzes section. Would you like me to guide you through taking the assessment?";
    }
    
    if (input.includes('roadmap') || input.includes('plan') || input.includes('steps')) {
      return "Career roadmaps show you the step-by-step path to your chosen career. They include education requirements, skills to develop, and milestones to achieve. You can explore different roadmaps in the Roadmap section. Which career path interests you most?";
    }
    
    if (input.includes('mentor') || input.includes('guidance') || input.includes('advice')) {
      return "Our mentor program connects you with experienced professionals in your field of interest. Mentors can provide valuable insights, career advice, and networking opportunities. You can browse available mentors in the Mentors section. What specific guidance are you looking for?";
    }
    
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! I'm excited to help you with your career journey. Whether you're just starting to explore options or looking to advance in your current field, I'm here to provide guidance and support. What would you like to know?";
    }
    
    if (input.includes('help') || input.includes('what can you do')) {
      return "I can help you with:\n• Career path recommendations\n• Information about different programs (NTS, VTA, German Tech)\n• Quiz and assessment guidance\n• Roadmap planning\n• Mentor connections\n• General career advice\n\nWhat specific area would you like to explore?";
    }
    
    // Default response
    return "That's an interesting question! I'm here to help with career guidance and information about our programs. Could you tell me more about what specific career path or program you're interested in? I can provide detailed information about NTS, VTA, German Technical programs, or help you with general career planning.";
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
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
    "What are the requirements for VTA programs?"
  ];

  const categories = [
    { icon: "🎓", label: "Career guidance" },
    { icon: "📚", label: "Academic help" },
    { icon: "💡", label: "Life advice" },
    { icon: "☀️", label: "General knowledge" }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto p-6">
        {/* Page Title */}
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-8`}>Assistant</h1>
        
        {/* AI Assistant Introduction Banner */}
        <div className={`${isDarkMode ? 'bg-gradient-to-r from-purple-900 to-purple-800' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200'} rounded-2xl p-8 mb-8 text-center relative overflow-hidden`}>
          <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-r from-purple-600/20 to-purple-800/20' : 'bg-gradient-to-r from-blue-100/30 to-indigo-100/30'}`}></div>
          <div className="relative z-10">
            <div className={`w-20 h-20 mx-auto mb-4 ${isDarkMode ? 'bg-white/20' : 'bg-blue-100'} rounded-full flex items-center justify-center backdrop-blur-sm`}>
              <Bot size={40} className={isDarkMode ? 'text-white' : 'text-blue-600'} />
            </div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Career Assistant</h2>
            <p className={`${isDarkMode ? 'text-white/90' : 'text-gray-700'} text-lg max-w-3xl mx-auto`}>
              Your AI-powered tutor and career counselor for Sri Lankan students. Ask me anything - from career guidance to academic help, life advice, and general knowledge!
            </p>
          </div>
        </div>

        {/* Suggested Questions */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Lightbulb size={24} className={`mr-2 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Suggested Questions</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInput(question)}
                className={`p-4 text-left rounded-lg transition-all duration-200 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
                }`}
              >
                <span className="text-sm">{question}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Category Tags */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  isDarkMode 
                    ? 'bg-gray-800 text-gray-300 border border-gray-700' 
                    : 'bg-white text-gray-600 border border-gray-200 shadow-sm'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Interface */}
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg overflow-hidden`}>
          {/* Messages Area */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-orange-600 text-white'
                      : isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'ai' && (
                      <Bot size={20} className="mt-1 flex-shrink-0" />
                    )}
                    {message.sender === 'user' && (
                      <User size={20} className="mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className={`${isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-900'} px-4 py-3 rounded-lg flex items-center space-x-2`}>
                  <Bot size={20} />
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-4`}>
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about careers, programs, or your career path..."
                  className={`w-full p-3 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'} border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none`}
                  rows="2"
                  disabled={isLoading}
                />
              </div>
              
              <div className="flex flex-col space-y-2">
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`p-3 rounded-lg transition-colors ${
                    isListening 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : isDarkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                  disabled={isLoading}
                >
                  {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                </button>
                
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="p-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
            
            <div className={`mt-2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Press Enter to send, Shift+Enter for new line. Click the microphone to use voice input.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantPage;
