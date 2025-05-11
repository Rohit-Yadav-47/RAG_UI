import { useState } from 'react';
import { Database, Plus, Search, Filter, ArrowUpDown, Settings, BarChart2, PlusCircle, Code, Upload, Trash2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

type EmbeddingModel = {
  id: string;
  name: string;
  provider: string;
  dimensions: number;
  status: 'active' | 'inactive';
  lastUsed: string;
};

export default function Embeddings() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<'models' | 'usage'>('models');
  
  // Sample data
  const embeddingModels: EmbeddingModel[] = [
    {
      id: '1',
      name: 'text-embedding-ada-002',
      provider: 'OpenAI',
      dimensions: 1536,
      status: 'active',
      lastUsed: '2023-10-15'
    },
    {
      id: '2',
      name: 'text-embedding-3-small',
      provider: 'OpenAI',
      dimensions: 1536,
      status: 'active',
      lastUsed: '2023-10-18'
    },
    {
      id: '3',
      name: 'text-embedding-3-large',
      provider: 'OpenAI',
      dimensions: 3072,
      status: 'inactive',
      lastUsed: '2023-09-28'
    },
    {
      id: '4',
      name: 'e5-large-v2',
      provider: 'Hugging Face',
      dimensions: 1024,
      status: 'active',
      lastUsed: '2023-10-12'
    },
    {
      id: '5',
      name: 'gte-small',
      provider: 'Hugging Face',
      dimensions: 384,
      status: 'inactive',
      lastUsed: '2023-09-05'
    }
  ];

  const filteredModels = embeddingModels.filter(model => 
    model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`h-full flex flex-col ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`px-6 py-4 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              <div className="flex items-center">
                <Database className={`mr-2 h-6 w-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                Embeddings
              </div>
            </h1>
            
            <div className="flex space-x-2">
              <button className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center ${
                isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}>
                <Upload className="h-4 w-4 mr-2" />
                Import Model
              </button>
              
              <button className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center ${
                isDark ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}>
                <Plus className="h-4 w-4 mr-2" />
                Add Model
              </button>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex space-x-1">
              <button 
                onClick={() => setSelectedTab('models')}
                className={`px-4 py-2 text-sm font-medium rounded-lg ${
                  selectedTab === 'models' 
                    ? isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 shadow-sm border border-gray-200' 
                    : isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Models
              </button>
              <button 
                onClick={() => setSelectedTab('usage')}
                className={`px-4 py-2 text-sm font-medium rounded-lg ${
                  selectedTab === 'usage' 
                    ? isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 shadow-sm border border-gray-200' 
                    : isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Usage Analytics
              </button>
            </div>
            
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search models..."
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
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {selectedTab === 'models' ? (
          <div className={`rounded-xl border overflow-hidden ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
            {/* Table header */}
            <div className={`px-6 py-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className="flex items-center text-sm font-medium">
                <div className="w-1/3">
                  <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>Name</span>
                </div>
                <div className="w-1/6">
                  <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>Provider</span>
                </div>
                <div className="w-1/6">
                  <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>Dimensions</span>
                </div>
                <div className="w-1/6">
                  <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>Status</span>
                </div>
                <div className="w-1/6">
                  <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>Last Used</span>
                </div>
                <div className="w-1/12 text-right">
                  <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>Actions</span>
                </div>
              </div>
            </div>
            
            {/* Table content */}
            <div className={isDark ? 'bg-gray-900' : 'bg-white'}>
              {filteredModels.length === 0 ? (
                <div className={`p-8 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Database className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p className="text-lg font-medium mb-2">No embedding models found</p>
                  <p className="mb-4">Add your first embedding model to get started</p>
                  <button className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    isDark ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}>
                    <PlusCircle className="h-4 w-4 inline mr-2" />
                    Add Model
                  </button>
                </div>
              ) : (
                filteredModels.map((model, index) => (
                  <div 
                    key={model.id}
                    className={`flex items-center px-6 py-4 ${
                      index !== filteredModels.length - 1 
                        ? isDark ? 'border-b border-gray-800' : 'border-b border-gray-200' 
                        : ''
                    } hover:${isDark ? 'bg-gray-800/50' : 'bg-gray-50'} transition-colors duration-150`}
                  >
                    <div className="w-1/3 flex items-center">
                      <Code className={`h-5 w-5 mr-3 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                      <div>
                        <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {model.name}
                        </div>
                      </div>
                    </div>
                    <div className="w-1/6">
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {model.provider}
                      </span>
                    </div>
                    <div className="w-1/6">
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {model.dimensions}
                      </span>
                    </div>
                    <div className="w-1/6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        model.status === 'active' 
                          ? isDark ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-800'
                          : isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {model.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="w-1/6">
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {model.lastUsed}
                      </span>
                    </div>
                    <div className="w-1/12 flex justify-end space-x-1">
                      <button className={`p-1 rounded-full ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                        <Settings className="h-4 w-4" />
                      </button>
                      <button className={`p-1 rounded-full ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                        <BarChart2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          // Usage Analytics View
          <div className={`rounded-xl border overflow-hidden ${isDark ? 'border-gray-800' : 'border-gray-200'} p-6`}>
            <div className="text-center">
              <BarChart2 className={`h-16 w-16 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
              <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Embedding Usage Analytics
              </h3>
              <p className={`max-w-md mx-auto mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Track your embedding model usage, performance metrics, and cost analysis over time.
              </p>
              <button className={`px-4 py-2 rounded-lg text-sm font-medium ${
                isDark ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}>
                Enable Analytics
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}