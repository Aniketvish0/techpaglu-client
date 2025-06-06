import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Loader2 from '../icons/Loader2';
import { Trophy, Search } from 'lucide-react';
const VITE_API_URI = import.meta.env.VITE_API_URI;

type LeaderboardEntry = {
  username: string;
  recent_score: number;
  profile_url: string;
  total_analyses: number;
};

const Leaderboard: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [filteredData, setFilteredData] = useState<LeaderboardEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get(`${VITE_API_URI}/all-user-details`);
        const sortedData = response.data.sort((a: LeaderboardEntry, b: LeaderboardEntry) => 
          b.recent_score - a.recent_score
        );
        setLeaderboardData(sortedData);
        setFilteredData(sortedData);
        setLoading(false);
      } catch (err) {
        console.error('Leaderboard fetch error:', err);
        setError('Failed to load leaderboard');
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  // Filter data when search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredData(leaderboardData);
    } else {
      const filtered = leaderboardData.filter(entry => 
        entry.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, leaderboardData]);

  const getScoreColor = (score: number) => {
    if (score > 80) return 'text-green-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[300px]">
        <div className="flex items-center text-green-400">
          <div className="animate-spin mr-2">
            <Loader2 />
          </div>
          Loading Leaderboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 p-4">
        {error}
      </div>
    );
  }

  return (
    <Card className="w-full bg-gray-900/90 border border-green-500/30 rounded-xl shadow-xl backdrop-blur-sm">
      <CardHeader className="flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-2">
          <Trophy className="text-green-400 mt-2"/>
          <CardTitle className="text-3xl font-bold text-green-400 text-center">
            TechPaglu Leaderboard
          </CardTitle>
        </div>
        
        {/* Search input with styling to match the theme */}
        <div className="relative w-full max-w-md mt-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-green-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent"
          />
        </div>
      </CardHeader>
      <CardContent>
        {filteredData.length === 0 ? (
          <p className="text-center text-gray-400">
            {leaderboardData.length === 0 ? "No entries yet" : "No matching users found"}
          </p>
        ) : (
          <div className="space-y-4">
            {filteredData.map((entry) => {
              const originalIndex = leaderboardData.findIndex(item => item.username === entry.username);
              
              return (
                <div 
                  key={entry.username} 
                  className={`flex items-center justify-between p-4 rounded-lg
                    ${originalIndex === 0 ? 'bg-green-900/30 border border-green-500/50' : 'bg-gray-800/70'}
                  `}
                >
                  <div className="flex items-center space-x-4" >
                    <span className="text-gray-400 font-bold">#{originalIndex + 1}</span>
                    <Avatar onClick={() => window.open(`https://x.com/${entry.username}`, '_blank')}>
                      <AvatarImage src={entry.profile_url} alt={entry.username} />
                      <AvatarFallback className="bg-green-500 text-black">
                        {entry.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className='overflow-hidden'>
                      <a className="font-medium text-white block max-w-[140px] truncate sm:max-w-none sm:whitespace-normal" href={`https://x.com/${entry.username}`}>@{entry.username}</a>
                      <p className="text-xs text-gray-400">
                        {entry.total_analyses} Analysis{entry.total_analyses !== 1 ? 'es' : ''}
                      </p>
                    </div>
                  </div>
                  <div className={`text-xl font-bold ${getScoreColor(entry.recent_score)}`}>
                     {entry.recent_score.toFixed(1)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Leaderboard;