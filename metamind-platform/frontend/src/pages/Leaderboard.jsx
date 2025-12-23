import { useState, useEffect } from "react";
import { Trophy, Medal, Award, Users, TrendingUp, Filter } from "lucide-react";
import api from "../utils/api";
import { useTheme } from "../context/ThemeContext";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const res = await api.get("/leaderboard");
        setLeaderboardData(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const categories = [
    { id: "all", name: "All Categories", icon: Trophy, color: "yellow" },
    { id: "technology", name: "Technology", icon: Users, color: "blue" },
    { id: "healthcare", name: "Healthcare", icon: Users, color: "green" },
    { id: "finance", name: "Finance", icon: Users, color: "purple" },
    { id: "design", name: "Design", icon: Users, color: "pink" }
  ];

  const filteredData = selectedCategory === "all" 
    ? leaderboardData 
    : leaderboardData.filter(item => item.career?.toLowerCase().includes(selectedCategory));

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="w-8 h-8 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-8 h-8 text-gray-400" />;
    if (rank === 3) return <Award className="w-8 h-8 text-amber-600" />;
    return <span className="text-lg font-bold text-gray-500">#{rank}</span>;
  };

  const getColorClasses = (color) => {
    const colors = {
      yellow: 'bg-yellow-100 text-yellow-600',
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
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-lg`}>Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10" />
          </div>
          <h1 className={`text-4xl sm:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Leaderboard</h1>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            See how you rank among other career explorers. Track your progress and compete with peers.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Top 3 Podium */}
        {filteredData.length >= 3 && (
          <div className="mb-16">
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} text-center mb-8`}>Top Performers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end max-w-5xl mx-auto">
              {/* Second Place */}
              {filteredData[1] && (
                <div className="text-center">
                  <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 shadow-lg ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} hover:shadow-xl transition-shadow`}>
                    <div className="w-16 h-16 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Medal className="w-8 h-8" />
                    </div>
                    <div className={`text-2xl font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-2`}>2nd Place</div>
                    <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{filteredData[1].username}</h3>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{filteredData[1].career}</p>
                    <div className={`text-3xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{filteredData[1].score} pts</div>
                  </div>
                </div>
              )}

              {/* First Place */}
              {filteredData[0] && (
                <div className="text-center md:-mt-4">
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl p-10 shadow-xl border-2 border-yellow-300">
                    <div className="w-20 h-20 bg-white text-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-10 h-10" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-2">Champion</div>
                    <h3 className="text-2xl font-bold text-white mb-2">{filteredData[0].username}</h3>
                    <p className="text-yellow-100 mb-4">{filteredData[0].career}</p>
                    <div className="text-4xl font-bold text-white">{filteredData[0].score} pts</div>
                  </div>
                </div>
              )}

              {/* Third Place */}
              {filteredData[2] && (
                <div className="text-center">
                  <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 shadow-lg ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} hover:shadow-xl transition-shadow`}>
                    <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8" />
                    </div>
                    <div className={`text-2xl font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-2`}>3rd Place</div>
                    <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{filteredData[2].username}</h3>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{filteredData[2].career}</p>
                    <div className={`text-3xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{filteredData[2].score} pts</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Full Leaderboard */}
        <div className="mb-16">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} text-center mb-8`}>Complete Rankings</h2>
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                  <tr>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Rank</th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Player</th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Career</th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Score</th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Level</th>
                  </tr>
                </thead>
                <tbody className={isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}>
                  {filteredData.map((item, index) => (
                    <tr key={item.id} className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {getRankIcon(index + 1)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
                            {item.username.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.username}</p>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Level {Math.floor(item.score / 100)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {item.career}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.score}</span>
                          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>pts</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`w-32 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2`}>
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${Math.min((item.score / 1500) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} text-center`}>
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{filteredData.length}</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Players</p>
          </div>
          
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} text-center`}>
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              {filteredData.length > 0 ? Math.max(...filteredData.map(item => item.score)) : 0}
            </h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Highest Score</p>
          </div>
          
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} text-center`}>
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              {filteredData.length > 0 ? Math.round(filteredData.reduce((sum, item) => sum + item.score, 0) / filteredData.length) : 0}
            </h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Average Score</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;