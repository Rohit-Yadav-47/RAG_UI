import { useState } from 'react';
import { FileText, Plus, Trash2, Upload, CheckCircle, AlertCircle, Loader2, Search, Filter, SortDesc, Download, Share2, PlusCircle } from 'lucide-react';
import { Document } from '../types';
import { format } from 'date-fns';
import { useTheme } from '../context/ThemeContext';

const DUMMY_DOCUMENTS: Document[] = [
  {
    id: '1',
    title: 'Company Policies 2024',
    content: 'This document outlines the company policies...',
    embedding: [],
    created_at: '2024-03-01T10:00:00Z',
    status: 'ready',
    type: 'pdf',
    size: 1024576
  },
  {
    id: '2',
    title: 'Technical Documentation',
    content: 'Technical specifications and implementation details...',
    embedding: [],
    created_at: '2024-03-02T15:30:00Z',
    status: 'processing',
    type: 'doc',
    size: 2048576
  },
  {
    id: '3',
    title: 'Product Roadmap',
    content: 'Upcoming features and development timeline...',
    embedding: [],
    created_at: '2024-03-03T09:15:00Z',
    status: 'error',
    type: 'pdf',
    size: 512000
  },
  {
    id: '4',
    title: 'Market Research Analysis',
    content: 'Analysis of current market trends and competitor strategies...',
    embedding: [],
    created_at: '2024-03-15T14:20:00Z',
    status: 'ready',
    type: 'xlsx',
    size: 3145728
  },
  {
    id: '5',
    title: 'Quarterly Financial Report',
    content: 'Financial performance metrics for Q1 2024...',
    embedding: [],
    created_at: '2024-04-05T11:45:00Z',
    status: 'ready',
    type: 'pdf',
    size: 1572864
  },
  {
    id: '6',
    title: 'Project Milestones',
    content: 'Key project milestones and deadlines for upcoming quarters...',
    embedding: [],
    created_at: '2024-04-08T09:30:00Z',
    status: 'ready',
    type: 'doc',
    size: 856123
  }
];

export default function Documents() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [documents, setDocuments] = useState<Document[]>(DUMMY_DOCUMENTS);
  const [isDragging, setIsDragging] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'pdf' | 'doc' | 'other'>('all');

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file drop logic here
  };

  const formatFileSize = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'ready':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'processing':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };
  
  const getStatusText = (status: Document['status']) => {
    switch (status) {
      case 'ready':
        return "Ready for use";
      case 'processing':
        return "Processing...";
      case 'error':
        return "Error processing";
    }
  };
  
  const getFileIcon = (type: string) => {
    const iconClasses = `w-10 h-10 p-2 rounded-lg ${
      type === 'pdf' ? 'bg-red-100 text-red-700' : 
      type === 'doc' ? 'bg-blue-100 text-blue-700' : 
      type === 'xlsx' ? 'bg-green-100 text-green-700' : 
      'bg-purple-100 text-purple-700'
    }`;
    
    return <FileText className={iconClasses} />;
  };
  
  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const filteredDocuments = documents
    .filter(doc => doc.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(doc => activeFilter === 'all' || 
      (activeFilter === 'pdf' && doc.type === 'pdf') ||
      (activeFilter === 'doc' && doc.type === 'doc') ||
      (activeFilter === 'other' && doc.type !== 'pdf' && doc.type !== 'doc')
    );

  return (
    <div className={`flex-1 p-6 max-w-6xl mx-auto w-full ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Documents</h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Upload, manage and analyze your documents
          </p>
        </div>
        
        <button className={`flex items-center px-4 py-2 ${
          isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
        } text-white rounded-lg transition-colors`}>
          <PlusCircle className="w-5 h-5 mr-2" />
          New Document
        </button>
      </div>
      
      {/* Search and filters */}
      <div className={`flex flex-wrap gap-4 mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        <div className={`relative flex-1 min-w-[240px]`}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
            onClick={() => setActiveFilter('pdf')}
            className={`px-4 py-2 text-sm font-medium ${
              activeFilter === 'pdf' 
                ? isDark ? 'bg-gray-700 text-white' : 'bg-white text-blue-600' 
                : isDark ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            PDF
          </button>
          <button 
            onClick={() => setActiveFilter('doc')}
            className={`px-4 py-2 text-sm font-medium ${
              activeFilter === 'doc' 
                ? isDark ? 'bg-gray-700 text-white' : 'bg-white text-blue-600' 
                : isDark ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            DOC
          </button>
          <button 
            onClick={() => setActiveFilter('other')}
            className={`px-4 py-2 text-sm font-medium ${
              activeFilter === 'other' 
                ? isDark ? 'bg-gray-700 text-white' : 'bg-white text-blue-600' 
                : isDark ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Other
          </button>
        </div>
        
        <button className={`flex items-center px-3 py-2 rounded-lg ${
          isDark ? 'bg-gray-800 text-gray-300 border border-gray-700' : 'bg-white text-gray-700 border border-gray-200'
        }`}>
          <SortDesc className="w-5 h-5 mr-2" />
          <span>Sort</span>
        </button>
      </div>

      {/* Document upload area */}
      <div
        className={`mb-6 border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging 
            ? isDark ? 'border-blue-500 bg-blue-900/20' : 'border-blue-500 bg-blue-50' 
            : isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300'
        } transition-colors`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className={`w-12 h-12 ${isDark ? 'text-gray-400' : 'text-gray-400'} mx-auto mb-4`} />
        <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
          Drag and drop your documents here, or{' '}
          <button className="text-blue-600 hover:underline">browse</button>
        </p>
        <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-2`}>
          Supported formats: PDF, DOC, TXT, XLSX (Max size: 10MB)
        </p>
      </div>

      {/* Document cards */}
      {filteredDocuments.length === 0 ? (
        <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <FileText className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <h3 className="text-lg font-medium mb-2">No documents found</h3>
          <p>Try changing your search or upload a new document</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className={`p-4 rounded-lg border ${
              isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } transition-all hover:shadow-md`}>
              <div className="flex items-start">
                {getFileIcon(doc.type)}
                
                <div className="flex-1 ml-3">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-medium truncate ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      {doc.title}
                    </h3>
                  </div>
                  <div className={`flex items-center gap-2 mt-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <span className="uppercase font-medium">{doc.type}</span>
                    <span>•</span>
                    <span>{formatFileSize(doc.size)}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    {getStatusIcon(doc.status)}
                    <span className={`ml-1.5 text-xs ${
                      doc.status === 'ready' ? 'text-green-500' : 
                      doc.status === 'processing' ? 'text-blue-500' : 
                      'text-red-500'
                    }`}>
                      {getStatusText(doc.status)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-4`}>
                Added {format(new Date(doc.created_at), 'MMM d, yyyy')}
              </div>
              
              <div className={`mt-3 pt-3 border-t flex justify-between ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                <div className="flex space-x-2">
                  <button className={`p-1.5 rounded ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                    <Download className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  </button>
                  <button className={`p-1.5 rounded ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                    <Share2 className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  </button>
                </div>
                <button 
                  onClick={() => handleDeleteDocument(doc.id)}
                  className={`p-1.5 rounded text-red-500 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-6 text-center">
        <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
          Showing {filteredDocuments.length} of {documents.length} documents
        </p>
      </div>
    </div>
  );
}