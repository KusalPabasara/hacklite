import React from 'react';
import { Star, Quote, User, MapPin, Calendar } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const SuccessStoriesPage = () => {
  const { isDarkMode } = useTheme();
  const stories = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Web Developer",
      company: "TechCorp Solutions",
      location: "Colombo, Sri Lanka",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      story: "This platform helped me discover my passion for web development. The career assessment showed I had strong analytical skills and creativity, leading me to pursue a career in tech. Today, I'm a senior developer at a leading software company!",
      achievements: ["Landed dream job in 3 months", "Promoted to Senior Developer", "Leading a team of 5 developers"],
      date: "2023"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      role: "Nursing Professional",
      company: "National Hospital",
      location: "Kandy, Sri Lanka",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      story: "I was unsure about my career path after A/Ls. The questionnaire revealed my strong empathy and desire to help others. The NTS program recommendation was perfect for me, and now I'm making a real difference in healthcare.",
      achievements: ["Completed NTS program", "Working in ICU department", "Mentoring new nurses"],
      date: "2023"
    },
    {
      id: 3,
      name: "Priya Fernando",
      role: "Technical Specialist",
      company: "German Tech Solutions",
      location: "Hamburg, Germany",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      story: "This platform opened doors I never knew existed. The German Technical program recommendation changed my life completely. I'm now working in Germany with excellent career prospects and a bright future ahead.",
      achievements: ["Moved to Germany", "Earning 3x previous salary", "Learning German fluently"],
      date: "2024"
    },
    {
      id: 4,
      name: "Michael Perera",
      role: "Vocational Trainer",
      company: "VTA Institute",
      location: "Galle, Sri Lanka",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      story: "After O/Ls, I was lost about my future. The assessment showed I had strong practical skills and teaching abilities. The VTA program was the perfect fit, and now I'm training the next generation of skilled workers.",
      achievements: ["Became certified trainer", "Training 50+ students", "Opened own workshop"],
      date: "2023"
    },
    {
      id: 5,
      name: "Anjali Silva",
      role: "Healthcare Administrator",
      company: "Private Medical Center",
      location: "Negombo, Sri Lanka",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      story: "This platform helped me combine my organizational skills with my passion for healthcare. The career guidance led me to healthcare administration, where I can make a meaningful impact while using my management abilities.",
      achievements: ["Streamlined patient care", "Reduced wait times by 40%", "Managing 20+ staff members"],
      date: "2024"
    },
    {
      id: 6,
      name: "David Wickramasinghe",
      role: "Technical Engineer",
      company: "Industrial Solutions Ltd",
      location: "Colombo, Sri Lanka",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      story: "The German Technical program recommendation was spot-on. I've developed advanced technical skills and now work on complex industrial projects. The international exposure has been incredible.",
      achievements: ["Leading technical projects", "International certifications", "Mentoring junior engineers"],
      date: "2023"
    }
  ];

  return (
    <div className={`p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="mb-8">
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Success Stories</h1>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-lg`}>
          Discover how our platform has transformed lives and launched successful careers across Sri Lanka and beyond.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div key={story.id} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300`}>
            <div className="flex items-center mb-4">
              <img
                src={story.image}
                alt={story.name}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{story.name}</h3>
                <p className="text-orange-400 font-medium">{story.role}</p>
                <div className={`flex items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm mt-1`}>
                  <MapPin size={14} className="mr-1" />
                  {story.location}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <Quote size={20} className="text-orange-400 mb-2" />
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} italic leading-relaxed`}>
                "{story.story}"
              </p>
            </div>

            <div className="mb-4">
              <h4 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-semibold mb-2 flex items-center`}>
                <Star size={16} className="mr-2 text-yellow-400" />
                Key Achievements
              </h4>
              <ul className="space-y-1">
                {story.achievements.map((achievement, index) => (
                  <li key={index} className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm flex items-center`}>
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>

            <div className={`flex items-center justify-between text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                {story.date}
              </div>
              <div className="text-orange-400 font-medium">
                {story.company}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-12 bg-gradient-to-r from-orange-600 to-purple-600 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Ready to Write Your Success Story?
        </h2>
        <p className="text-gray-100 mb-6 text-lg">
          Take our career assessment and discover your perfect career path today.
        </p>
        <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
          Start Your Journey
        </button>
      </div>
    </div>
  );
};

export default SuccessStoriesPage;
