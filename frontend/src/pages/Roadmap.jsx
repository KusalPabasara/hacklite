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
                <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-20 h-20 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-emerald-300 text-lg">Loading your roadmap...</p>
                    </div>
                </div>
            </>
        );
    }

    if (error || !data) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
                    <div className="max-w-md mx-auto text-center">
                        <div className="glass-effect rounded-3xl p-10 shadow-2xl">
                            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl">⚠️</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h3>
                            <p className="text-gray-400 mb-8">{error || "No roadmap available. Please set a career goal first."}</p>
                            <button
                                onClick={() => navigate("/explore-careers")}
                                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
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
            <div className="min-h-screen bg-gray-950">
                <style jsx>{`
                    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800&display=swap');
                    
                    * {
                        font-family: 'Rubik', sans-serif;
                    }
                    
                    @keyframes path-draw {
                        from { stroke-dashoffset: 1000; }
                        to { stroke-dashoffset: 0; }
                    }
                    
                    @keyframes node-pulse {
                                                0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
                        50% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
                    }
                    
                    @keyframes step-slide {
                        from { opacity: 0; transform: translateX(-30px); }
                        to { opacity: 1; transform: translateX(0); }
                    }
                    
                    .path-line {
                        stroke-dasharray: 1000;
                        animation: path-draw 2s ease-out forwards;
                    }
                    
                    .node-pulse {
                        animation: node-pulse 2s ease-in-out infinite;
                    }
                    
                    .step-card {
                        animation: step-slide 0.5s ease-out forwards;
                    }
                    
                    .glass-effect {
                        background: rgba(255, 255, 255, 0.02);
                        backdrop-filter: blur(20px);
                        border: 1px solid rgba(255, 255, 255, 0.05);
                    }
                    
                    .neon-green {
                        box-shadow: 0 0 20px rgba(16, 185, 129, 0.5),
                                    0 0 40px rgba(16, 185, 129, 0.3),
                                    inset 0 0 20px rgba(16, 185, 129, 0.1);
                    }
                    
                    .cyber-grid {
                        background-image: 
                            linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px);
                        background-size: 30px 30px;
                    }
                `}</style>

                {/* Hero Section */}
                <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-gray-900 to-teal-900 py-20 cyber-grid">
                    <div className="absolute inset-0">
                        <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                        <div className="absolute bottom-20 right-20 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '3s'}}></div>
                    </div>
                    
                    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-6xl md:text-7xl font-black text-white mb-6">
                            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Learning Path</span>
                        </h1>
                        <p className="text-2xl text-emerald-200 max-w-3xl mx-auto">
                            {data.career ? `Journey to becoming a ${data.career}` : 'Your personalized roadmap to success'}
                        </p>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Progress Overview Card */}
                    <div className="glass-effect rounded-3xl p-10 mb-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
                        <div className="relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl node-pulse">
                                        <span className="text-3xl">🎯</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Career Goal</h3>
                                    <p className="text-emerald-300 text-lg">{data.career || 'Not Set'}</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
                                        <span className="text-3xl">📊</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Progress</h3>
                                    <p className="text-cyan-300 text-lg">{data.currentStep || 0} / {data.steps?.length || 0} steps</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
                                        <span className="text-3xl">🏆</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Status</h3>
                                    <p className="text-purple-300 text-lg">{data.completed ? 'Completed! 🎉' : 'In Progress'}</p>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-8">
                                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                                    <span className="font-medium uppercase tracking-wider">Your Progress</span>
                                    <span className="font-black text-2xl text-white">{Math.round(progressPercentage)}%</span>
                                </div>
                                <div className="w-full bg-gray-800 rounded-full h-6 overflow-hidden">
                                    <div 
                                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-6 rounded-full transition-all duration-1000 ease-out relative overflow-hidden neon-green"
                                        style={{ width: `${progressPercentage}%` }}
                                    >
                                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>

                            {data.completed && (
                                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 text-center">
                                    <div className="text-6xl mb-4">🎉</div>
                                    <h3 className="text-3xl font-bold text-white mb-3">Congratulations!</h3>
                                    <p className="text-emerald-100 text-lg">You've completed your roadmap! Time to take the next big step in your career.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Timeline Steps */}
                    {data.steps && data.steps.length > 0 && (
                        <div className="glass-effect rounded-3xl p-10 mb-12">
                            <h2 className="text-3xl font-bold text-white mb-10 text-center">Your Learning Journey</h2>
                            
                            <div className="relative">
                                {/* Timeline Line */}
                                <div className="absolute left-10 top-0 bottom-0 w-1 bg-gray-800"></div>
                                
                                <div className="space-y-10">
                                    {data.steps.map((step, index) => {
                                        const isCompleted = index < (data.currentStep || 0);
                                        const isCurrent = index === (data.currentStep || 0);
                                        const stepText = typeof step === 'string' ? step : step.title || step.name || `Step ${index + 1}`;
                                        
                                        return (
                                            <div 
                                                key={index} 
                                                className="step-card relative flex items-start"
                                                style={{animationDelay: `${index * 0.1}s`}}
                                            >
                                                {/* Timeline Node */}
                                                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-white font-bold text-xl z-10 transition-all duration-300 shadow-2xl ${
                                                    isCompleted
                                                        ? "bg-gradient-to-br from-emerald-500 to-teal-600 neon-green"
                                                        : isCurrent
                                                        ? "bg-gradient-to-br from-cyan-500 to-blue-600 node-pulse"
                                                        : "bg-gray-800"
                                                }`}>
                                                    {isCompleted ? "✓" : index + 1}
                                                </div>
                                                
                                                {/* Step Content */}
                                                <div className={`ml-8 flex-1 p-8 rounded-3xl transition-all duration-300 ${
                                                    isCompleted
                                                        ? "glass-effect border-2 border-emerald-500/30"
                                                        : isCurrent
                                                        ? "glass-effect border-2 border-cyan-500/50 neon-green"
                                                        : "glass-effect"
                                                }`}>
                                                    <div className="flex items-center justify-between mb-4">
                                                        <h3 className={`text-2xl font-bold ${
                                                            isCompleted
                                                                ? "text-emerald-400 line-through"
                                                                : isCurrent
                                                                ? "text-cyan-400"
                                                                : "text-gray-400"
                                                        }`}>
                                                            {stepText}
                                                        </h3>
                                                        {isCurrent && (
                                                            <span className="bg-cyan-500/20 backdrop-blur-md text-cyan-300 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                                                                Current Step
                                                            </span>
                                                        )}
                                                    </div>
                                                    
                                                    {isCurrent && (
                                                        <p className="text-cyan-300 mb-4">
                                                            🎯 Focus on completing this step to move forward!
                                                        </p>
                                                    )}
                                                    
                                                    {isCompleted && (
                                                        <p className="text-emerald-400">
                                                            ✅ Completed successfully!
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        {!data.completed && data.steps && data.steps.length > 0 && (data.currentStep || 0) < data.steps.length && (
                            <button
                                onClick={handleProgressUpdate}
                                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-emerald-500/50 text-lg uppercase tracking-wider"
                            >
                                🚀 Complete Current Step
                            </button>
                        )}
                        
                        <button
                            onClick={() => navigate("/explore-careers")}
                            className="glass-effect border-2 border-gray-700 hover:border-emerald-500 text-gray-300 hover:text-white font-bold py-5 px-10 rounded-2xl transition-all duration-300 text-lg uppercase tracking-wider"
                        >
                            🔄 Change Career Goal
                        </button>
                    </div>

                    {/* Motivation Section */}
                    <div className="mt-16 text-center">
                        <div className="glass-effect rounded-3xl p-12 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20"></div>
                            <div className="relative z-10">
                                <h3 className="text-4xl font-bold text-white mb-6">Keep Going! 💪</h3>
                                <p className="text-emerald-200 mb-8 max-w-2xl mx-auto text-xl">
                                    Every step completed brings you closer to your dream career. 
                                    Stay focused, stay motivated, and remember why you started.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button
                                        onClick={() => navigate("/mentors")}
                                        className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                                    >
                                        Connect with Mentors
                                    </button>
                                    <button
                                        onClick={() => navigate("/inspiration")}
                                        className="glass-effect border-2 border-emerald-500 text-emerald-300 hover:text-white hover:bg-emerald-600/20 font-bold py-4 px-8 rounded-2xl transition-all duration-300"
                                    >
                                        Read Success Stories
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Roadmap;