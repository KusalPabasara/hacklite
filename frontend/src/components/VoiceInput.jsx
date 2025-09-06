import React, { useState, useRef } from 'react';

const VoiceInput = ({ onTranscript, currentLang = 'en' }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    // Set language based on current translation
    const langMap = {
      'en': 'en-US',
      'si': 'si-LK',
      'ta': 'ta-IN'
    };
    
    recognition.lang = langMap[currentLang] || 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      onTranscript(result);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  return (
    <button
      onClick={isListening ? stopListening : startListening}
      className={`
        p-2 rounded-full transition-all duration-200
        ${isListening 
          ? 'bg-red-500 text-white animate-pulse' 
          : 'bg-purple-600 text-white hover:bg-purple-700'
        }
      `}
      title={isListening ? 'Stop recording' : 'Start voice input'}
    >
      {isListening ? '🛑' : '🎤'}
    </button>
  );
};

export default VoiceInput;
