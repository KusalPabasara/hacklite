import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../utils/api";

const Inspiration = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const res = await api.get("/stories");
        setStories(res.data);
      } catch (error) {
        console.error("Failed to fetch stories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  const featuredStories = [
    {
      id: 1,
      title: "From Student to Software Engineer",
      author: "Sarah Chen",
      career: "Software Engineering",
      excerpt: "How I transitioned from a biology major to a successful software engineer in just 2 years...",
      image: "💻",
      category: "Technology",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Breaking into Data Science",
      author: "Michael Rodriguez",
      career: "Data Science",
      excerpt: "My journey from marketing to data science and the skills that made it possible...",
      image: "📊",
      category: "Analytics",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "The UX Designer's Path",
      author: "Emma Wilson",
      career: "UX Design",
      excerpt: "How I discovered my passion for design and built a thriving career in UX...",
      image: "🎨",
      category: "Design",
      readTime: "6 min read"
    }
  ];

  const categories = [
    { name: "All Stories", icon: "📚", color: "from-indigo-500 to-purple-600" },
    { name: "Technology", icon: "💻", color: "from-blue-500 to-cyan-600" },
    { name: "Healthcare", icon: "🏥", color: "from-green-500 to-emerald-600" },
    { name: "Finance", icon: "💰", color: "from-purple-500 to-pink-600" },
    { name: "Design", icon: "🎨", color: "from-pink-500 to-rose-600" }
  ];

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-purple-300 text-lg">Loading inspiring stories...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-950">
        <style jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
          
          * {
            font-family: 'Sora', sans-serif;
          }
          
          @keyframes float-story {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(2deg); }
          }
          
          @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
          }
          
          @keyframes pulse-ring {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(168, 85, 247, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(168, 85, 247, 0); }
          }
          
          .story-card {
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .story-card:hover {
            animation: float-story 4s ease-in-out infinite;
          }
          
          .shimmer {
            background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
            background-size: 1000px 100%;
            animation: shimmer 2s infinite;
          }
          
          .pulse-ring {
            animation: pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
          }
          
          .neon-glow {
            text-shadow: 0 0 10px currentColor,
                         0 0 20px currentColor,
                         0 0 30px currentColor;
          }
          
          .glass-morphism {
            background: rgba(255, 255, 255, 0.02);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.05);
          }
        `}</style>

        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-gray-900 to-pink-900 py-24">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
              <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '3s'}}></div>
              <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '6s'}}></div>
            </div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-7xl md:text-8xl font-bold text-white mb-6 neon-glow">
              Success <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Stories</span>
            </h1>
            <p className="text-2xl text-purple-200 max-w-3xl mx-auto leading-relaxed font-light">
              Real journeys from people who transformed their careers and found their purpose
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Category Filter */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Browse by Category</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-110 ${
                    index === 0 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-purple-500/50 pulse-ring'
                      : 'glass-morphism text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="mr-2 text-xl">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Stories */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Featured Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredStories.map((story, index) => (
                <div 
                  key={story.id}
                  className="story-card group relative glass-morphism rounded-3xl overflow-hidden"
                  style={{animationDelay: `${index * 0.2}s`}}
                >
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Story Header */}
                  <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-8 relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-5xl">{story.image}</span>
                        <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium text-white">
                          {story.readTime}
                        </span>
                      </div>
                      <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium text-white mb-4">
                        {story.category}
                      </span>
                    </div>
                  </div>

                  {/* Story Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors duration-300">
                      {story.title}
                    </h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {story.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">
                            {story.author.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{story.author}</p>
                          <p className="text-xs text-gray-500">{story.career}</p>
                        </div>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
                      Read Full Story →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Success Metrics */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Impact Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: "🚀", number: "500+", label: "Career Transitions" },
                { icon: "💼", number: "1000+", label: "Jobs Secured" },
                { icon: "📈", number: "85%", label: "Salary Increase" },
                { icon: "⭐", number: "4.9/5", label: "User Rating" }
              ].map((metric, index) => (
                <div key={index} className="text-center group">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-purple-500/50">
                    <span className="text-4xl">{metric.icon}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">{metric.number}</h3>
                  <p className="text-gray-400">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="glass-morphism rounded-3xl p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
              <div className="relative z-10">
                <h3 className="text-4xl font-bold text-white mb-6">Ready to write your success story?</h3>
                <p className="text-purple-200 mb-8 max-w-2xl mx-auto text-xl">
                  Start your career transformation today. Your journey to success begins with a single step.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                    🎯 Take Career Quiz
                  </button>
                  <button className="glass-morphism border border-purple-500 text-purple-300 hover:text-white hover:bg-purple-600/20 font-semibold py-4 px-8 rounded-2xl transition-all duration-300">
                    🔍 Explore Careers
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inspiration;