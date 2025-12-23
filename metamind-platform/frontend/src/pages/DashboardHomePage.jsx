import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ArrowRight, 
  Compass, 
  BookOpen, 
  User, 
  CheckSquare, 
  TrendingUp,
  Target,
  Clock,
  Award,
  MessageSquare,
  BarChart3,
  Calendar,
  Star
} from 'lucide-react';

const DashboardHomePage = () => {
    const { user } = useAuth(); 
    const [stats, setStats] = useState({
        completedAssessments: 1,
        activeGoals: 3,
        weeklyProgress: 75,
        upcomingTasks: 5
    });

    const quickActions = [
        {
            icon: Compass,
            title: "My Career Path",
            description: "View your personalized career recommendation based on your assessment",
            link: "/my-career-path",
            color: "from-blue-500 to-purple-600",
            bgColor: "bg-blue-500/10",
            textColor: "text-blue-400",
            progress: user?.questionnaireCompleted ? 100 : 0
        },
        {
            icon: BookOpen,
            title: "My Roadmap",
            description: "Access your step-by-step guide for your recommended career",
            link: "/roadmap",
            color: "from-emerald-500 to-teal-600",
            bgColor: "bg-emerald-500/10",
            textColor: "text-emerald-400",
            progress: 45
        },
        {
            icon: MessageSquare,
            title: "AI Assistant",
            description: "Get personalized career advice and guidance",
            link: "/chat",
            color: "from-orange-500 to-red-500",
            bgColor: "bg-orange-500/10",
            textColor: "text-orange-400",
            progress: null
        },
        {
            icon: User,
            title: "Find Mentors",
            description: "Connect with industry experts who can guide you",
            link: "/mentors",
            color: "from-purple-500 to-pink-600",
            bgColor: "bg-purple-500/10",
            textColor: "text-purple-400",
            progress: null
        },
        {
            icon: Award,
            title: "Success Stories",
            description: "Read inspiring stories from successful professionals",
            link: "/inspiration",
            color: "from-yellow-500 to-orange-500",
            bgColor: "bg-yellow-500/10",
            textColor: "text-yellow-400",
            progress: null
        },
        {
            icon: BarChart3,
            title: "Leaderboard",
            description: "See how you rank among other career seekers",
            link: "/leaderboard",
            color: "from-indigo-500 to-blue-600",
            bgColor: "bg-indigo-500/10",
            textColor: "text-indigo-400",
            progress: null
        }
    ];

    const statsCards = [
        {
            icon: CheckSquare,
            title: "Assessments Completed",
            value: stats.completedAssessments,
            change: "+1 this month",
            color: "text-emerald-400"
        },
        {
            icon: Target,
            title: "Active Goals",
            value: stats.activeGoals,
            change: "2 in progress",
            color: "text-blue-400"
        },
        {
            icon: TrendingUp,
            title: "Weekly Progress",
            value: `${stats.weeklyProgress}%`,
            change: "+12% from last week",
            color: "text-purple-400"
        },
        {
            icon: Clock,
            title: "Upcoming Tasks",
            value: stats.upcomingTasks,
            change: "3 due this week",
            color: "text-orange-400"
        }
    ];

    return (
        <div className="space-y-8">
            {/* Modern Welcome Header */}
            <div className="relative overflow-hidden rounded-2xl p-8"
                 style={{ background: 'var(--gradient-corporate)' }}>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white"></div>
                    <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-white"></div>
                </div>
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Welcome back, {user?.name || 'Explorer'}! 👋
                    </h1>
                    <p className="text-blue-100 text-lg">
                        Ready to take the next step in your career journey? Let's make today count.
                    </p>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                        <div key={index} 
                             className="gradient-card p-6 transition-all duration-300 hover:scale-105"
                             style={{ background: 'var(--bg-card)' }}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                                     style={{ background: 'var(--bg-secondary)' }}>
                                    <IconComponent size={24} className={stat.color} />
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                        {stat.value}
                                    </p>
                                </div>
                            </div>
                            <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                                {stat.title}
                            </h3>
                            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                {stat.change}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions Grid */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                        Quick Actions
                    </h2>
                    <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                        <Star size={16} />
                        Personalized for you
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quickActions.map((action, index) => {
                        const IconComponent = action.icon;
                        return (
                            <Link 
                                key={index}
                                to={action.link} 
                                className="gradient-card p-6 transition-all duration-300 hover:scale-105 group relative overflow-hidden"
                                style={{ background: 'var(--bg-card)' }}
                            >
                                {/* Progress bar if applicable */}
                                {action.progress !== null && (
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
                                        <div 
                                            className="h-full transition-all duration-1000 ease-out"
                                            style={{ 
                                                width: `${action.progress}%`,
                                                background: `linear-gradient(90deg, ${action.color.replace('from-', '').replace('to-', ', ')})` 
                                            }}
                                        ></div>
                                    </div>
                                )}
                                
                                <div className="flex flex-col h-full">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${action.bgColor} transition-all duration-300 group-hover:scale-110`}>
                                            <IconComponent size={28} className={action.textColor} />
                                        </div>
                                        {action.progress !== null && (
                                            <span className="text-xs px-2 py-1 rounded-full" 
                                                  style={{ 
                                                    background: 'var(--bg-secondary)', 
                                                    color: 'var(--text-secondary)' 
                                                  }}>
                                                {action.progress}%
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                                            {action.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                            {action.description}
                                        </p>
                                    </div>
                                    
                                    <div className="mt-6 flex items-center gap-2 font-semibold transition-all duration-300 group-hover:translate-x-1"
                                         style={{ color: action.textColor.replace('text-', 'var(--accent-') + ')' }}>
                                        Get Started
                                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Recent Activity or Recommendations */}
            <div className="gradient-card p-8" style={{ background: 'var(--bg-card)' }}>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                         style={{ background: 'var(--gradient-secondary)' }}>
                        <Calendar size={20} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                        Your Journey So Far
                    </h2>
                </div>
                
                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-lg transition-colors"
                         style={{ background: 'var(--bg-secondary)' }}>
                        <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                        <div>
                            <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                                Assessment Completed
                            </p>
                            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                {user?.questionnaireCompleted ? 'Great job! Your results are ready.' : 'Complete your career assessment to get started.'}
                            </p>
                        </div>
                        <div className="ml-auto">
                            {user?.questionnaireCompleted ? (
                                <CheckSquare size={20} className="text-emerald-400" />
                            ) : (
                                <Clock size={20} className="text-orange-400" />
                            )}
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 rounded-lg transition-colors"
                         style={{ background: 'var(--bg-secondary)' }}>
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        <div>
                            <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                                Career Roadmap
                            </p>
                            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                Your personalized learning path is being prepared.
                            </p>
                        </div>
                        <div className="ml-auto">
                            <Clock size={20} className="text-blue-400" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHomePage;
