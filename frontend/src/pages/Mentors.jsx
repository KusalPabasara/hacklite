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
        <div className="main-content bg-white dark:bg-slate-900 text-gray-900 dark:text-white transition-all duration-300 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-cyan-600 dark:text-cyan-300 text-lg">Loading mentors...</p>
          </div>
        </div>
      </>
    );
  }

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
                Connect with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Mentors</span>
              </h1>
              <p className="text-subtitle text-white/80 dark:text-white/80 max-w-3xl mx-auto">
                Learn from industry experts who've walked the path you want to take
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Mentor Categories - Dashboard Card Style */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-h2 text-gray-900 dark:text-white mb-2">Expertise Areas</h2>
              <p className="text-subtitle text-gray-600 dark:text-gray-400">Find mentors in your field of interest</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mentorCategories.map((category, index) => (
                <div 
                  key={index}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 transform hover:-translate-y-1 text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{category.icon}</span>
                  </div>
                  <h3 className="text-h3 text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">{category.category}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* Available Mentors - Dashboard Card Style */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-h2 text-gray-900 dark:text-white mb-2">Available Mentors</h2>
              <p className="text-subtitle text-gray-600 dark:text-gray-400">Connect with experienced professionals</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.map((mentor, index) => (
                <div 
                  key={mentor.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Mentor Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center">
                      <span className="text-3xl">👤</span>
                    </div>
                    <span className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {mentor.experience || '5+ years'}
                    </span>
                  </div>

                  {/* Mentor Content */}
                  <div className="mb-6">
                    <h3 className="text-h3 text-gray-900 dark:text-white mb-2">{mentor.name}</h3>
                    <p className="text-small text-gray-600 dark:text-gray-400 mb-4">
                      {mentor.title} at {mentor.company}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-small">Expertise:</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {mentor.skills?.map((skill, idx) => (
                          <span 
                            key={idx}
                            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {skill}
                          </span>
                        )) || (
                          <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs">
                            Career Guidance
                          </span>
                        )}
                      </div>
                      <p className="text-small text-gray-600 dark:text-gray-400 leading-relaxed">
                        {mentor.bio || "Passionate about helping others succeed in their careers through personalized guidance and mentorship."}
                      </p>
                    </div>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        Available for 1:1 sessions
                      </div>
                      <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        Responds within 24 hours
                      </div>
                      <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                        Free initial consultation
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-cyan-500/25">
                    Connect Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* How Mentorship Works - Dashboard Card Style */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-h2 text-gray-900 dark:text-white mb-2">How It Works</h2>
              <p className="text-subtitle text-gray-600 dark:text-gray-400">Simple steps to connect with mentors</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: "1", title: "Find Your Mentor", desc: "Browse profiles and find mentors who match your goals", icon: "🔍" },
                { step: "2", title: "Schedule Session", desc: "Book a time that works for both you and your mentor", icon: "📅" },
                { step: "3", title: "Learn & Grow", desc: "Get personalized advice and guidance for your journey", icon: "🚀" }
              ].map((item, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 text-center group hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <h3 className="text-h3 text-gray-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-small text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action - Dashboard Style */}
          <div className="bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 text-center">
              <h3 className="text-h2 text-white mb-4">Ready to accelerate your growth?</h3>
              <p className="text-subtitle text-white/90 mb-8 max-w-2xl mx-auto">
                Connect with experienced professionals who can guide you through challenges and help you reach your goals faster.
              </p>
              <button className="btn-primary py-4 px-8 text-lg">
                🚀 Start Connecting
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mentors;