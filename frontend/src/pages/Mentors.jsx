import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../utils/api";

const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        const res = await api.get("/mentors");
        setMentors(res.data);
      } catch (error) {
        console.error("Failed to fetch mentors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);

  const mentorCategories = [
    { category: "Technology", icon: "💻", color: "from-blue-500 to-indigo-600", bgColor: "bg-blue-50" },
    { category: "Healthcare", icon: "🏥", color: "from-emerald-500 to-teal-600", bgColor: "bg-emerald-50" },
    { category: "Finance", icon: "💰", color: "from-purple-500 to-pink-600", bgColor: "bg-purple-50" },
    { category: "Design", icon: "🎨", color: "from-pink-500 to-rose-600", bgColor: "bg-pink-50" }
  ];

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-orange-300 text-lg">Loading mentors...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900">
        <style jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
          
          * {
            font-family: 'Manrope', sans-serif;
          }
          
          @keyframes mentor-float {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-10px) scale(1.02); }
          }
          
          @keyframes connection-pulse {
            0% { opacity: 0; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
            100% { opacity: 0; transform: scale(1.4); }
          }
          
          @keyframes gradient-flow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .mentor-card {
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .mentor-card:hover {
            animation: mentor-float 3s ease-in-out infinite;
          }
          
          .connection-pulse::after {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 50%;
            background: currentColor;
            animation: connection-pulse 2s ease-out infinite;
          }
          
          .gradient-flow {
            background-size: 200% 200%;
            animation: gradient-flow 5s ease infinite;
          }
          
          .glass-card {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.08);
          }
          
          .neon-orange {
            text-shadow: 0 0 20px rgba(251, 146, 60, 0.5),
                         0 0 40px rgba(251, 146, 60, 0.3);
          }
        `}</style>

        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-900 via-gray-900 to-red-900 py-24 gradient-flow">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '3s'}}></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-7xl md:text-8xl font-bold text-white mb-6">
              Connect with <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 neon-orange">Mentors</span>
            </h1>
            <p className="text-2xl text-orange-200 max-w-3xl mx-auto font-light">
              Learn from industry experts who've walked the path you want to take
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Mentor Categories */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Expertise Areas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {mentorCategories.map((category, index) => (
                <div 
                  key={index}
                  className="group text-center transform hover:scale-110 transition-all duration-300"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-2xl group-hover:shadow-orange-500/50 relative">
                    <span className="text-5xl z-10">{category.icon}</span>
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-red-700 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{category.category}</h3>
                  <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Available Mentors */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Available Mentors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mentors.map((mentor, index) => (
                <div 
                  key={mentor.id}
                  className="mentor-card glass-card rounded-3xl overflow-hidden group"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  {/* Mentor Header */}
                  <div className="bg-gradient-to-br from-orange-600 to-red-700 p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/20 rounded-full blur-2xl"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                          <span className="text-3xl">👤</span>
                        </div>
                        <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-white">
                          {mentor.experience || '5+ years'}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{mentor.name}</h3>
                      <p className="text-orange-100">
                        {mentor.title} at {mentor.company}
                      </p>
                    </div>
                  </div>

                  {/* Mentor Content */}
                  <div className="p-8">
                    <div className="mb-6">
                      <h4 className="font-bold text-white mb-4 text-lg">Expertise:</h4>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {mentor.skills?.map((skill, idx) => (
                          <span 
                            key={idx}
                            className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-md text-orange-300 px-4 py-2 rounded-full text-sm font-medium border border-orange-500/30"
                          >
                            {skill}
                          </span>
                        )) || (
                          <span className="bg-gray-800/50 text-gray-300 px-4 py-2 rounded-full text-sm">
                            Career Guidance
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 leading-relaxed">
                        {mentor.bio || "Passionate about helping others succeed in their careers through personalized guidance and mentorship."}
                      </p>
                    </div>

                    <div className="space-y-3 mb-8">
                      <div className="flex items-center text-sm text-gray-300">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3 relative connection-pulse"></div>
                        Available for 1:1 sessions
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                        Responds within 24 hours
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                        Free initial consultation
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25 uppercase tracking-wider">
                      Connect Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How Mentorship Works */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "1", title: "Find Your Mentor", desc: "Browse profiles and find mentors who match your goals" },
                { step: "2", title: "Schedule Session", desc: "Book a time that works for both you and your mentor" },
                { step: "3", title: "Learn & Grow", desc: "Get personalized advice and guidance for your journey" }
              ].map((item, index) => (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-600 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white shadow-2xl group-hover:shadow-orange-500/50 transform group-hover:scale-110 transition-all duration-300">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="glass-card rounded-3xl p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20"></div>
              <div className="relative z-10">
                <h3 className="text-4xl font-bold text-white mb-6">Ready to accelerate your growth?</h3>
                <p className="text-orange-200 mb-8 max-w-2xl mx-auto text-xl">
                  Connect with experienced professionals who can guide you through challenges and help you reach your goals faster.
                </p>
                <button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-orange-500/50 text-lg uppercase tracking-wider">
                  🚀 Start Connecting
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mentors;