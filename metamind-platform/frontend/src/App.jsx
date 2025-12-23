import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useAuth } from './context/AuthContext';
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import "./styles/theme.css";
import "./styles/profile.css";
import "./styles/responsive.css";
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import QuestionnairePage from './pages/QuestionnairePage';
import UserPreferences from './pages/UserPreferences';
import RecommendationPage from './pages/RecommendationPage';
import RoadmapPage from './pages/RoadmapPage';
import DashboardHomePage from './pages/DashboardHomePage';
import DashboardLayout from './components/layout/DashboardLayout';
import ExploreCareers from './pages/ExploreCareers';
import Quizzes from './pages/Quizzes';
import QuizTake from './pages/QuizTake';
import Mentors from './pages/Mentors';
import Roadmap from './pages/Roadmap';
import Inspiration from './pages/Inspiration';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import ChatAssistant from './pages/ChatAssistant';
import AssistantPage from './pages/AssistantPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import QuestionnaireRedirect from './components/QuestionnaireRedirect';
import MyCareerPath from './pages/MyCareerPath';
import EnhancedRoadmapPage from './pages/EnhancedRoadmapPage';

function App() {
  const { user, loading } = useAuth();
  const [currentLang, setCurrentLang] = useState('en');

  // Google Translate status check and language sync
  useEffect(() => {
    const checkGoogleTranslate = () => {
      const select = document.querySelector('select.goog-te-combo');
      if (select) {
        console.log('✅ Google Translate ready');
        setCurrentLang(select.value || 'en');
        
        // Listen for Google Translate changes
        select.addEventListener('change', (e) => {
          const newLang = e.target.value;
          setCurrentLang(newLang);
          localStorage.setItem('language', newLang);
          document.documentElement.lang = newLang;
          document.body.lang = newLang;
        });
      } else {
        // Check again after a delay
        setTimeout(checkGoogleTranslate, 1000);
      }
    };

    // Check after component mounts
    setTimeout(checkGoogleTranslate, 1000);
  }, []);

  // Language change is now handled by Google Translate

  // Additional safety measure to hide Google Translate elements
  useEffect(() => {
      const hideGoogleTranslateElements = () => {
          const elements = document.querySelectorAll('body > .skiptranslate, .goog-te-banner-frame, #goog-gt-tt, .goog-te-menu-frame, .goog-te-balloon-frame, iframe.goog-te-banner-frame');
          elements.forEach(element => {
              element.style.display = 'none !important';
              element.style.height = '0 !important';
              element.style.overflow = 'hidden !important';
          });
          
          // Reset body positioning
          document.body.style.top = '0px !important';
          document.body.style.position = 'static !important';
          document.body.style.marginTop = '0 !important';
          document.body.style.paddingTop = '0 !important';
          document.documentElement.style.marginTop = '0 !important';
          document.documentElement.style.paddingTop = '0 !important';
      };

      // Run immediately
      hideGoogleTranslateElements();
      
      // Run on any DOM changes
      const observer = new MutationObserver(hideGoogleTranslateElements);
      if (document.body) {
          observer.observe(document.body, { childList: true, subtree: true });
      }
      
      return () => observer.disconnect();
  }, []);

  // Show loading spinner while auth state is being determined
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white">Loading Application...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-hidden" lang={currentLang}>
      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>
      <ThemeProvider>
        <LanguageProvider>
          <Router>
            <QuestionnaireRedirect>
              <Routes>
              {/* Public Routes */}
              <Route path="/" element={user ? (user.questionnaireCompleted ? <Navigate to="/dashboard" /> : <Navigate to="/user-preferences" />) : <Homepage />} />
              <Route path="/login" element={!user ? <Login /> : (user.questionnaireCompleted ? <Navigate to="/dashboard" /> : <Navigate to="/user-preferences" />)} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/user-preferences" />} />
              
              {/* Protected Routes */}
              <Route path="/user-preferences" element={user ? <UserPreferences /> : <Navigate to="/login" />} />
              <Route path="/questionnaire" element={user ? <QuestionnairePage /> : <Navigate to="/login" />} />
              <Route path="/dashboard" element={user ? <DashboardLayout><DashboardHomePage /></DashboardLayout> : <Navigate to="/login" />} />
              <Route path="/my-career-path" element={user ? <DashboardLayout><MyCareerPath /></DashboardLayout> : <Navigate to="/login" />} />
              <Route path="/roadmap" element={user ? <DashboardLayout><Roadmap /></DashboardLayout> : <Navigate to="/login" />} />
              <Route path="/roadmap/:careerId" element={user ? <DashboardLayout><EnhancedRoadmapPage /></DashboardLayout> : <Navigate to="/login" />} />
              <Route path="/explore-careers" element={user ? <DashboardLayout><ExploreCareers /></DashboardLayout> : <Navigate to="/login" />} />
              <Route path="/quizzes" element={user ? <DashboardLayout><Quizzes /></DashboardLayout> : <Navigate to="/login" />} />
              <Route path="/quizzes/:id" element={user ? <DashboardLayout><QuizTake /></DashboardLayout> : <Navigate to="/login" />} />
              <Route path="/mentors" element={user ? <DashboardLayout><Mentors /></DashboardLayout> : <Navigate to="/login" />} />
              <Route path="/inspiration" element={user ? <DashboardLayout><Inspiration /></DashboardLayout> : <Navigate to="/login" />} />
              <Route path="/leaderboard" element={user ? <DashboardLayout><Leaderboard /></DashboardLayout> : <Navigate to="/login" />} />
              <Route path="/profile" element={user ? <DashboardLayout><Profile /></DashboardLayout> : <Navigate to="/login" />} />
              <Route path="/chat" element={user ? <DashboardLayout><ChatAssistant /></DashboardLayout> : <Navigate to="/login" />} />
              <Route path="/assistant" element={user ? <DashboardLayout><AssistantPage /></DashboardLayout> : <Navigate to="/login" />} />
              <Route path="/stories" element={user ? <DashboardLayout><SuccessStoriesPage /></DashboardLayout> : <Navigate to="/login" />} />
              </Routes>
            </QuestionnaireRedirect>
          </Router>
        </LanguageProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;