import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <Logo className="h-12 mr-3" />
              <div>
                <h3 className="text-2xl font-bold">Career Guidance Platform</h3>
                <p className="text-gray-400 text-sm">Empowering Sri Lankan Students</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Transform your career journey with Marga.lk's comprehensive guidance, expert mentorship, and resources tailored for Sri Lankan opportunities.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Phone className="w-5 h-5 mr-3 text-orange-500" />
                <span>+94 11 234 5678</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="w-5 h-5 mr-3 text-orange-500" />
                <span>support@careerguide.lk</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-5 h-5 mr-3 text-orange-500" />
                <span>Colombo 03, Sri Lanka</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/questionnaire" className="text-gray-400 hover:text-orange-400 transition-colors duration-200 flex items-center group"><ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />Career Assessment</Link></li>
              <li><Link to="/explore-careers" className="text-gray-400 hover:text-orange-400 transition-colors duration-200 flex items-center group"><ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />Career Paths</Link></li>
              <li><Link to="/mentors" className="text-gray-400 hover:text-orange-400 transition-colors duration-200 flex items-center group"><ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />Find Mentors</Link></li>
              <li><Link to="/roadmap" className="text-gray-400 hover:text-orange-400 transition-colors duration-200 flex items-center group"><ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />Career Roadmaps</Link></li>
              <li><Link to="/inspiration" className="text-gray-400 hover:text-orange-400 transition-colors duration-200 flex items-center group"><ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />Success Stories</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-6 text-lg">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/chat" className="text-gray-400 hover:text-orange-400 transition-colors duration-200 flex items-center group"><ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />AI Assistant</Link></li>
              <li><Link to="/quizzes" className="text-gray-400 hover:text-orange-400 transition-colors duration-200 flex items-center group"><ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />Practice Quizzes</Link></li>
              <li><a href="#faq" className="text-gray-400 hover:text-orange-400 transition-colors duration-200 flex items-center group"><ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />FAQ</a></li>
              <li><a href="#support" className="text-gray-400 hover:text-orange-400 transition-colors duration-200 flex items-center group"><ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />Support</a></li>
            </ul>
            
            <div className="mt-8">
              <h4 className="font-semibold mb-4 text-lg">Follow Us</h4>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center hover:from-blue-500 hover:to-blue-600 cursor-pointer transition-all duration-200 transform hover:scale-110">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center hover:from-blue-300 hover:to-blue-400 cursor-pointer transition-all duration-200 transform hover:scale-110">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-800 rounded-lg flex items-center justify-center hover:from-blue-600 hover:to-blue-700 cursor-pointer transition-all duration-200 transform hover:scale-110">
                  <span className="text-sm font-bold">in</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg flex items-center justify-center hover:from-pink-400 hover:to-red-400 cursor-pointer transition-all duration-200 transform hover:scale-110">
                  <span className="text-sm font-bold">ig</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Career Guidance Platform. All rights reserved. Made with teamwork of MetaMind.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#privacy" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">Privacy Policy</a>
              <a href="#terms" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">Terms of Service</a>
              <a href="#cookies" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-orange-500 bg-opacity-5 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-blue-500 bg-opacity-5 rounded-full animate-pulse delay-1000"></div>
    </footer>
  );
};

export default Footer;
