import React, { useState, useRef } from 'react';
import { FileText, Upload, X, FileUp, CheckCircle, AlertCircle } from 'lucide-react';
import { useDocuments } from '../context/DocumentContext';
import { Document } from '../types';
import { useTheme } from '../context/ThemeContext';
import { v4 as uuidv4 } from 'uuid';

interface FileUploadState {
  file: File;
  progress: number;
  status: 'pending' | 'processing' | 'complete' | 'error';
  message?: string;
}

export default function DocumentUploader() {
  const [dragActive, setDragActive] = useState(false);
  const [fileUploads, setFileUploads] = useState<FileUploadState[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addDocument } = useDocuments();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Handle drag events
  const handleDrag = (e: React.DragEvent<HTMLFormElement | HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Handle dropped files
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Handle file input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  // Open file input dialog
  const openFileInput = () => {
    fileInputRef.current?.click();
  };

  // Process uploaded files
  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files);
    
    // Add each file to the upload state
    fileArray.forEach(file => {
      // Check if file type is supported (PDF, TXT, DOC)
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      let fileType: 'pdf' | 'txt' | 'doc' = 'txt';
      
      if (fileExtension === 'pdf') {
        fileType = 'pdf';
      } else if (fileExtension === 'doc' || fileExtension === 'docx') {
        fileType = 'doc';
      }
      
      setFileUploads(prev => [
        ...prev,
        {
          file,
          progress: 0,
          status: 'pending',
        }
      ]);
      
      // Process the file
      processFile(file, fileType);
    });
  };

  // Process file and extract content
  const processFile = (file: File, fileType: 'pdf' | 'txt' | 'doc') => {
    const reader = new FileReader();
    const fileIndex = fileUploads.length;
    
    // Update status to processing
    setFileUploads(prev => {
      const updated = [...prev];
      if (updated[fileIndex]) {
        updated[fileIndex] = {
          ...updated[fileIndex],
          status: 'processing',
          progress: 10
        };
      }
      return updated;
    });
    
    reader.onprogress = (event) => {
      if (event.loaded && event.total) {
        const percent = Math.round((event.loaded / event.total) * 90) + 10; // Start from 10%, max 100%
        setFileUploads(prev => {
          const updated = [...prev];
          if (updated[fileIndex]) {
            updated[fileIndex] = {
              ...updated[fileIndex],
              progress: percent
            };
          }
          return updated;
        });
      }
    };
    
    reader.onload = (e) => {
      try {
        // Create document object
        const content = e.target?.result as string || '';
        
        // In a real implementation, you would process the file based on its type
        // For now, we'll just treat everything as text
        
        const newDocument: Document = {
          id: uuidv4(),
          title: file.name,
          content,
          embedding: [], // Empty for now, would be calculated in a real implementation
          created_at: new Date().toISOString(),
          status: 'ready',
          type: fileType,
          size: file.size
        };
        
        // Add to context
        addDocument(newDocument);
        
        // Update upload status
        setFileUploads(prev => {
          const updated = [...prev];
          if (updated[fileIndex]) {
            updated[fileIndex] = {
              ...updated[fileIndex],
              status: 'complete',
              progress: 100
            };
          }
          return updated;
        });
        
      } catch (error) {
        console.error('Error processing file:', error);
        setFileUploads(prev => {
          const updated = [...prev];
          if (updated[fileIndex]) {
            updated[fileIndex] = {
              ...updated[fileIndex],
              status: 'error',
              message: 'Failed to process file',
              progress: 100
            };
          }
          return updated;
        });
      }
    };
    
    reader.onerror = () => {
      setFileUploads(prev => {
        const updated = [...prev];
        if (updated[fileIndex]) {
          updated[fileIndex] = {
            ...updated[fileIndex],
            status: 'error',
            message: 'Failed to read file',
            progress: 100
          };
        }
        return updated;
      });
    };
    
    // Read the file based on its type
    if (fileType === 'txt' || fileType === 'doc') {
      reader.readAsText(file);
    } else {
      // For PDFs, we'd need a PDF parser in a real implementation
      // For this demo, just treat as text
      reader.readAsText(file);
    }
  };
  
  // Remove file from upload list
  const removeFile = (index: number) => {
    setFileUploads(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={`w-full space-y-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
      {/* Drop zone */}
      <form
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
        className="w-full"
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.txt,.doc,.docx"
          multiple
          onChange={handleChange}
        />
        
        <div
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors duration-200 ${
            dragActive
              ? isDark ? 'border-blue-500 bg-blue-900/10' : 'border-blue-500 bg-blue-50'
              : isDark ? 'border-gray-700 hover:border-gray-600' : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={openFileInput}
        >
          <div className="space-y-3 cursor-pointer">
            <div className="flex justify-center">
              <FileUp className={`h-10 w-10 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
            </div>
            <p className="text-base font-medium">
              Drag and drop documents here or click to browse
            </p>
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              Supports PDF, TXT, DOC files
            </p>
          </div>
        </div>
      </form>
      
      {/* File upload list */}
      {fileUploads.length > 0 && (
        <div className={`mt-4 rounded-lg border ${
          isDark ? 'border-gray-800 bg-gray-800/50' : 'border-gray-200 bg-gray-50/50'
        }`}>
          <div className={`px-4 py-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <h3 className="font-medium">Uploads</h3>
          </div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {fileUploads.map((upload, index) => (
              <li key={index} className="px-4 py-3 flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <FileText className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {upload.file.name}
                  </p>
                  
                  <div className="flex items-center mt-1">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mr-2">
                      <div 
                        className={`h-1.5 rounded-full ${
                          upload.status === 'error' 
                            ? 'bg-red-500' 
                            : upload.status === 'complete' 
                              ? 'bg-green-500' 
                              : 'bg-blue-500'
                        }`} 
                        style={{ width: `${upload.progress}%` }}
                      />
                    </div>
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {upload.status === 'complete' 
                        ? 'Complete' 
                        : upload.status === 'error'
                          ? 'Error'
                          : `${upload.progress}%`
                      }
                    </span>
                  </div>
                  
                  {upload.message && (
                    <p className={`text-xs ${isDark ? 'text-red-400' : 'text-red-500'} mt-1`}>
                      {upload.message}
                    </p>
                  )}
                </div>
                
                <div className="flex-shrink-0">
                  {upload.status === 'complete' ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : upload.status === 'error' ? (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  ) : (
                    <button 
                      onClick={() => removeFile(index)}
                      className={`p-1 rounded-full ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 