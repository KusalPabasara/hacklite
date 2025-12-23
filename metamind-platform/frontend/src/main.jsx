import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import './index.css'; // 🎨 Import all your styles
import { AuthProvider } from './context/AuthContext.jsx';
import './styles/theme-logo-styles.css';
import './styles/z-index-global.css';

// This function MUST be defined on the window object before React renders.
// Its name MUST match the "cb" parameter in the script tag from index.html.
window.googleTranslateElementInit = function() {
  new window.google.translate.TranslateElement(
    {
      pageLanguage: 'en' // The default language of your site.
    },
    'google_translate_element' // The ID of the div from index.html.
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
