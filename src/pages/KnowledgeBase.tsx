import { useState } from 'react';
import { Search, Plus, FileText, Folder, ExternalLink, Settings, MoreHorizontal, Filter, Upload, Database, Download, BookOpen, Trash2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

type KnowledgeItem = {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'collection' | 'api';
  updatedAt: string;
  size?: string;
  status: 'active' | 'processing' | 'failed';
};

export default function KnowledgeBase() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'documents' | 'collections' | 'apis'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'updated' | 'size'>('updated');
  const [showFilters, setShowFilters] = useState(false);
  
  // Sample data
  const knowledgeItems: KnowledgeItem[] = [
    {
      id: '1',
      title: 'Product Documentation',
      description: 'Complete guide to our product features and API',
      type: 'document',
      updatedAt: '2023-10-15',
      size: '2.3 MB',
      status: 'active'
    },
    {
      id: '2',
      title: 'Customer Support Database',
      description: 'Collection of common support questions and answers',
      type: 'collection',
      updatedAt: '2023-10-10',
      size: '15.7 MB',
      status: 'active'
    },
    {
      id: '3',
      title: 'Company Wiki',
      description: 'Internal knowledge base for employees',
      type: 'document',
      updatedAt: '2023-09-28',
      size: '8.1 MB',
      status: 'processing'
    },
    {
      id: '4',
      title: 'Integration Documentation',
      description: 'Guide for third-party integrations',
      type: 'document',
      updatedAt: '2023-09-22',
      size: '1.8 MB',
      status: 'active'
    },
    {
      id: '5',
      title: 'Public API Connector',
      description: 'Connection to external data source',
      type: 'api',
      updatedAt: '2023-09-15',
      status: 'active'
    },
  ];
  
  const filteredItems = knowledgeItems.filter(item => {
    // Apply search query filter
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !item.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply tab filter
    if (activeTab !== 'all' && 
        (activeTab === 'documents' && item.type !== 'document') ||
        (activeTab === 'collections' && item.type !== 'collection') ||
        (activeTab === 'apis' && item.type !== 'api')) {
      return false;
    }
    
    return true;
  });
  
  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'name') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'updated') {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    } else if (sortBy === 'size' && a.size && b.size) {
      return parseFloat(b.size) - parseFloat(a.size);
    }
    return 0;
  });
  
  const handleToggleSelect = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };
  
  const handleSelectAll = () => {
    if (selectedItems.length === sortedItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(sortedItems.map(item => item.id));
    }
  };
  
  return (
    <div className={`flex flex-col h-full ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`border-b ${isDark ? 'border-gray-800' : 'border-gray-200'} px-6 py-4`}>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              <div className="flex items-center">
                <BookOpen className={`mr-2 h-6 w-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                Knowledge Base
              </div>
            </h1>
            
            <div className="flex items-center space-x-2">
              <button className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center ${
                isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}>
                <Upload className="h-4 w-4 mr-2" />
                Import
              </button>
              
              <button className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center ${
                isDark ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}>
                <Plus className="h-4 w-4 mr-2" />
                Add Source
              </button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 items-start sm:items-center justify-between">
            <div className="relative w-full sm:w-96">
              <input
                type="text"
                placeholder="Search knowledge base..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full py-2 pl-10 pr-4 rounded-lg ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500'
                }`}
              />
              <Search className={`absolute left-3 top-2.5 h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
            
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`px-3 py-2 rounded-lg font-medium text-sm flex items-center ${
                  isDark 
                    ? showFilters ? 'bg-gray-700 text-white' : 'bg-gray-800 text-white hover:bg-gray-700' 
                    : showFilters ? 'bg-gray-200 text-gray-800' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'updated' | 'size')}
                className={`px-3 py-2 rounded-lg font-medium text-sm ${
                  isDark 
                    ? 'bg-gray-800 text-white border-gray-700 focus:border-blue-500 focus:ring-blue-500' 
                    : 'bg-white text-gray-700 border border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                }`}
              >
                <option value="updated">Sort by: Recent</option>
                <option value="name">Sort by: Name</option>
                <option value="size">Sort by: Size</option>
              </select>
            </div>
          </div>
          
          {/* Filter panel */}
          {showFilters && (
            <div className={`mt-2 p-4 rounded-lg ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'
            }`}>
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                    activeTab === 'all' 
                      ? isDark ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800' 
                      : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Sources
                </button>
                <button 
                  onClick={() => setActiveTab('documents')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                    activeTab === 'documents' 
                      ? isDark ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800' 
                      : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Documents
                </button>
                <button 
                  onClick={() => setActiveTab('collections')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                    activeTab === 'collections' 
                      ? isDark ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800' 
                      : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Collections
                </button>
                <button 
                  onClick={() => setActiveTab('apis')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                    activeTab === 'apis' 
                      ? isDark ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800' 
                      : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  APIs
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className={`rounded-xl overflow-hidden border ${
          isDark ? 'border-gray-800' : 'border-gray-200'
        }`}>
          {/* Table header */}
          <div className={`px-6 py-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <div className="flex items-center">
              <div className="flex items-center w-12">
                <input
                  type="checkbox"
                  checked={selectedItems.length === sortedItems.length && sortedItems.length > 0}
                  onChange={handleSelectAll}
                  className={`h-4 w-4 rounded ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-600 focus:ring-offset-gray-800' 
                      : 'bg-white border-gray-300 text-blue-600 focus:ring-blue-500'
                  }`}
                />
              </div>
              <div className="flex-1 font-medium text-sm">
                <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>Title</span>
              </div>
              <div className="w-32 text-sm font-medium hidden md:block">
                <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>Type</span>
              </div>
              <div className="w-32 text-sm font-medium hidden md:block">
                <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>Updated</span>
              </div>
              <div className="w-24 text-sm font-medium hidden md:block">
                <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>Size</span>
              </div>
              <div className="w-24 text-sm font-medium">
                <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>Status</span>
              </div>
              <div className="w-20 text-sm font-medium text-right">
                <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>Actions</span>
              </div>
            </div>
          </div>
          
          {/* Table content */}
          <div className={isDark ? 'bg-gray-900' : 'bg-white'}>
            {sortedItems.length === 0 ? (
              <div className={`p-8 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-20" />
                <p className="text-lg font-medium mb-2">No knowledge sources found</p>
                <p className="mb-4">Add your first knowledge source to get started</p>
                <button className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  isDark ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}>
                  <Plus className="h-4 w-4 inline mr-2" />
                  Add Source
                </button>
              </div>
            ) : (
              sortedItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`px-6 py-4 flex items-center ${
                    index !== sortedItems.length - 1 
                      ? isDark ? 'border-b border-gray-800' : 'border-b border-gray-200' 
                      : ''
                  } ${
                    selectedItems.includes(item.id) 
                      ? isDark ? 'bg-gray-800/50' : 'bg-blue-50/50' 
                      : ''
                  } hover:${isDark ? 'bg-gray-800/30' : 'bg-gray-50/80'} transition-colors duration-150`}
                >
                  <div className="flex items-center w-12">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleToggleSelect(item.id)}
                      className={`h-4 w-4 rounded ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-600 focus:ring-offset-gray-800' 
                          : 'bg-white border-gray-300 text-blue-600 focus:ring-blue-500'
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      {item.type === 'document' && (
                        <FileText className={`h-5 w-5 mr-3 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
                      )}
                      {item.type === 'collection' && (
                        <Folder className={`h-5 w-5 mr-3 ${isDark ? 'text-yellow-400' : 'text-yellow-500'}`} />
                      )}
                      {item.type === 'api' && (
                        <Database className={`h-5 w-5 mr-3 ${isDark ? 'text-purple-400' : 'text-purple-500'}`} />
                      )}
                      <div>
                        <div className={`font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {item.title}
                        </div>
                        <div className={`text-sm truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-32 hidden md:block">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.type === 'document' 
                        ? isDark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800'
                        : item.type === 'collection'
                          ? isDark ? 'bg-yellow-900/30 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
                          : isDark ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {item.type === 'document' && 'Document'}
                      {item.type === 'collection' && 'Collection'}
                      {item.type === 'api' && 'API'}
                    </span>
                  </div>
                  <div className="w-32 hidden md:block">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {item.updatedAt}
                    </span>
                  </div>
                  <div className="w-24 hidden md:block">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {item.size || '—'}
                    </span>
                  </div>
                  <div className="w-24">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === 'active' 
                        ? isDark ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-800'
                        : item.status === 'processing'
                          ? isDark ? 'bg-yellow-900/30 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
                          : isDark ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.status === 'active' && 'Active'}
                      {item.status === 'processing' && 'Processing'}
                      {item.status === 'failed' && 'Failed'}
                    </span>
                  </div>
                  <div className="w-20 flex justify-end">
                    <button className={`p-1 rounded-full ${isDark ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                      <Download className="h-4 w-4" />
                    </button>
                    <button className={`p-1 rounded-full ${isDark ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                      <Settings className="h-4 w-4" />
                    </button>
                    <button className={`p-1 rounded-full ${isDark ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom action bar */}
      {selectedItems.length > 0 && (
        <div className={`border-t ${isDark ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'} p-4`}>
          <div className="flex items-center justify-between max-w-5xl mx-auto">
            <div className={isDark ? 'text-white' : 'text-gray-700'}>
              <span className="font-medium">{selectedItems.length}</span> item(s) selected
            </div>
            <div className="flex space-x-2">
              <button className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}>
                <Download className="h-4 w-4 inline mr-1" />
                Export
              </button>
              <button className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                isDark ? 'bg-red-900/80 text-red-300 hover:bg-red-900' : 'bg-red-100 text-red-700 hover:bg-red-200'
              }`}>
                <Trash2 className="h-4 w-4 inline mr-1" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 