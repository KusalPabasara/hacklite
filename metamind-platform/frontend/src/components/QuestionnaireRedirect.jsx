import React, { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const QuestionnaireRedirect = ({ children }) => {
  const { user, loading, refreshUserStatus } = useAuth();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  // List of public routes that don't require questionnaire completion
  const publicRoutes = ['/', '/login', '/register'];
  
  // List of routes that should be accessible even without questionnaire completion
  const allowedWithoutQuestionnaire = [
    '/questionnaire', 
    '/user-preferences',
    ...publicRoutes
  ];

  // Refresh user status on mount to ensure we have latest data
  useEffect(() => {
    const checkStatus = async () => {
      if (user && !loading) {
        // If we're on a protected route and user status is unclear, refresh it
        if (!allowedWithoutQuestionnaire.includes(location.pathname)) {
          await refreshUserStatus();
          // Small delay to let the refresh complete
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      }
      setIsChecking(false);
    };
    
    if (!loading) {
      checkStatus();
    }
  }, [user, loading, location.pathname, refreshUserStatus]);

  // Show loading while checking
  if (loading || isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If the user is logged in, hasn't completed the questionnaire,
  // is NOT on an allowed route, redirect them to questionnaire
  if (user && user.questionnaireCompleted === false && !allowedWithoutQuestionnaire.includes(location.pathname)) {
    console.log('🔄 Redirecting to questionnaire - user has not completed assessment', {
      user: user.email,
      questionnaireCompleted: user.questionnaireCompleted,
      pathname: location.pathname
    });
    return <Navigate to="/questionnaire" state={{ from: location }} replace />;
  }

  // Otherwise, let them go to the page they wanted.
  return children;
};

export default QuestionnaireRedirect;