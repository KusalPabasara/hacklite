import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Menu, X, Play, Check, ArrowRight, Star, User, Clock, BarChart3, Users, Award, Target, ChevronLeft, GraduationCap, BookOpen, MapPin, Phone, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { setTargetCareer } from '../utils/roadmapApi';
import Logo from '../components/Logo';
import LanguageSwitcher from '../components/LanguageSwitcher';
import ThemeToggle from '../components/ThemeToggle';
import InstituteCarousel from '../components/InstituteCarousel';
import Footer from '../components/Footer';
import '../styles/animations.css';
import '../styles/gradient-themes.css';

const Homepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Career paths carousel data from our database
  const institutes = [
    {
      name: 'NTS - Nursing Training School',
      image: '/images/careers/nts-nursing-students.jpg',
      description: 'Become a qualified nurse in government hospitals across Sri Lanka',
      category: 'Healthcare',
      duration: '3-4 years',
      icon: '🏥',
      fallbackImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&crop=center'
    },
    {
      name: 'VTA - Vocational Training Authority',
      image: '/images/careers/vta-graduation-ceremony.jpg',
      description: 'Master technical skills for high-demand jobs in Sri Lanka',
      category: 'Technical Skills',
      duration: '3-18 months',
      icon: '🔧',
      fallbackImage: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop&crop=center'
    },
    {
      name: 'German Technical Training',
      image: '/images/careers/german-tech-workshop.jpg',
      description: 'International certification meeting German engineering standards',
      category: 'International',
      duration: '2-3 years',
      icon: '🇩🇪',
      fallbackImage: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&h=600&fit=crop&crop=center'
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % institutes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [institutes.length]);

  // System theme detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // This will be handled by ThemeContext if system theme is selected
    };
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  const careers = [
    {
      id: "nts",
      title: "NTS (Nursing Training School)",
      description: "Qualify for a government nursing position in Sri Lanka. This path includes a comprehensive 3-4 year training program offered by government nursing schools.",
      image: "/api/placeholder/400/250",
      requirements: ["A/L Science Stream (including Biology)", "Credit passes in O/L English, Maths & Science"]
    },
    {
      id: "vta",
      title: "VTA (Vocational Training Authority)",
      description: "Gain technical skills for in-demand jobs in Sri Lanka. The VTA offers a wide range of full-time and part-time courses with durations from 3 to 18 months.",
      image: "/api/placeholder/400/250",
      requirements: ["O/L Education", "Varies by course"]
    },
    {
      id: "german-tech",
      title: "German Technical Training",
      description: "Pursue an international technical certification that meets German standards, opening doors to global career opportunities.",
      image: "/api/placeholder/400/250",
      requirements: ["O/L with good Math/Science grades", "German language proficiency"]
    }
  ];

  const testimonials = [
    {
      name: "Kasun Perera",
      role: "NTS Graduate",
      content: "The career assessment helped me discover my passion for nursing. The personalized roadmap and mentorship program were invaluable in my journey.",
      avatar: "/api/placeholder/60/60",
      rating: 5
    },
    {
      name: "Dilani Wickramasinghe", 
      role: "VTA Graduate",
      content: "The platform's AI guidance system provided exactly what I needed. I'm now working as a certified technician thanks to the VTA program recommendations.",
      avatar: "/api/placeholder/60/60",
      rating: 5
    },
    {
      name: "Chamara Fernando",
      role: "German Tech Graduate", 
      content: "The German Technical Training pathway opened international opportunities I never imagined. The platform's career matching was spot-on for my interests.",
      avatar: "/api/placeholder/60/60",
      rating: 5
    },
    {
      name: "Nayomi Silva",
      role: "Career Counselor",
      content: "As a mentor on this platform, I've seen how it transforms students' career journeys. Marga.lk's recommendations are remarkably accurate and helpful.",
      avatar: "/api/placeholder/60/60", 
      rating: 5
    }
  ];

  const benefits = [
    {
      number: "01",
      title: "Personalized Career Assessment",
      description: "Comprehensive questionnaire system that analyzes your interests, skills, and goals to recommend the perfect career path.",
      icon: <Target className="w-6 h-6" />
    },
    {
      number: "02", 
      title: "Expert Mentorship Program",
      description: "Connect with industry professionals and successful graduates who provide guidance and support throughout your journey.",
      icon: <Users className="w-6 h-6" />
    },
    {
      number: "03",
      title: "Comprehensive Career Roadmaps", 
      description: "Detailed step-by-step guides for NTS, VTA, and German Technical Training with timelines and requirements.",
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      number: "04",
      title: "Real-time Progress Tracking",
      description: "Monitor your advancement through interactive dashboards and milestone tracking systems.",
      icon: <Award className="w-6 h-6" />
    },
    {
      number: "05",
      title: "Interactive Learning Environment",
      description: "Engage with career-specific quizzes, assessments, and practical exercises to enhance your understanding.",
      icon: <Play className="w-6 h-6" />
    },
    {
      number: "06",
      title: "24/7 AI Career Assistant",
      description: "Get instant answers to career questions with our intelligent chatbot available in Sinhala and English.",
      icon: <User className="w-6 h-6" />
    }
  ];

  const faqData = [
    {
      question: "Can I explore multiple career paths at once?",
      answer: "Absolutely! You can explore multiple career opportunities simultaneously and access comprehensive information about NTS, VTA, and German Technical Training programs at your convenience.",
      isOpen: true
    },
    {
      question: "What kind of support can I expect from mentors?",
      answer: "Our mentors provide personalized guidance, industry insights, interview preparation, and ongoing support throughout your career journey."
    },
    {
      question: "Are the career assessments scientifically validated?",
      answer: "Yes, our assessments use validated psychometric principles combined with AI algorithms to provide accurate career recommendations based on your unique profile."
    },
    {
      question: "Can I access the platform content offline?",
      answer: "While the platform requires internet connectivity for real-time features, you can download career guides and roadmaps for offline reference."
    }
  ];

  const [faqs, setFaqs] = useState(faqData);

  const toggleFaq = (index) => {
    setFaqs(faqs.map((faq, i) => ({
      ...faq,
      isOpen: i === index ? !faq.isOpen : false
    })));
  };

  const handleAssessmentStart = () => {
    if (user) {
      navigate("/questionnaire");
    } else {
      navigate("/login", { state: { from: { pathname: "/questionnaire" } } });
    }
  };

  return (
    <div 
      className="h-screen w-full overflow-y-auto transition-all duration-300 professional-bg"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Header */}
      <header 
        className="professional-navbar shadow-sm border-b transition-all duration-300 sticky top-0 z-50"
        style={{ 
          background: 'var(--bg-header)', 
          borderColor: 'var(--border-primary)' 
        }}
      >
        <div 
          className="text-center py-2 text-sm transition-colors duration-300 animate-pulse"
          style={{ 
            backgroundColor: 'var(--accent-orange)', 
            color: 'var(--text-inverse)' 
          }}
        >
          🎓 Marga.lk - Shape Your Future → Take Our Career Assessment Today → Start Now! 🚀
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Logo className="h-10" />
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="font-medium transition-colors duration-200 hover:text-orange-500" style={{ color: 'var(--text-primary)' }}>Home</a>
              <Link to="/explore-careers" className="transition-colors duration-200 hover:text-orange-500" style={{ color: 'var(--text-secondary)' }}>Career Paths</Link>
              <Link to="/mentors" className="transition-colors duration-200 hover:text-orange-500" style={{ color: 'var(--text-secondary)' }}>Mentorship</Link>
              <Link to="/inspiration" className="transition-colors duration-200 hover:text-orange-500" style={{ color: 'var(--text-secondary)' }}>Success Stories</Link>
              <a href="#contact" className="transition-colors duration-200 hover:text-orange-500" style={{ color: 'var(--text-secondary)' }}>Contact</a>
            </nav>
            
            <div className="hidden md:flex items-center space-x-4">
              <LanguageSwitcher />
              <ThemeToggle size="sm" />
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="transition-colors duration-200 hover:text-orange-500"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={logout}
                    className="transition-colors duration-200 hover:text-orange-500"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    state={{ from: { pathname: "/questionnaire" } }}
                    className="transition-colors duration-200 hover:text-orange-500"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/register" 
                    state={{ from: { pathname: "/questionnaire" } }}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
            
            <button 
              className="md:hidden transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ color: 'var(--text-primary)' }}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t" style={{ borderColor: 'var(--border-primary)', backgroundColor: 'var(--bg-header)' }}>
            <div className="px-4 py-4 space-y-2">
              <a href="#home" className="block py-2 hover:text-orange-500" style={{ color: 'var(--text-secondary)' }}>Home</a>
              <Link to="/explore-careers" className="block py-2 hover:text-orange-500" style={{ color: 'var(--text-secondary)' }}>Career Paths</Link>
              <Link to="/mentors" className="block py-2 hover:text-orange-500" style={{ color: 'var(--text-secondary)' }}>Mentorship</Link>
              <Link to="/inspiration" className="block py-2 hover:text-orange-500" style={{ color: 'var(--text-secondary)' }}>Success Stories</Link>
              <a href="#contact" className="block py-2 hover:text-orange-500" style={{ color: 'var(--text-secondary)' }}>Contact</a>
              <div className="flex items-center space-x-2 py-2">
                <LanguageSwitcher />
                <ThemeToggle size="sm" />
              </div>
              {user ? (
                <div className="pt-2 space-y-2">
                  <Link to="/dashboard" className="block w-full text-center py-2 hover:text-orange-500" style={{ color: 'var(--text-secondary)' }}>Dashboard</Link>
                  <button onClick={logout} className="block w-full text-center py-2 hover:text-orange-500" style={{ color: 'var(--text-secondary)' }}>Sign Out</button>
                </div>
              ) : (
                <div className="pt-2 space-y-2">
                  <Link to="/login" className="block w-full text-center py-2 hover:text-orange-500" style={{ color: 'var(--text-secondary)' }}>Sign In</Link>
                  <Link to="/register" className="block w-full text-center py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Get Started</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-blue-50 opacity-60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-6 animate-bounce">
                🎯 Marga.lk - Shape Your Future
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span style={{ color: 'var(--text-primary)' }}>Discover Your</span>
                <br />
                <span className="text-orange-500 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Perfect Career Path</span>
              </h1>
              <p className="text-xl mb-8 max-w-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Join thousands of Sri Lankan students who found their ideal careers through our comprehensive platform. Get personalized recommendations for NTS, VTA, German Technical Training, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleAssessmentStart}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl hover:from-orange-600 hover:to-red-600 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center group"
                >
                  <GraduationCap className="mr-2 group-hover:rotate-12 transition-transform duration-200" />
                  Start Free Assessment
                </button>
                <Link 
                  to="/explore-careers" 
                  className="border-2 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center group"
                  style={{ 
                    borderColor: 'var(--border-primary)', 
                    color: 'var(--text-primary)',
                    backgroundColor: 'var(--bg-secondary)'
                  }}
                >
                  <BookOpen className="mr-2 group-hover:rotate-12 transition-transform duration-200" />
                  Explore Careers
                </Link>
              </div>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">10K+</div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Students Guided</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">95%</div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">50+</div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Career Paths</div>
                </div>
              </div>
            </div>
            
            {/* Institute Carousel */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="relative h-80 rounded-xl overflow-hidden">
                  {institutes.map((institute, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                        index === currentSlide ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-full'
                      }`}
                    >
                      <div className="relative h-full rounded-xl overflow-hidden group">
                        {/* Background Image */}
                        <img 
                          src={institute.image} 
                          alt={institute.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          onError={(e) => {
                            e.target.src = institute.fallbackImage;
                          }}
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        
                        {/* Content */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                          <div className="text-center">
                            <div className="text-4xl mb-3">{institute.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{institute.name}</h3>
                            <p className="mb-3 text-sm leading-relaxed" style={{ color: 'var(--text-on-dark, #e2e8f0)' }}>{institute.description}</p>
                            <div className="flex justify-center items-center space-x-4 text-xs">
                              <span className="inline-block px-3 py-1 bg-orange-500 bg-opacity-90 rounded-full font-medium">
                                {institute.category}
                              </span>
                              <span className="inline-block px-3 py-1 bg-blue-500 bg-opacity-90 rounded-full font-medium">
                                {institute.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-orange-500 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Navigation arrows */}
                  <button
                    onClick={() => setCurrentSlide(currentSlide === 0 ? institutes.length - 1 : currentSlide - 1)}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-md flex items-center justify-center transition-all duration-200"
                  >
                    <ChevronLeft className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                  </button>
                  <button
                    onClick={() => setCurrentSlide((currentSlide + 1) % institutes.length)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-md flex items-center justify-center transition-all duration-200"
                  >
                    <ChevronRight className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                  </button>
                </div>
                
                {/* Slide indicators */}
                <div className="flex justify-center space-x-2 mt-4">
                  {institutes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentSlide ? 'bg-orange-500 w-8' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </section>

      {/* Success Metrics Section */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Trusted by Sri Lanka's Future Leaders
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              See how Marga.lk is transforming career guidance across Sri Lanka
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-orange-500 mb-2">12,500+</div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Active Students</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-500 mb-2">98%</div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-500 mb-2">75+</div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Career Options</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-purple-500 mb-2">24/7</div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Why Choose Our Platform?
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Experience the most comprehensive career guidance system designed specifically for Sri Lankan students and professionals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="group p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer relative overflow-hidden"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  borderColor: 'var(--border-primary)' 
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-orange)';
                  e.currentTarget.style.transform = 'translateY(-8px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-primary)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                      {benefit.number}
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-orange-500 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                    {benefit.title}
                  </h3>
                  <p className="leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                    {benefit.description}
                  </p>
                  <div className="flex items-center text-orange-500 font-medium group-hover:translate-x-2 transition-transform duration-300">
                    <span className="mr-2">Learn More</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Paths Section */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Explore Career Opportunities
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-8" style={{ color: 'var(--text-secondary)' }}>
              Discover comprehensive career pathways designed specifically for Sri Lankan students with expert guidance and structured learning.
            </p>
            <Link 
              to="/explore-careers" 
              className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 group"
            >
              View All Career Paths
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careers.map((career, index) => (
              <div 
                key={career.id} 
                className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                style={{ backgroundColor: 'var(--bg-primary)' }}
              >
                <div className="relative h-48 bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="relative z-10 text-center text-white">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                      <GraduationCap className="w-8 h-8" />
                    </div>
                    <div className="text-sm font-medium opacity-90">{career.id.toUpperCase()}</div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-orange-500 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                    {career.title}
                  </h3>
                  <p className="mb-4 leading-relaxed text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {career.description}
                  </p>
                  
                  <div className="mb-6">
                    <div className="text-xs font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Requirements:</div>
                    <div className="flex flex-wrap gap-1">
                      {career.requirements.map((req, idx) => (
                        <span 
                          key={idx} 
                          className="inline-block bg-orange-50 text-orange-700 text-xs px-2 py-1 rounded-full font-medium"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={async () => {
                        try {
                          // Set the target career first
                          await setTargetCareer(career.id);
                          // Then navigate to roadmap
                          navigate(`/roadmap/${career.id}`);
                        } catch (error) {
                          console.error('Error setting target career:', error);
                          // Still navigate even if setting fails
                          navigate(`/roadmap/${career.id}`);
                        }
                      }}
                      className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center group"
                    >
                      <BookOpen className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-200" />
                      Explore Path
                    </button>
                    <div className="flex items-center text-orange-500 text-sm font-medium">
                      <Clock className="w-4 h-4 mr-1" />
                      {index === 0 ? '3-4 years' : index === 1 ? '3-18 months' : '2-3 years'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Success Stories That Inspire
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-8" style={{ color: 'var(--text-secondary)' }}>
              Real stories from Sri Lankan students who transformed their careers through Marga.lk's comprehensive guidance platform.
            </p>
            <Link 
              to="/inspiration" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 group"
            >
              <Star className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-200" />
              Read All Stories
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="group p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer relative overflow-hidden"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  borderColor: 'var(--border-primary)' 
                }}
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="flex items-center mr-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <div className="text-sm font-medium px-3 py-1 bg-green-100 text-green-700 rounded-full">
                      Verified Success
                    </div>
                  </div>
                  
                  <blockquote className="text-lg mb-6 leading-relaxed italic" style={{ color: 'var(--text-primary)' }}>
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-4 text-white font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                          {testimonial.name}
                        </div>
                        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                    <Link 
                      to="/inspiration" 
                      className="text-orange-500 hover:text-orange-600 text-sm font-medium flex items-center group-hover:translate-x-2 transition-transform duration-300"
                    >
                      Full Story
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-orange-500 via-red-500 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Future?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of Sri Lankan students who discovered their perfect career path through Marga.lk. Your dream career is just one assessment away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleAssessmentStart}
              className="px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center group"
              style={{ 
                backgroundColor: 'var(--bg-button-secondary)', 
                color: 'var(--text-primary)' 
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--bg-button-secondary-hover)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--bg-button-secondary)';
              }}
            >
              <Target className="mr-2 group-hover:rotate-12 transition-transform duration-200" />
              Start Your Journey Now
            </button>
            <Link 
              to="/inspiration" 
              className="border-2 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center group"
              style={{ 
                borderColor: 'var(--border-light, white)', 
                color: 'var(--text-on-dark, white)',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--bg-button-secondary)';
                e.target.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = 'var(--text-on-dark, white)';
              }}
            >
              <Star className="mr-2 group-hover:rotate-12 transition-transform duration-200" />
              Read Success Stories
            </Link>
          </div>
        </div>
        {/* Decorative elements */}
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Frequently Asked Questions</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Get answers to common questions about our career guidance platform.
            </p>
          </div>
        
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="rounded-xl border shadow-sm transition-all duration-200 hover:shadow-md"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  borderColor: 'var(--border-primary)' 
                }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between transition-colors duration-200"
                  style={{ 
                    ':hover': { backgroundColor: 'var(--bg-hover)' }
                  }}
                >
                  <span className="font-medium text-lg" style={{ color: 'var(--text-primary)' }}>{faq.question}</span>
                  <ChevronRight className={`w-5 h-5 transform transition-all duration-300 ${
                    faq.isOpen ? 'rotate-90 text-orange-500' : 'text-gray-400'
                  }`} />
                </button>
                {faq.isOpen && (
                  <div className="px-6 pb-6 animate-fadeIn">
                    <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{faq.answer}</p>
                    {index === 0 && (
                      <div className="mt-4">
                        <Link 
                          to="/explore-careers" 
                          className="text-orange-500 hover:text-orange-600 text-sm flex items-center group transition-colors duration-200"
                        >
                          Explore Career Requirements 
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="inline-flex items-center px-6 py-3 bg-orange-50 text-orange-700 rounded-full text-sm font-medium">
              💡 Still have questions? Our AI assistant is here to help 24/7!
            </div>
            <div className="mt-6">
              <Link 
                to="/chat" 
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 group"
              >
                <User className="mr-2 group-hover:rotate-12 transition-transform duration-200" />
                Chat with AI Assistant
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Homepage;

