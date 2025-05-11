import { useState } from 'react';
import { FileText, FileUp, PlusCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import DocumentUploader from '../components/DocumentUploader';
import DocumentList from '../components/DocumentList';
import { useDocuments } from '../context/DocumentContext';

export default function Documents() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { documents } = useDocuments();
  const [activeTab, setActiveTab] = useState<'all' | 'upload'>('all');

  return (
    <div className={`h-full flex flex-col ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`px-6 py-4 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              <div className="flex items-center">
                <FileText className={`mr-2 h-6 w-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                Documents
              </div>
            </h1>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('upload')}
                className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center ${
                  isDark ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Document
              </button>
            </div>
          </div>
          
          <div className="flex space-x-1">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                activeTab === 'all' 
                  ? isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 shadow-sm border border-gray-200' 
                  : isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Document Library
            </button>
            <button 
              onClick={() => setActiveTab('upload')}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                activeTab === 'upload' 
                  ? isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 shadow-sm border border-gray-200' 
                  : isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Upload Documents
            </button>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {activeTab === 'all' ? (
          <DocumentList />
        ) : (
          <div className={`rounded-xl border p-6 ${isDark ? 'border-gray-800 bg-gray-800/50' : 'border-gray-200 bg-white'}`}>
            <div className="flex items-center mb-6">
              <div className={`p-3 rounded-full ${isDark ? 'bg-blue-900/50' : 'bg-blue-100'}`}>
                <FileUp className={`h-6 w-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div className="ml-4">
                <h2 className={`text-xl font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Upload Documents
                </h2>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Upload documents to use in the RAG system. Supported formats: PDF, TXT, DOC.
                </p>
              </div>
            </div>
            
            <DocumentUploader />
          </div>
        )}
      </div>
      
      {/* Bottom stats bar */}
      <div className={`border-t ${isDark ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'} p-4`}>
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            <span className="font-medium">{documents.length}</span> documents in library
          </div>
        </div>
      </div>
    </div>
  );
}