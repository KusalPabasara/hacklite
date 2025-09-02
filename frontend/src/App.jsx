import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
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

// Add this route inside the Routes component:

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
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
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;