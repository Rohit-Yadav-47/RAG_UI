import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Bot, FileText, MessageSquare, History, Settings, LogOut, User, Home, Moon, Sun, Search, Bell, HelpCircle, BookOpen, Zap, Database, PieChart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Dummy notifications
  const notifications = [
    { id: 1, title: 'New document uploaded', time: '2 minutes ago', read: false },
    { id: 2, title: 'Analysis complete', time: '1 hour ago', read: false },
    { id: 3, title: 'System update', time: 'Yesterday', read: true },
  ];

  const isActive = (path: string) => {
    return location.pathname === path 
      ? theme === 'dark' 
        ? 'bg-dark-100 text-primary-400' 
        : 'bg-blue-50 text-primary-600' 
      : theme === 'dark'
        ? 'text-gray-300 hover:bg-dark-100'
        : 'text-gray-700 hover:bg-gray-100';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-dark-300 text-gray-100' 
        : 'bg-gray-50 text-gray-800'
    }`}>
      {/* Sidebar */}
      <aside className={`w-64 flex-shrink-0 flex flex-col transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-dark-400 border-r border-dark-100'
          : 'bg-white border-r border-gray-200'
      } ${showMobileMenu ? 'fixed inset-y-0 left-0 z-50 md:relative' : 'hidden md:flex'}`}>
        <div className={`h-16 flex items-center px-6 transition-colors duration-300 ${
          theme === 'dark' ? 'border-b border-dark-100' : 'border-b border-gray-200'
        }`}>
          <Bot className={`w-8 h-8 ${theme === 'dark' ? 'text-primary-400' : 'text-primary-600'}`} />
          <span className="ml-2 text-xl font-semibold">RAG Assistant</span>
        </div>
        
        {/* User profile section */}
        <div className={`p-4 transition-colors duration-300 ${
          theme === 'dark' ? 'border-b border-dark-100' : 'border-b border-gray-200'
        }`}>
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              theme === 'dark' ? 'bg-dark-100 text-primary-400' : 'bg-blue-100 text-primary-600'
            }`}>
              <User className="w-5 h-5" />
            </div>
            <div className="ml-3">
              <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                {user?.name || 'User'}
              </p>
              <p className={`text-xs truncate max-w-[160px] ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {user?.email || ''}
              </p>
            </div>
          </div>
        </div>
        
        {/* Search in sidebar */}
        <div className="px-4 pt-4 pb-2">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full py-2 pl-9 pr-4 rounded-lg transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-dark-200 border-dark-100 text-gray-100 placeholder-gray-500 focus:border-primary-500 focus:ring-primary-500'
                  : 'bg-gray-100 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-primary-500 focus:ring-primary-500'
              }`}
            />
            <Search className={`absolute left-3 top-2.5 w-4 h-4 ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
            }`} />
          </form>
        </div>
        
        {/* Navigation */}
        <nav className="p-4 flex-1 overflow-y-auto">
          <div className={`mb-2 text-xs font-semibold ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            MAIN
          </div>
          <ul className="space-y-1">
            <li>
              <Link
                to="/"
                className={`flex items-center px-4 py-2 rounded-lg ${isActive('/')}`}
              >
                <Home className="w-5 h-5 mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/chat"
                className={`flex items-center px-4 py-2 rounded-lg ${isActive('/chat')}`}
              >
                <MessageSquare className="w-5 h-5 mr-3" />
                Chat
              </Link>
            </li>
            <li>
              <Link
                to="/documents"
                className={`flex items-center px-4 py-2 rounded-lg ${isActive('/documents')}`}
              >
                <FileText className="w-5 h-5 mr-3" />
                Documents
              </Link>
            </li>
            <li>
              <Link
                to="/history"
                className={`flex items-center px-4 py-2 rounded-lg ${isActive('/history')}`}
              >
                <History className="w-5 h-5 mr-3" />
                History
              </Link>
            </li>
          </ul>
          
          <div className={`mt-6 mb-2 text-xs font-semibold ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            TOOLS
          </div>
          <ul className="space-y-1">
            <li>
              <Link
                to="/knowledge-base"
                className={`flex items-center px-4 py-2 rounded-lg ${isActive('/knowledge-base')}`}
              >
                <BookOpen className="w-5 h-5 mr-3" />
                Knowledge Base
              </Link>
            </li>
            <li>
              <Link
                to="/embeddings"
                className={`flex items-center px-4 py-2 rounded-lg ${isActive('/embeddings')}`}
              >
                <Database className="w-5 h-5 mr-3" />
                Embeddings
              </Link>
            </li>
            <li>
              <Link
                to="/analytics"
                className={`flex items-center px-4 py-2 rounded-lg ${isActive('/analytics')}`}
              >
                <PieChart className="w-5 h-5 mr-3" />
                Analytics
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className={`flex items-center px-4 py-2 rounded-lg ${isActive('/settings')}`}
              >
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* Bottom actions */}
        <div className={`p-4 transition-colors duration-300 ${
          theme === 'dark' ? 'border-t border-dark-100' : 'border-t border-gray-200'
        }`}>
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={`flex items-center px-4 py-2 w-full rounded-lg mb-2 ${
              theme === 'dark'
                ? 'bg-dark-100 hover:bg-dark-50 text-gray-300'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-5 h-5 mr-3" />
                Light Mode
              </>
            ) : (
              <>
                <Moon className="w-5 h-5 mr-3" />
                Dark Mode
              </>
            )}
          </button>
          
          {/* Logout button */}
          <button
            onClick={handleLogout}
            className={`flex items-center px-4 py-2 w-full rounded-lg ${
              theme === 'dark'
                ? 'text-red-400 hover:bg-dark-100'
                : 'text-red-600 hover:bg-red-50'
            }`}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile menu button - visible on small screens */}
      <button 
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        className={`md:hidden fixed bottom-4 left-4 z-50 p-3 rounded-full shadow-lg ${
          theme === 'dark'
            ? 'bg-dark-100 text-primary-400'
            : 'bg-primary-600 text-white'
        }`}
      >
        {showMobileMenu ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className={`h-16 flex items-center px-6 transition-colors duration-300 ${
          theme === 'dark' 
            ? 'bg-dark-400 border-b border-dark-100' 
            : 'bg-white border-b border-gray-200'
        }`}>
          <div className="flex-1 flex items-center">
            {/* Mobile menu button */}
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden mr-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* Page title will be set by child components */}
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button 
                className={`p-2 rounded-full ${
                  theme === 'dark' 
                    ? 'hover:bg-dark-100' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-5 w-5" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              
              {showNotifications && (
                <div className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg z-20 ${
                  theme === 'dark'
                    ? 'bg-dark-200 border border-dark-100'
                    : 'bg-white border border-gray-200'
                }`}>
                  <div className={`px-4 py-2 flex justify-between items-center ${
                    theme === 'dark' 
                      ? 'border-b border-dark-100' 
                      : 'border-b border-gray-100'
                  }`}>
                    <h3 className="font-medium">Notifications</h3>
                    <button className={`text-xs ${
                      theme === 'dark' 
                        ? 'text-primary-400 hover:text-primary-300' 
                        : 'text-primary-600 hover:text-primary-800'
                    }`}>
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id}
                        className={`px-4 py-3 cursor-pointer flex items-start ${
                          !notification.read 
                            ? theme === 'dark' 
                              ? 'bg-dark-100' 
                              : 'bg-blue-50' 
                            : ''
                        } ${
                          theme === 'dark' 
                            ? 'hover:bg-dark-50' 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
                          !notification.read 
                            ? 'bg-primary-500' 
                            : theme === 'dark' 
                              ? 'bg-gray-600' 
                              : 'bg-gray-300'
                        }`}></div>
                        <div className="ml-3 flex-1">
                          <p className={theme === 'dark' ? 'text-sm text-gray-200' : 'text-sm text-gray-800'}>
                            {notification.title}
                          </p>
                          <p className={`text-xs mt-1 ${
                            theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                          }`}>
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={`px-4 py-2 text-center ${
                    theme === 'dark' 
                      ? 'border-t border-dark-100' 
                      : 'border-t border-gray-100'
                  }`}>
                    <button className={`text-sm ${
                      theme === 'dark' 
                        ? 'text-primary-400 hover:text-primary-300' 
                        : 'text-primary-600 hover:text-primary-800'
                    }`}>
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Help */}
            <button className={`p-2 rounded-full ${
              theme === 'dark' 
                ? 'hover:bg-dark-100' 
                : 'hover:bg-gray-100'
            }`}>
              <HelpCircle className="h-5 w-5" />
            </button>
            
            {/* Theme toggle (alternative in header) */}
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                theme === 'dark' 
                  ? 'hover:bg-dark-100' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            {/* User avatar (small) */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              theme === 'dark' 
                ? 'bg-dark-100 text-primary-400' 
                : 'bg-blue-100 text-primary-600'
            }`}>
              {user?.name?.charAt(0) || 'U'}
            </div>
          </div>
        </header>
        
        {/* Content area */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}