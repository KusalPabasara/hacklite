import { useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const QuestionnaireRedirect = ({ children }) => {
  const { user, questionnaireCompleted, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Memoize public paths to prevent unnecessary re-computations
  const publicPaths = useMemo(() => ['/login', '/register', '/questionnaire'], []);

  useEffect(() => {
    // Only redirect if user is logged in and questionnaire status is known
    if (user && questionnaireCompleted !== null && !loading) {
      // Don't redirect if already on questionnaire page or login/register pages
      const isPublicPath = publicPaths.includes(location.pathname);
      
      if (!isPublicPath && !questionnaireCompleted) {
        navigate('/questionnaire');
      }
    }
  }, [user, questionnaireCompleted, loading, navigate, location.pathname, publicPaths]);

  // Show loading while checking questionnaire status
  if (user && questionnaireCompleted === null && loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return children;
};

export default QuestionnaireRedirect;
