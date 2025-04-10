import { useState } from 'react';
import { MessageSquare, Search, Trash2, Calendar, Clock, Filter, SortDesc, ExternalLink, Archive, Star, ChevronRight } from 'lucide-react';
import { ChatSession } from '../types';
import { format, subDays } from 'date-fns';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

// Extended dummy data with more sessions and starred property
const DUMMY_SESSIONS: ChatSession[] = [
  {
    id: '1',
    title: 'Company Policy Questions',
    created_at: '2024-04-10T14:30:00Z',
    summary: 'Discussion about updated company policies and procedures',
    messages: [],
    starred: true
  },
  {
    id: '2',
    title: 'Technical Documentation Review',
    created_at: '2024-04-09T16:45:00Z',
    summary: 'Analysis of technical specifications for the new product',
    messages: [],
    starred: false
  },
  {
    id: '3',
    title: 'Product Features Discussion',
    created_at: '2024-04-08T11:20:00Z',
    summary: 'Exploring new features for the upcoming product release',
    messages: [],
    starred: true
  },
  {
    id: '4',
    title: 'Market Analysis Data',
    created_at: '2024-04-05T09:15:00Z',
    summary: 'Reviewing market trends and competitor analysis',
    messages: [],
    starred: false
  },
  {
    id: '5',
    title: 'Project Timeline Planning',
    created_at: '2024-04-01T13:45:00Z',
    summary: 'Setting up milestones and deadlines for Q2 projects',
    messages: [],
    starred: false
  },
  {
    id: '6',
    title: 'Budget Review for Q2',
    created_at: '2024-03-28T15:20:00Z',
    summary: 'Analyzing Q1 expenses and planning for Q2 budget allocation',
    messages: [],
    starred: false
  },
  {
    id: '7',
    title: 'UI/UX Improvements',
    created_at: '2024-03-25T10:30:00Z',
    summary: 'Discussion about enhancing user experience in the dashboard',
    messages: [],
    starred: false
  },
  {
    id: '8',
    title: 'Team Performance Review',
    created_at: '2024-03-20T16:00:00Z',
    summary: 'Evaluating team performance and setting goals for next quarter',
    messages: [],
    starred: true
  }
];

export default function History() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'starred' | 'recent'>('all');
  const [sessions, setSessions] = useState<ChatSession[]>(DUMMY_SESSIONS);
  
  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle delete
  const handleDelete = (id: string) => {
    setSessions(sessions.filter(session => session.id !== id));
  };
  
  // Handle toggle star
  const handleToggleStar = (id: string) => {
    setSessions(sessions.map(session => 
      session.id === id ? { ...session, starred: !session.starred } : session
    ));
  };
  
  // Filter sessions
  const filteredSessions = sessions.filter(session => {
    // Filter by search query
    const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          session.summary?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by active filter
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'starred') return matchesSearch && session.starred;
    if (activeFilter === 'recent') {
      const sevenDaysAgo = subDays(new Date(), 7);
      return matchesSearch && new Date(session.created_at) >= sevenDaysAgo;
    }
    
    return matchesSearch;
  });

  return (
    <div className={`flex-1 p-6 max-w-6xl mx-auto w-full ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Chat History</h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Browse and search your past conversations
          </p>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className={`flex flex-wrap gap-4 mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        <div className={`relative flex-1 min-w-[240px]`}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={handleSearch}
            className={`pl-10 pr-4 py-2 w-full rounded-lg border ${
              isDark 
                ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500' 
                : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        
        <div className={`flex rounded-lg border ${
          isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
        } overflow-hidden`}>
          <button 
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 text-sm font-medium ${
              activeFilter === 'all' 
                ? isDark ? 'bg-gray-700 text-white' : 'bg-white text-blue-600' 
                : isDark ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setActiveFilter('starred')}
            className={`px-4 py-2 text-sm font-medium ${
              activeFilter === 'starred' 
                ? isDark ? 'bg-gray-700 text-white' : 'bg-white text-blue-600' 
                : isDark ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Starred
          </button>
          <button 
            onClick={() => setActiveFilter('recent')}
            className={`px-4 py-2 text-sm font-medium ${
              activeFilter === 'recent' 
                ? isDark ? 'bg-gray-700 text-white' : 'bg-white text-blue-600' 
                : isDark ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Recent
          </button>
        </div>
        
        <button className={`flex items-center px-3 py-2 rounded-lg ${
          isDark ? 'bg-gray-800 text-gray-300 border border-gray-700' : 'bg-white text-gray-700 border border-gray-200'
        }`}>
          <SortDesc className="w-5 h-5 mr-2" />
          <span>Sort</span>
        </button>
      </div>

      {/* Sessions List */}
      {filteredSessions.length === 0 ? (
        <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <h3 className="text-lg font-medium mb-2">No conversations found</h3>
          <p>Try changing your search criteria or start a new chat</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredSessions.map((session) => (
            <Link to={`/chat?session=${session.id}`} key={session.id} className={`block ${
              isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
            } rounded-lg transition-colors`}>
              <div className={`p-4 rounded-lg border ${
                session.starred 
                  ? isDark ? 'border-blue-500/30 bg-blue-500/5' : 'border-blue-200 bg-blue-50'
                  : isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
              }`}>
                <div className="flex items-start">
                  <div className={`p-3 rounded-lg ${
                    isDark ? 'bg-gray-700' : 'bg-gray-100'
                  } mr-4`}>
                    <MessageSquare className={`w-6 h-6 ${
                      isDark ? 'text-blue-400' : 'text-blue-600'
                    }`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className={`font-medium truncate ${isDark ? 'text-white' : 'text-gray-800'} pr-2`}>
                        {session.title}
                      </h3>
                      <div className="flex items-center">
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleToggleStar(session.id);
                          }}
                          className={`p-1.5 rounded-full ${
                            session.starred 
                              ? 'text-yellow-400'
                              : isDark ? 'text-gray-600 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          <Star className={`w-4 h-4 ${session.starred ? 'fill-yellow-400' : ''}`} />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDelete(session.id);
                          }} 
                          className={`p-1.5 rounded-full ${
                            isDark ? 'text-gray-600 hover:text-red-400' : 'text-gray-400 hover:text-red-600'
                          }`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <p className={`text-sm mt-1 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {session.summary}
                    </p>
                    
                    <div className={`flex items-center mt-2 text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      <Calendar className="w-3.5 h-3.5 mr-1.5" />
                      <span>{format(new Date(session.created_at), 'MMM d, yyyy')}</span>
                      <span className="mx-2">•</span>
                      <Clock className="w-3.5 h-3.5 mr-1.5" />
                      <span>{format(new Date(session.created_at), 'h:mm a')}</span>
                    </div>
                  </div>
                  
                  <ChevronRight className={`w-5 h-5 ml-2 self-center ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      
      <div className="mt-6 text-center">
        <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
          Showing {filteredSessions.length} of {sessions.length} conversations
        </p>
      </div>
    </div>
  );
}