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
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-yellow-300 text-lg">Loading leaderboard...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-950">
        <style jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');
          
          * {
            font-family: 'Orbitron', sans-serif;
          }
          
          @keyframes trophy-bounce {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-10px) rotate(-5deg); }
            75% { transform: translateY(-10px) rotate(5deg); }
          }
          
          @keyframes rank-glow {
            0%, 100% { 
              box-shadow: 0 0 20px rgba(251, 191, 36, 0.5),
                          0 0 40px rgba(251, 191, 36, 0.3),
                          0 0 60px rgba(251, 191, 36, 0.1);
            }
            50% { 
              box-shadow: 0 0 30px rgba(251, 191, 36, 0.8),
                          0 0 60px rgba(251, 191, 36, 0.5),
                          0 0 90px rgba(251, 191, 36, 0.3);
            }
          }
          
          @keyframes slide-in-rank {
            from { 
              opacity: 0; 
              transform: translateX(-50px);
            }
            to { 
              opacity: 1; 
              transform: translateX(0);
            }
          }
          
          .trophy-bounce {
            animation: trophy-bounce 3s ease-in-out infinite;
          }
          
          .rank-glow {
            animation: rank-glow 2s ease-in-out infinite;
          }
          
          .rank-row {
            animation: slide-in-rank 0.5s ease-out forwards;
          }
          
          .cyber-grid {
            background-image: 
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
            background-size: 50px 50px;
          }
          
          .neon-text {
            text-shadow: 0 0 10px currentColor,
                         0 0 20px currentColor,
                         0 0 30px currentColor,
                         0 0 40px currentColor;
          }
        `}</style>

        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-amber-900 via-slate-900 to-yellow-900 py-24 cyber-grid">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="trophy-bounce inline-block mb-6">
              <span className="text-8xl">🏆</span>
            </div>
            <h1 className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 mb-6 neon-text">
              LEADERBOARD
            </h1>
            <p className="text-2xl text-amber-200 max-w-3xl mx-auto font-light">
              Champions of career development. See where you rank among the best.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Category Filter */}
          <div className="mb-16">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-8 py-4 rounded-2xl font-bold uppercase tracking-wider transition-all duration-300 transform hover:scale-110 ${
                    selectedCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg hover:shadow-xl rank-glow`
                      : 'bg-slate-800/50 backdrop-blur-lg text-gray-400 hover:text-white hover:bg-slate-700/50 border border-slate-700'
                  }`}
                >
                  <span className="mr-2 text-2xl">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Top 3 Podium */}
          {filteredData.length >= 3 && (
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end max-w-4xl mx-auto">
                {/* Second Place */}
                {filteredData[1] && (
                  <div className="text-center transform hover:scale-105 transition-all duration-300">
                    <div className="bg-gradient-to-br from-gray-400 to-gray-600 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                      <div className="relative z-10">
                        <div className="text-6xl mb-4">🥈</div>
                        <h3 className="text-2xl font-bold text-white mb-2">{filteredData[1].username}</h3>
                        <p className="text-gray-200 mb-2">{filteredData[1].career}</p>
                        <div className="text-4xl font-black text-white neon-text">{filteredData[1].score}</div>
                      </div>
                    </div>
                    <div className="mt-4 text-2xl font-bold text-gray-400">2ND PLACE</div>
                  </div>
                )}

                {/* First Place */}
                {filteredData[0] && (
                  <div className="text-center transform hover:scale-105 transition-all duration-300 md:-mt-8">
                    <div className="bg-gradient-to-br from-yellow-400 to-amber-600 p-10 rounded-3xl shadow-2xl relative overflow-hidden rank-glow">
                      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
                      <div className="relative z-10">
                        <div className="text-8xl mb-4 trophy-bounce">👑</div>
                        <h3 className="text-3xl font-bold text-white mb-2">{filteredData[0].username}</h3>
                        <p className="text-yellow-100 mb-2">{filteredData[0].career}</p>
                        <div className="text-5xl font-black text-white neon-text">{filteredData[0].score}</div>
                      </div>
                    </div>
                    <div className="mt-4 text-3xl font-black text-yellow-400 neon-text">CHAMPION</div>
                  </div>
                )}

                {/* Third Place */}
                {filteredData[2] && (
                  <div className="text-center transform hover:scale-105 transition-all duration-300">
                    <div className="bg-gradient-to-br from-orange-600 to-orange-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                      <div className="relative z-10">
                        <div className="text-6xl mb-4">🥉</div>
                        <h3 className="text-2xl font-bold text-white mb-2">{filteredData[2].username}</h3>
                        <p className="text-orange-200 mb-2">{filteredData[2].career}</p>
                        <div className="text-4xl font-black text-white neon-text">{filteredData[2].score}</div>
                      </div>
                    </div>
                    <div className="mt-4 text-2xl font-bold text-orange-400">3RD PLACE</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Full Leaderboard */}
          <div className="mb-16">
            <h2 className="text-4xl font-black text-white text-center mb-12 uppercase tracking-wider">Complete Rankings</h2>
            <div className="bg-slate-900/50 backdrop-blur-lg rounded-3xl overflow-hidden border border-slate-800">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-slate-800 to-slate-900">
                    <tr>
                      <th className="px-6 py-6 text-left text-sm font-bold text-yellow-400 uppercase tracking-wider">Rank</th>
                      <th className="px-6 py-6 text-left text-sm font-bold text-yellow-400 uppercase tracking-wider">Player</th>
                      <th className="px-6 py-6 text-left text-sm font-bold text-yellow-400 uppercase tracking-wider">Career</th>
                      <th className="px-6 py-6 text-left text-sm font-bold text-yellow-400 uppercase tracking-wider">Score</th>
                      <th className="px-6 py-6 text-left text-sm font-bold text-yellow-400 uppercase tracking-wider">Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredData.map((item, index) => (
                      <tr 
                        key={item.id} 
                        className="rank-row hover:bg-slate-800/50 transition-colors duration-200"
                        style={{animationDelay: `${index * 0.05}s`}}
                      >
                        <td className="px-6 py-6">
                          <div className="flex items-center">
                            <span className="text-3xl mr-3">{getRankIcon(index + 1)}</span>
                            <span className="font-bold text-xl text-gray-300">#{index + 1}</span>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                              <span className="text-white font-bold text-lg">
                                {item.username.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-bold text-lg text-white">{item.username}</p>
                              <p className="text-sm text-gray-500">Level {Math.floor(item.score / 100)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                            {item.career}
                          </span>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex items-center">
                            <span className="font-black text-3xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">
                              {item.score}
                            </span>
                            <span className="text-sm text-gray-500 ml-2">pts</span>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="w-32 bg-slate-700 rounded-full h-3 overflow-hidden">
                            <div 
                              className="h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-1000"
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