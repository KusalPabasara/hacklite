import { useState, useEffect } from "react";
import { Users, MessageCircle, Calendar, Star, Award, Clock, CheckCircle, User } from "lucide-react";
import api from "../utils/api";
import { useTheme } from "../context/ThemeContext";

const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();

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
    { category: "Technology", icon: Users, color: "blue", description: "Software development, AI, and tech innovation" },
    { category: "Healthcare", icon: Users, color: "green", description: "Medical professionals and healthcare experts" },
    { category: "Finance", icon: Users, color: "purple", description: "Banking, investment, and financial planning" },
    { category: "Design", icon: Users, color: "pink", description: "UI/UX, graphic design, and creative fields" }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      pink: 'bg-pink-100 text-pink-600'
    };
    return colors[color] || colors.blue;
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-lg`}>Loading mentors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10" />
          </div>
          <h1 className={`text-4xl sm:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Connect with Mentors</h1>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Learn from industry experts who've walked the path you want to take. Get personalized guidance and accelerate your career growth.
          </p>
        </div>

        {/* Mentor Categories */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} text-center mb-12`}>Expertise Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mentorCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div 
                  key={index}
                  className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} group`}
                >
                  <div className={`w-16 h-16 ${getColorClasses(category.color)} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{category.category}</h3>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>{category.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Available Mentors */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} text-center mb-12`}>Available Mentors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentors.map((mentor, index) => (
              <div 
                key={mentor.id}
                className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} group`}
              >
                {/* Mentor Header */}
                <div className={`p-6 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                      <User className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{mentor.name}</h3>
                      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{mentor.title} at {mentor.company}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                      {mentor.experience || '5+ years'}
                    </span>
                  </div>
                </div>

                {/* Mentor Content */}
                <div className="p-6">
                  <div className="mb-6">
                    <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Expertise:</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {mentor.skills?.map((skill, idx) => (
                        <span 
                          key={idx}
                          className={`${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'} px-3 py-1 rounded-full text-sm font-medium`}
                        >
                          {skill}
                        </span>
                      )) || (
                        <span className={`${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'} px-3 py-1 rounded-full text-sm`}>
                          Career Guidance
                        </span>
                      )}
                    </div>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed text-sm`}>
                      {mentor.bio || "Passionate about helping others succeed in their careers through personalized guidance and mentorship."}
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Available for 1:1 sessions
                    </div>
                    <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Responds within 24 hours
                    </div>
                    <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      Free initial consultation
                    </div>
                  </div>

                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors">
                    Connect Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How Mentorship Works */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} text-center mb-12`}>How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                step: "1", 
                title: "Find Your Mentor", 
                desc: "Browse profiles and find mentors who match your goals and expertise areas",
                icon: Users
              },
              { 
                step: "2", 
                title: "Schedule Session", 
                desc: "Book a time that works for both you and your mentor through our platform",
                icon: Calendar
              },
              { 
                step: "3", 
                title: "Learn & Grow", 
                desc: "Get personalized advice and guidance for your career journey",
                icon: Star
              }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                      <IconComponent className="w-10 h-10" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-xl px-3 py-1 text-sm font-bold">
                      {item.step}
                    </div>
                  </div>
                  <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>{item.title}</h3>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-12 shadow-lg ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Ready to accelerate your growth?</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 max-w-2xl mx-auto text-lg`}>
              Connect with experienced professionals who can guide you through challenges and help you reach your goals faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors">
                <MessageCircle className="w-5 h-5" />
                Start Connecting
              </button>
              <button className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors">
                <Award className="w-5 h-5" />
                Become a Mentor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentors;