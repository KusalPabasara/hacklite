import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

/**
 * Enhanced ChatBubble component that fixes all common issues:
 * 1. MutationObserver with proper null checks
 * 2. ReactMarkdown without className prop
 * 3. Proper styling and formatting
 * 4. Scroll-safe layout
 */
export default function ChatBubble({ message, sender = "bot" }) {
  // Fix 1: MutationObserver with proper null checks
  useEffect(() => {
    const langTarget = document.querySelector('html');
    if (langTarget) {
      const observer = new MutationObserver(() => {
        const lang = langTarget.getAttribute('lang');
        document.body.classList.remove('lang-en', 'lang-ta', 'lang-si');
        if (lang) {
          document.body.classList.add(`lang-${lang}`);
        }
      });
      observer.observe(langTarget, { 
        attributes: true, 
        attributeFilter: ['lang'] 
      });
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className={`flex ${sender === "user" ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
          sender === "user"
            ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
            : "bg-slate-700 text-gray-100"
        }`}
      >
        <div className="flex items-start space-x-2">
          {sender === "bot" && (
            <span className="text-lg mt-0.5">🤖</span>
          )}
          <div className="flex-1">
            {sender === "bot" ? (
              // Fix 2: ReactMarkdown without className prop - wrap in parent div
              <div className="chat-response bg-transparent text-white">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                    li: ({ children }) => <li className="text-sm">{children}</li>,
                    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                    em: ({ children }) => <em className="italic">{children}</em>,
                    code: ({ children }) => <code className="bg-slate-600 px-1 py-0.5 rounded text-xs">{children}</code>,
                    pre: ({ children }) => <pre className="bg-slate-600 p-2 rounded text-xs overflow-x-auto">{children}</pre>,
                    blockquote: ({ children }) => <blockquote className="border-l-4 border-cyan-400 pl-4 italic">{children}</blockquote>,
                    a: ({ href, children }) => (
                      <a 
                        href={href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 underline"
                      >
                        {children}
                      </a>
                    ),
                    h1: ({ children }) => <h1 className="text-lg font-bold mb-2 text-white">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-base font-bold mb-2 text-white">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-sm font-bold mb-1 text-white">{children}</h3>,
                    hr: () => <hr className="border-slate-600 my-3" />
                  }}
                >
                  {message}
                </ReactMarkdown>
              </div>
            ) : (
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Fix 3: Enhanced CSS for proper formatting and scroll-safe layout
const chatStyles = `
  .chat-response {
    white-space: pre-wrap;
    line-height: 1.7;
    font-size: 0.875rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  
  .chat-response p {
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }
  
  .chat-response p:last-child {
    margin-bottom: 0;
  }
  
  .chat-response ul, .chat-response ol {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
  }
  
  .chat-response li {
    margin-bottom: 0.25rem;
    line-height: 1.5;
  }
  
  .chat-response code {
    background-color: rgba(71, 85, 105, 0.8);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-family: 'Courier New', monospace;
  }
  
  .chat-response pre {
    background-color: rgba(71, 85, 105, 0.8);
    padding: 0.75rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 0.5rem 0;
  }
  
  .chat-response blockquote {
    border-left: 4px solid #22d3ee;
    padding-left: 1rem;
    margin: 0.5rem 0;
    font-style: italic;
    color: #cbd5e1;
  }
  
  .chat-response a {
    color: #22d3ee;
    text-decoration: underline;
  }
  
  .chat-response a:hover {
    color: #67e8f9;
  }
  
  .chat-response h1, .chat-response h2, .chat-response h3 {
    color: #ffffff;
    font-weight: 600;
    margin: 0.75rem 0 0.5rem 0;
  }
  
  .chat-response h1 {
    font-size: 1.125rem;
  }
  
  .chat-response h2 {
    font-size: 1rem;
  }
  
  .chat-response h3 {
    font-size: 0.875rem;
  }
  
  .chat-response hr {
    border-color: #475569;
    margin: 0.75rem 0;
  }
`;

// Export the styles for use in other components
export { chatStyles };
