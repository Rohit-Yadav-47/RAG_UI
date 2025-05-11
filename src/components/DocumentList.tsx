import React from 'react';
import { FileText, Trash2, ExternalLink, MoreHorizontal, Search } from 'lucide-react';
import { useDocuments } from '../context/DocumentContext';
import { useTheme } from '../context/ThemeContext';
import { formatDistanceToNow, format } from 'date-fns';

export default function DocumentList() {
  const { documents, removeDocument } = useDocuments();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredDocuments = searchQuery.trim() === ''
    ? documents
    : documents.filter(doc => 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.content.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const getDocumentTypeIcon = (type: string) => {
    return <FileText className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleRemoveDocument = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeDocument(id);
  };

  const getPreviewContent = (content: string) => {
    return content.substring(0, 100) + (content.length > 100 ? '...' : '');
  };

  const handleDocumentClick = (document: any) => {
    console.log('Document clicked:', document);
    // In a real app, this might open a document viewer or something
  };

  return (
    <div className="w-full space-y-4">
      {/* Search bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search documents..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full pl-10 pr-4 py-2 rounded-lg ${
            isDark 
              ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:ring-blue-500' 
              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
          }`}
        />
        <Search className={`absolute left-3 top-2.5 h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
      </div>
      
      {/* Document list */}
      {filteredDocuments.length > 0 ? (
        <div className={`rounded-xl overflow-hidden border ${
          isDark ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <div className={`px-6 py-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <div className="flex items-center text-sm font-medium">
              <div className="w-8"></div>
              <div className="flex-1">
                <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>Document</span>
              </div>
              <div className="w-24">
                <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>Size</span>
              </div>
              <div className="w-32 hidden md:block">
                <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>Added</span>
              </div>
              <div className="w-20 text-right">
                <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>Actions</span>
              </div>
            </div>
          </div>
          
          <div className={isDark ? 'bg-gray-900' : 'bg-white'}>
            {filteredDocuments.map((doc) => (
              <div 
                key={doc.id}
                onClick={() => handleDocumentClick(doc)}
                className={`flex items-center px-6 py-4 border-b cursor-pointer ${
                  isDark ? 'border-gray-800 hover:bg-gray-800/50' : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="w-8">
                  {getDocumentTypeIcon(doc.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {doc.title}
                  </p>
                  <p className={`text-xs truncate mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {getPreviewContent(doc.content)}
                  </p>
                </div>
                <div className="w-24">
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {formatFileSize(doc.size)}
                  </span>
                </div>
                <div className="w-32 hidden md:block">
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {formatDistanceToNow(new Date(doc.created_at), { addSuffix: true })}
                  </span>
                </div>
                <div className="w-20 flex justify-end">
                  <button
                    onClick={(e) => handleRemoveDocument(doc.id, e)}
                    className={`p-1.5 rounded-full ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-500'}`}
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button className={`p-1.5 rounded-full ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-500'}`}>
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={`text-center py-10 rounded-lg border ${
          isDark ? 'border-gray-800 bg-gray-800/20' : 'border-gray-200 bg-gray-50'
        }`}>
          <FileText className={`h-12 w-12 mx-auto mb-3 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
          <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            No documents found
          </h3>
          <p className={`max-w-md mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {searchQuery.trim() !== '' ? 
              'No documents match your search. Try different keywords.' : 
              'Upload documents to get started with RAG.'}
          </p>
        </div>
      )}
    </div>
  );
} 