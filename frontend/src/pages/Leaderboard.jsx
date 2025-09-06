import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../utils/api";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

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
    { id: "all", name: "All Categories", icon: "🏆", color: "from-yellow-400 to-amber-600" },
    { id: "technology", name: "Technology", icon: "💻", color: "from-blue-500 to-cyan-600" },
    { id: "healthcare", name: "Healthcare", icon: "🏥", color: "from-green-500 to-emerald-600" },
    { id: "finance", name: "Finance", icon: "💰", color: "from-purple-500 to-pink-600" },
    { id: "design", name: "Design", icon: "🎨", color: "from-pink-500 to-rose-600" }
  ];

  const filteredData = selectedCategory === "all" 
    ? leaderboardData 
    : leaderboardData.filter(item => item.career?.toLowerCase().includes(selectedCategory));

  const getRankIcon = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="main-content bg-white dark:bg-slate-900 text-gray-900 dark:text-white transition-all duration-300 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-cyan-600 dark:text-cyan-300 text-lg">Loading leaderboard...</p>
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
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🏆</span>
              </div>
              <h1 className="text-h1 text-white dark:text-white mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Leaderboard</span>
              </h1>
              <p className="text-subtitle text-white/80 dark:text-white/80 max-w-3xl mx-auto">
                Champions of career development. See where you rank among the best.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Category Filter - Dashboard Card Style */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-h2 text-gray-900 dark:text-white mb-2">Browse by Category</h2>
              <p className="text-subtitle text-gray-600 dark:text-gray-400">Filter rankings by career field</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category.id
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

          {/* Top 3 Podium - Dashboard Card Style */}
          {filteredData.length >= 3 && (
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-h2 text-gray-900 dark:text-white mb-2">Top Performers</h2>
                <p className="text-subtitle text-gray-600 dark:text-gray-400">The best of the best</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-4xl mx-auto">
                {/* Second Place */}
                {filteredData[1] && (
                  <div className="text-center transform hover:scale-105 transition-all duration-300">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600">
                      <div className="text-4xl mb-4">🥈</div>
                      <h3 className="text-h3 text-gray-900 dark:text-white mb-2">{filteredData[1].username}</h3>
                      <p className="text-small text-gray-600 dark:text-gray-400 mb-3">{filteredData[1].career}</p>
                      <div className="text-h2 text-gray-900 dark:text-white mb-3">{filteredData[1].score}</div>
                      <div className="text-small font-semibold text-gray-500 dark:text-gray-400">2ND PLACE</div>
                    </div>
                  </div>
                )}

                {/* First Place */}
                {filteredData[0] && (
                  <div className="text-center transform hover:scale-105 transition-all duration-300 md:-mt-4">
                    <div className="bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl shadow-2xl p-8 border border-cyan-400 dark:border-purple-500">
                      <div className="text-6xl mb-4">👑</div>
                      <h3 className="text-h2 text-white mb-2">{filteredData[0].username}</h3>
                      <p className="text-subtitle text-white/90 mb-3">{filteredData[0].career}</p>
                      <div className="text-h1 text-white mb-3">{filteredData[0].score}</div>
                      <div className="text-small font-bold text-cyan-200">CHAMPION</div>
                    </div>
                  </div>
                )}

                {/* Third Place */}
                {filteredData[2] && (
                  <div className="text-center transform hover:scale-105 transition-all duration-300">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600">
                      <div className="text-4xl mb-4">🥉</div>
                      <h3 className="text-h3 text-gray-900 dark:text-white mb-2">{filteredData[2].username}</h3>
                      <p className="text-small text-gray-600 dark:text-gray-400 mb-3">{filteredData[2].career}</p>
                      <div className="text-h2 text-gray-900 dark:text-white mb-3">{filteredData[2].score}</div>
                      <div className="text-small font-semibold text-gray-500 dark:text-gray-400">3RD PLACE</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Full Leaderboard - Dashboard Card Style */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-h2 text-gray-900 dark:text-white mb-2">Complete Rankings</h2>
              <p className="text-subtitle text-gray-600 dark:text-gray-400">See where everyone stands</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-6 text-left text-small font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Rank</th>
                      <th className="px-6 py-6 text-left text-small font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Player</th>
                      <th className="px-6 py-6 text-left text-small font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Career</th>
                      <th className="px-6 py-6 text-left text-small font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Score</th>
                      <th className="px-6 py-6 text-left text-small font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Progress</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredData.map((item, index) => (
                      <tr 
                        key={item.id} 
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <td className="px-6 py-6">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{getRankIcon(index + 1)}</span>
                            <span className="font-bold text-lg text-gray-900 dark:text-white">#{index + 1}</span>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                              <span className="text-white font-bold text-lg">
                                {item.username.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-bold text-lg text-gray-900 dark:text-white">{item.username}</p>
                              <p className="text-small text-gray-500 dark:text-gray-400">Level {Math.floor(item.score / 100)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <span className="inline-flex items-center px-4 py-2 rounded-full text-small font-medium bg-gradient-to-r from-cyan-500 to-purple-600 text-white">
                            {item.career}
                          </span>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex items-center">
                            <span className="font-bold text-h3 text-gray-900 dark:text-white">
                              {item.score}
                            </span>
                            <span className="text-small text-gray-500 dark:text-gray-400 ml-2">pts</span>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden">
                            <div 
                              className="h-3 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 transition-all duration-1000"
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
        </div>
      </div>
    </>
  );
};

export default Leaderboard;