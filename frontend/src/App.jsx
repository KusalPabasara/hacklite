import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
=======
import { useEffect, useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { useTranslation } from "react-i18next";
>>>>>>> c2fbe43 (Initial commit)
import "./i18n"; // Updated import path
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ExploreCareers from "./pages/ExploreCareers.jsx";
import Quizzes from "./pages/Quizzes.jsx";
import QuizTake from "./pages/QuizTake.jsx";
import Mentors from "./pages/Mentors.jsx";
import Roadmap from "./pages/Roadmap.jsx";
import Inspiration from "./pages/Inspiration.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Profile from "./pages/Profile.jsx";
import QuestionnairePage from "./pages/QuestionnairePage.jsx";
import QuestionnaireRedirect from "./components/QuestionnaireRedirect.jsx";
import ChatAssistant from "./pages/ChatAssistant.jsx";

// Add this route inside the Routes component:

function App() {
<<<<<<< HEAD
=======
    const { i18n } = useTranslation();
    const [currentLang, setCurrentLang] = useState(i18n.language);

    // Google Translate status check (optional debug)
    useEffect(() => {
        const checkGoogleTranslate = () => {
            const element = document.getElementById('google_translate_element');
            const select = document.querySelector('select.goog-te-combo');
            if (element && select) {
                console.log('✅ Google Translate ready');
            }
        };

        // Check after component mounts
        setTimeout(checkGoogleTranslate, 2000);
    }, []);

    // Update language attribute when language changes
    useEffect(() => {
        const handleLanguageChange = (lng) => {
            setCurrentLang(lng);
            document.documentElement.lang = lng;
            document.body.lang = lng;
        };

        // Set initial language
        handleLanguageChange(i18n.language);

        // Listen for language changes
        i18n.on('languageChanged', handleLanguageChange);

        return () => {
            i18n.off('languageChanged', handleLanguageChange);
        };
    }, [i18n]);

>>>>>>> c2fbe43 (Initial commit)
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

    return (
<<<<<<< HEAD
        <div className="main-dashboard dark-theme">
            <AuthProvider>
                <BrowserRouter>
                    <QuestionnaireRedirect>
                        {/* Hidden Google Translate Widget Container */}
                        <div id="google_translate_element" style={{ display: "none" }}></div>
=======
        <div className="main-dashboard app-container" lang={currentLang}>
            {/* Hidden Google Translate Element */}
            <div id="google_translate_element" style={{ display: 'none' }}></div>
            
            <ThemeProvider>
                <AuthProvider>
                    <BrowserRouter>
                    <QuestionnaireRedirect>
>>>>>>> c2fbe43 (Initial commit)
                        <Routes>
                <Route 
                    path="/profile" 
                    element={
                        <ProtectedRoute>
                        <Profile />
                        </ProtectedRoute>
                    } 
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route 
                        path="/explore-careers" 
                        element={
                            <ProtectedRoute>
                                <ExploreCareers />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/quizzes" 
                        element={
                            <ProtectedRoute>
                                <Quizzes />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/quizzes/:id" 
                        element={
                            <ProtectedRoute>
                                <QuizTake />
                            </ProtectedRoute>
                        } 
                    />
                    
                    {/* Roadmap routes with optional careerId parameter */}
                    <Route 
                        path="/roadmap" 
                        element={
                            <ProtectedRoute>
                                <Roadmap />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/roadmap/:careerId" 
                        element={
                            <ProtectedRoute>
                                <Roadmap />
                            </ProtectedRoute>
                        } 
                    />
                    
                    <Route 
                        path="/mentors" 
                        element={
                            <ProtectedRoute>
                                <Mentors />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/inspiration" 
                        element={
                            <ProtectedRoute>
                                <Inspiration />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/leaderboard" 
                        element={
                            <ProtectedRoute>
                                <Leaderboard />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/questionnaire" 
                        element={
                            <ProtectedRoute>
                                <QuestionnairePage />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/chat" 
                        element={
                            <ProtectedRoute>
                                <ChatAssistant />
                            </ProtectedRoute>
                        } 
                    />
                        </Routes>
                    </QuestionnaireRedirect>
<<<<<<< HEAD
                </BrowserRouter>
            </AuthProvider>
=======
                    </BrowserRouter>
                </AuthProvider>
            </ThemeProvider>
>>>>>>> c2fbe43 (Initial commit)
        </div>
    );
}

export default App;