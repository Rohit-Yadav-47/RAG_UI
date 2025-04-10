import { BarChart3, FileText, Clock, Users, ArrowUpRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Dummy data for the dashboard
  const stats = [
    { id: 1, name: 'Documents', value: '24', icon: FileText, change: '+12%', color: isDark ? 'bg-blue-600' : 'bg-blue-500' },
    { id: 2, name: 'Conversations', value: '156', icon: BarChart3, change: '+8%', color: isDark ? 'bg-purple-600' : 'bg-purple-500' },
    { id: 3, name: 'Active Time', value: '5.2h', icon: Clock, change: '+23%', color: isDark ? 'bg-green-600' : 'bg-green-500' },
    { id: 4, name: 'Team Members', value: '7', icon: Users, change: '+2', color: isDark ? 'bg-amber-600' : 'bg-amber-500' },
  ];
  
  const recentDocuments = [
    { id: 1, title: 'Q1 Financial Report', updated: '2 hours ago', type: 'PDF' },
    { id: 2, title: 'Product Roadmap 2025', updated: '1 day ago', type: 'DOCX' },
    { id: 3, title: 'Customer Feedback Summary', updated: '3 days ago', type: 'XLSX' },
  ];
  
  const recentChats = [
    { id: 1, title: 'Document Analysis', messages: 24, updated: '1 hour ago' },
    { id: 2, title: 'Data Extraction', messages: 18, updated: '3 hours ago' },
    { id: 3, title: 'Research Summary', messages: 42, updated: '1 day ago' },
  ];

  return (
    <div className={`p-6 max-w-7xl mx-auto w-full ${isDark ? 'bg-dark-300 text-gray-100' : ''}`}>
      {/* Welcome section */}
      <div className="mb-8">
        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Welcome back, {user?.name || 'User'}!</h1>
        <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Here's what's happening with your documents and conversations.</p>
      </div>
      
      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.id} className={`rounded-xl shadow-sm p-6 border ${
            isDark ? 'bg-dark-400 border-dark-100' : 'bg-white border-gray-100'
          }`}>
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.name}</p>
                <p className={`text-2xl font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg text-white`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className={`font-medium flex items-center ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                {stat.change} <ArrowUpRight className="w-3 h-3 ml-1" />
              </span>
              <span className={`ml-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>from last month</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Two column layout for recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent documents */}
        <div className={`rounded-xl shadow-sm overflow-hidden border ${
          isDark ? 'bg-dark-400 border-dark-100' : 'bg-white border-gray-100'
        }`}>
          <div className={`p-6 border-b ${isDark ? 'border-dark-100' : 'border-gray-100'}`}>
            <div className="flex justify-between items-center">
              <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Recent Documents</h2>
              <Link to="/documents" className={`text-sm font-medium flex items-center ${
                isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
              }`}>
                View all <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
          <div className={`divide-y ${isDark ? 'divide-dark-100' : 'divide-gray-100'}`}>
            {recentDocuments.map((doc) => (
              <div key={doc.id} className={`p-4 transition-colors ${
                isDark ? 'hover:bg-dark-300' : 'hover:bg-gray-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded flex items-center justify-center font-medium text-xs ${
                      isDark ? 'bg-blue-900 text-blue-400' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {doc.type}
                    </div>
                    <div className="ml-3">
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{doc.title}</p>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Updated {doc.updated}</p>
                    </div>
                  </div>
                  <button className={isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent conversations */}
        <div className={`rounded-xl shadow-sm overflow-hidden border ${
          isDark ? 'bg-dark-400 border-dark-100' : 'bg-white border-gray-100'
        }`}>
          <div className={`p-6 border-b ${isDark ? 'border-dark-100' : 'border-gray-100'}`}>
            <div className="flex justify-between items-center">
              <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Recent Conversations</h2>
              <Link to="/history" className={`text-sm font-medium flex items-center ${
                isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
              }`}>
                View all <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
          <div className={`divide-y ${isDark ? 'divide-dark-100' : 'divide-gray-100'}`}>
            {recentChats.map((chat) => (
              <div key={chat.id} className={`p-4 transition-colors ${
                isDark ? 'hover:bg-dark-300' : 'hover:bg-gray-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isDark ? 'bg-indigo-900 text-indigo-400' : 'bg-indigo-100 text-indigo-600'
                    }`}>
                      <BarChart3 className="w-5 h-5" />
                    </div>
                    <div className="ml-3">
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{chat.title}</p>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{chat.messages} messages • {chat.updated}</p>
                    </div>
                  </div>
                  <button className={isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Quick actions */}
      <div className={`mt-8 rounded-xl p-6 border ${
        isDark 
          ? 'bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border-blue-900/30' 
          : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100'
      }`}>
        <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <button className={`p-4 rounded-lg transition-all text-left ${
            isDark 
              ? 'bg-dark-400 border border-dark-100 hover:border-blue-800 hover:bg-dark-300' 
              : 'bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md'
          }`}>
            <FileText className={`w-6 h-6 mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>Upload Document</p>
            <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Add new documents to your library</p>
          </button>
          <button className={`p-4 rounded-lg transition-all text-left ${
            isDark 
              ? 'bg-dark-400 border border-dark-100 hover:border-purple-800 hover:bg-dark-300' 
              : 'bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md'
          }`}>
            <BarChart3 className={`w-6 h-6 mb-2 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>New Analysis</p>
            <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Start a new document analysis</p>
          </button>
          <button className={`p-4 rounded-lg transition-all text-left ${
            isDark 
              ? 'bg-dark-400 border border-dark-100 hover:border-green-800 hover:bg-dark-300' 
              : 'bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md'
          }`}>
            <Users className={`w-6 h-6 mb-2 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>Invite Team</p>
            <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Add members to your workspace</p>
          </button>
          <button className={`p-4 rounded-lg transition-all text-left ${
            isDark 
              ? 'bg-dark-400 border border-dark-100 hover:border-amber-800 hover:bg-dark-300' 
              : 'bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md'
          }`}>
            <Clock className={`w-6 h-6 mb-2 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>Schedule Report</p>
            <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Set up automated reports</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
