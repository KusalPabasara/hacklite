import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

function Roadmap() {
    const { logout } = useContext(AuthContext);
    const { careerId } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoadmap = async () => {
            try {
                setLoading(true);
                setError("");
                
                let res;
                if (careerId) {
                    res = await api.get(`/roadmap/${careerId}`);
                } else {
                    res = await api.get("/roadmap");
                }
                
                setData(res.data);
            } catch (err) {
                console.error("Failed to fetch roadmap", err);
                const status = err.response?.status;
                
                if (status === 401) {
                    setError("Session expired. Please log in again.");
                    logout();
                } else if (status === 404) {
                    setError("No roadmap found for this career. Please set a career goal first.");
                } else {
                    setError("Failed to load roadmap. Please try again later.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchRoadmap();
    }, [careerId, logout]);

    const handleProgressUpdate = async () => {
        try {
            const nextStep = data.currentStep + 1;
            await api.put(`/roadmap/progress`, { step: nextStep });
            
            const updatedRes = careerId 
                ? await api.get(`/roadmap/${careerId}`)
                : await api.get("/roadmap");
            setData(updatedRes.data);
            
        } catch (e) {
            console.error("Error updating step:", e);
            alert("Error updating step. Please try again.");
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="main-content bg-white dark:bg-slate-900 text-gray-900 dark:text-white transition-all duration-300 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-20 h-20 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-cyan-600 dark:text-cyan-300 text-lg">Loading your roadmap...</p>
                    </div>
                </div>
            </>
        );
    }

    if (error || !data) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-white transition-all duration-300 flex items-center justify-center p-4">
                    <div className="max-w-md mx-auto text-center">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-2xl border border-gray-200 dark:border-gray-700">
                            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl">⚠️</span>
                            </div>
                            <h3 className="text-h2 text-gray-900 dark:text-white mb-4">Oops! Something went wrong</h3>
                            <p className="text-subtitle text-gray-600 dark:text-gray-400 mb-8">{error || "No roadmap available. Please set a career goal first."}</p>
                            <button
                                onClick={() => navigate("/explore-careers")}
                                className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-cyan-500/25"
                            >
                                🎯 Set Career Goal
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    const progressPercentage = data.steps?.length ? ((data.currentStep || 0) / data.steps.length) * 100 : 0;

    return (
        <>
            <Navbar />
            <div className="main-content bg-white dark:bg-slate-900 text-gray-900 dark:text-white transition-all duration-300 overflow-y-auto">
                {/* Hero Section - Dashboard Style */}
                <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-900 to-teal-900">
                    <div className="absolute inset-0">
                        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
                        <div className="absolute -top-32 right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
                        <div className="absolute -bottom-32 left-40 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
                    </div>
                    
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                        <div className="text-center slide-up">
                            <h1 className="text-h1 text-white dark:text-white mb-6">
                                Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Learning Path</span>
                            </h1>
                            <p className="text-subtitle text-white/80 dark:text-white/80 max-w-3xl mx-auto">
                                {data.career ? `Journey to becoming a ${data.career}` : 'Your personalized roadmap to success'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    {/* Progress Overview Card - Dashboard Style */}
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 mb-16">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <span className="text-3xl">🎯</span>
                                </div>
                                <h3 className="text-h3 text-gray-900 dark:text-white mb-2">Career Goal</h3>
                                <p className="text-subtitle text-gray-600 dark:text-gray-400">{data.career || 'Not Set'}</p>
                            </div>
                            <div className="text-center">
                                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <span className="text-3xl">📊</span>
                                </div>
                                <h3 className="text-h3 text-gray-900 dark:text-white mb-2">Progress</h3>
                                <p className="text-subtitle text-gray-600 dark:text-gray-400">{data.currentStep || 0} / {data.steps?.length || 0} steps</p>
                            </div>
                            <div className="text-center">
                                <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <span className="text-3xl">🏆</span>
                                </div>
                                <h3 className="text-h3 text-gray-900 dark:text-white mb-2">Status</h3>
                                <p className="text-subtitle text-gray-600 dark:text-gray-400">{data.completed ? 'Completed! 🎉' : 'In Progress'}</p>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between text-small text-gray-600 dark:text-gray-400 mb-4">
                                <span className="font-medium uppercase tracking-wider">Your Progress</span>
                                <span className="text-h2 text-gray-900 dark:text-white">{Math.round(progressPercentage)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6 overflow-hidden">
                                <div 
                                    className="bg-gradient-to-r from-cyan-500 to-teal-500 h-6 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                                    style={{ width: `${progressPercentage}%` }}
                                >
                                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                </div>
                            </div>
                        </div>

                        {data.completed && (
                            <div className="bg-gradient-to-r from-cyan-500 to-teal-600 rounded-2xl p-8 text-center">
                                <div className="text-6xl mb-4">🎉</div>
                                <h3 className="text-h2 text-white mb-3">Congratulations!</h3>
                                <p className="text-subtitle text-white/90">You've completed your roadmap! Time to take the next big step in your career.</p>
                            </div>
                        )}
                    </div>

                    {/* Timeline Steps - Dashboard Card Style */}
                    {data.steps && data.steps.length > 0 && (
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 mb-16">
                            <h2 className="text-h2 text-gray-900 dark:text-white mb-10 text-center">Your Learning Journey</h2>
                            
                            <div className="space-y-6">
                                {data.steps.map((step, index) => {
                                    const isCompleted = index < (data.currentStep || 0);
                                    const isCurrent = index === (data.currentStep || 0);
                                    const stepText = typeof step === 'string' ? step : step.title || step.name || `Step ${index + 1}`;
                                    
                                    return (
                                        <div 
                                            key={index} 
                                            className={`bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 border transition-all duration-300 ${
                                                isCompleted
                                                    ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20"
                                                    : isCurrent
                                                    ? "border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-900/20"
                                                    : "border-gray-200 dark:border-gray-600"
                                            }`}
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center">
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg mr-4 ${
                                                        isCompleted
                                                            ? "bg-gradient-to-br from-green-500 to-teal-600"
                                                            : isCurrent
                                                            ? "bg-gradient-to-br from-cyan-500 to-blue-600"
                                                            : "bg-gray-400"
                                                    }`}>
                                                        {isCompleted ? "✓" : index + 1}
                                                    </div>
                                                    <h3 className={`text-h3 ${
                                                        isCompleted
                                                            ? "text-green-600 dark:text-green-400 line-through"
                                                            : isCurrent
                                                            ? "text-cyan-600 dark:text-cyan-400"
                                                            : "text-gray-600 dark:text-gray-400"
                                                    }`}>
                                                        {stepText}
                                                    </h3>
                                                </div>
                                                {isCurrent && (
                                                    <span className="bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 px-3 py-1 rounded-full text-sm font-medium">
                                                        Current Step
                                                    </span>
                                                )}
                                            </div>
                                            
                                            {isCurrent && (
                                                <p className="text-cyan-600 dark:text-cyan-400 text-small">
                                                    🎯 Focus on completing this step to move forward!
                                                </p>
                                            )}
                                            
                                            {isCompleted && (
                                                <p className="text-green-600 dark:text-green-400 text-small">
                                                    ✅ Completed successfully!
                                                </p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons - Dashboard Style */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                        {!data.completed && data.steps && data.steps.length > 0 && (data.currentStep || 0) < data.steps.length && (
                            <button
                                onClick={handleProgressUpdate}
                                className="btn-primary py-4 px-8 text-lg"
                            >
                                🚀 Complete Current Step
                            </button>
                        )}
                        
                        <button
                            onClick={() => navigate("/explore-careers")}
                            className="btn-secondary py-4 px-8 text-lg"
                        >
                            🔄 Change Career Goal
                        </button>
                    </div>

                    {/* Motivation Section - Dashboard Style */}
                    <div className="bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl p-12 text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10 text-center">
                            <h3 className="text-h2 text-white mb-4">Keep Going! 💪</h3>
                            <p className="text-subtitle text-white/90 mb-8 max-w-2xl mx-auto">
                                Every step completed brings you closer to your dream career. 
                                Stay focused, stay motivated, and remember why you started.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => navigate("/mentors")}
                                    className="btn-primary py-4 px-8 text-lg"
                                >
                                    Connect with Mentors
                                </button>
                                <button
                                    onClick={() => navigate("/inspiration")}
                                    className="btn-secondary border-2 border-white text-white hover:bg-white hover:text-purple-600 py-4 px-8 text-lg"
                                >
                                    Read Success Stories
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Roadmap;