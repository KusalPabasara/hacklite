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
        <div className="main-content bg-white dark:bg-slate-900 text-gray-900 dark:text-white transition-all duration-300 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-cyan-600 dark:text-cyan-300 text-lg">Loading inspiring stories...</p>
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
                Success <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Stories</span>
              </h1>
              <p className="text-subtitle text-white/80 dark:text-white/80 max-w-3xl mx-auto">
                Real journeys from people who transformed their careers and found their purpose
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Category Filter - Dashboard Card Style */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-h2 text-gray-900 dark:text-white mb-2">Browse by Category</h2>
              <p className="text-subtitle text-gray-600 dark:text-gray-400">Find stories that inspire you</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    index === 0 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg hover:shadow-cyan-500/25'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <span className="mr-2 text-lg">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Stories - Dashboard Card Style */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-h2 text-gray-900 dark:text-white mb-2">Featured Stories</h2>
              <p className="text-subtitle text-gray-600 dark:text-gray-400">Real journeys from successful professionals</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredStories.map((story, index) => (
                <div 
                  key={story.id}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Story Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center">
                      <span className="text-3xl">{story.image}</span>
                    </div>
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
                      {story.readTime}
                    </span>
                  </div>

                  {/* Story Content */}
                  <div className="mb-6">
                    <span className="inline-block bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium mb-3">
                      {story.category}
                    </span>
                    <h3 className="text-h3 text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                      {story.title}
                    </h3>
                    <p className="text-small text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                      {story.excerpt}
                    </p>
                    
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {story.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-small font-medium text-gray-900 dark:text-white">{story.author}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{story.career}</p>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-cyan-500/25">
                    Read Full Story →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Success Metrics - Dashboard Card Style */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-h2 text-gray-900 dark:text-white mb-2">Impact Stories</h2>
              <p className="text-subtitle text-gray-600 dark:text-gray-400">Real results from our community</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { icon: "🚀", number: "500+", label: "Career Transitions" },
                { icon: "💼", number: "1000+", label: "Jobs Secured" },
                { icon: "📈", number: "85%", label: "Salary Increase" },
                { icon: "⭐", number: "4.9/5", label: "User Rating" }
              ].map((metric, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 text-center group hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{metric.icon}</span>
                  </div>
                  <h3 className="text-h2 text-gray-900 dark:text-white mb-2">{metric.number}</h3>
                  <p className="text-small text-gray-600 dark:text-gray-400">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action - Dashboard Style */}
          <div className="bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 text-center">
              <h3 className="text-h2 text-white mb-4">Ready to write your success story?</h3>
              <p className="text-subtitle text-white/90 mb-8 max-w-2xl mx-auto">
                Start your career transformation today. Your journey to success begins with a single step.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary py-4 px-8 text-lg">
                  🎯 Take Career Quiz
                </button>
                <button className="btn-secondary border-2 border-white text-white hover:bg-white hover:text-purple-600 py-4 px-8 text-lg">
                  🔍 Explore Careers
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inspiration;