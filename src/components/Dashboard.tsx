import { BarChart3, FileText, Clock, Users, ChevronRight, TrendingUp, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Dummy data for the dashboard
  const stats = [
    { 
      id: 1, 
      name: 'Documents', 
      value: '24', 
      icon: FileText, 
      change: '+12%', 
      trend: 'up',
      color: 'from-blue-500 to-blue-600',
      bgColor: isDark ? 'bg-blue-900/20' : 'bg-blue-50',
      iconColor: isDark ? 'text-blue-400' : 'text-blue-600'
    },
    { 
      id: 2, 
      name: 'Conversations', 
      value: '156', 
      icon: BarChart3, 
      change: '+8%', 
      trend: 'up',
      color: 'from-purple-500 to-purple-600',
      bgColor: isDark ? 'bg-purple-900/20' : 'bg-purple-50',
      iconColor: isDark ? 'text-purple-400' : 'text-purple-600'
    },
    { 
      id: 3, 
      name: 'Active Time', 
      value: '5.2h', 
      icon: Clock, 
      change: '+23%', 
      trend: 'up',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: isDark ? 'bg-emerald-900/20' : 'bg-emerald-50',
      iconColor: isDark ? 'text-emerald-400' : 'text-emerald-600'
    },
    { 
      id: 4, 
      name: 'Team Members', 
      value: '7', 
      icon: Users, 
      change: '+2', 
      trend: 'up',
      color: 'from-amber-500 to-amber-600',
      bgColor: isDark ? 'bg-amber-900/20' : 'bg-amber-50',
      iconColor: isDark ? 'text-amber-400' : 'text-amber-600'
    },
  ];
  
  const recentDocuments = [
    { id: 1, title: 'Q1 Financial Report', updated: '2 hours ago', type: 'PDF', size: '2.4 MB' },
    { id: 2, title: 'Product Roadmap 2025', updated: '1 day ago', type: 'DOCX', size: '1.8 MB' },
    { id: 3, title: 'Customer Feedback Summary', updated: '3 days ago', type: 'XLSX', size: '3.2 MB' },
  ];
  
  const recentChats = [
    { id: 1, title: 'Document Analysis', messages: 24, updated: '1 hour ago', status: 'active' },
    { id: 2, title: 'Data Extraction', messages: 18, updated: '3 hours ago', status: 'completed' },
    { id: 3, title: 'Research Summary', messages: 42, updated: '1 day ago', status: 'completed' },
  ];

  const quickActions = [
    {
      icon: FileText,
      title: 'Upload Document',
      description: 'Add new documents to your library',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700'
    },
    {
      icon: BarChart3,
      title: 'New Analysis',
      description: 'Start a new document analysis',
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700'
    },
    {
      icon: Users,
      title: 'Invite Team',
      description: 'Add members to your workspace',
      color: 'from-emerald-500 to-emerald-600',
      hoverColor: 'hover:from-emerald-600 hover:to-emerald-700'
    },
    {
      icon: Clock,
      title: 'Schedule Report',
      description: 'Set up automated reports',
      color: 'from-amber-500 to-amber-600',
      hoverColor: 'hover:from-amber-600 hover:to-amber-700'
    },
  ];

  return (
    <div className={`p-6 max-w-7xl mx-auto w-full ${isDark ? 'bg-dark-300 text-gray-100' : ''}`}>
      {/* Welcome section */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold bg-gradient-to-r ${isDark ? 'from-white to-gray-300' : 'from-gray-900 to-gray-700'} bg-clip-text text-transparent`}>
              Welcome back, {user?.name || 'User'}! 👋
            </h1>
            <p className={`mt-2 text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Here's what's happening with your documents and conversations.
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            <div className={`px-4 py-2 rounded-full border ${isDark ? 'bg-green-900/20 border-green-800 text-green-400' : 'bg-green-50 border-green-200 text-green-700'}`}>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={stat.id} 
            className={`card card-hover p-6 group animate-slide-up`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {stat.name}
                </p>
                <p className={`text-3xl font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-xl group-hover:scale-110 transition-transform duration-200`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm">
                <div className={`flex items-center px-2 py-1 rounded-full ${
                  stat.trend === 'up' 
                    ? isDark ? 'bg-green-900/20 text-green-400' : 'bg-green-50 text-green-600'
                    : isDark ? 'bg-red-900/20 text-red-400' : 'bg-red-50 text-red-600'
                }`}>
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span className="font-medium">{stat.change}</span>
                </div>
              </div>
              <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                vs last month
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Two column layout for recent activity */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        {/* Recent documents */}
        <div className="card overflow-hidden animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className={`p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex justify-between items-center">
              <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Recent Documents
              </h2>
              <Link 
                to="/documents" 
                className={`text-sm font-medium flex items-center transition-colors ${
                  isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                View all <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
          <div className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {recentDocuments.map((doc) => (
              <div 
                key={doc.id} 
                className={`p-4 transition-all duration-200 cursor-pointer ${
                  isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-semibold text-sm ${
                      doc.type === 'PDF' 
                        ? isDark ? 'bg-red-900/20 text-red-400' : 'bg-red-50 text-red-600'
                        : doc.type === 'DOCX'
                        ? isDark ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-50 text-blue-600'
                        : isDark ? 'bg-green-900/20 text-green-400' : 'bg-green-50 text-green-600'
                    }`}>
                      {doc.type}
                    </div>
                    <div className="ml-4 flex-1">
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        {doc.title}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          {doc.updated}
                        </span>
                        <span className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>•</span>
                        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          {doc.size}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent conversations */}
        <div className="card overflow-hidden animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className={`p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex justify-between items-center">
              <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Recent Conversations
              </h2>
              <Link 
                to="/history" 
                className={`text-sm font-medium flex items-center transition-colors ${
                  isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                View all <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
          <div className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {recentChats.map((chat) => (
              <div 
                key={chat.id} 
                className={`p-4 transition-all duration-200 cursor-pointer ${
                  isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isDark ? 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20' : 'bg-gradient-to-br from-indigo-50 to-purple-50'
                    }`}>
                      <BarChart3 className={`w-6 h-6 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center space-x-2">
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                          {chat.title}
                        </p>
                        <div className={`w-2 h-2 rounded-full ${
                          chat.status === 'active' 
                            ? 'bg-green-500 animate-pulse' 
                            : isDark ? 'bg-gray-600' : 'bg-gray-300'
                        }`}></div>
                      </div>
                      <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        {chat.messages} messages • {chat.updated}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Quick actions */}
      <div 
        className={`rounded-2xl p-8 border ${
          isDark 
            ? 'bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-indigo-900/10 border-blue-900/20' 
            : 'bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 border-blue-100'
        } animate-slide-up`}
        style={{ animationDelay: '400ms' }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-900/20' : 'bg-blue-100'}`}>
            <Zap className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Quick Actions
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button 
              key={index}
              className={`group relative p-6 rounded-xl transition-all duration-300 text-left overflow-hidden ${
                isDark 
                  ? 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-gray-600' 
                  : 'bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl'
              } hover:-translate-y-1`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              <div className="relative">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {action.title}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {action.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
