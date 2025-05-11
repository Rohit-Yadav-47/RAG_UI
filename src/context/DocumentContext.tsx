import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Document } from '../types';

interface DocumentContextType {
  documents: Document[];
  addDocument: (doc: Document) => void;
  removeDocument: (id: string) => void;
  clearDocuments: () => void;
  getDocumentById: (id: string) => Document | undefined;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export function useDocuments() {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocuments must be used within a DocumentProvider');
  }
  return context;
}

interface DocumentProviderProps {
  children: ReactNode;
}

export function DocumentProvider({ children }: DocumentProviderProps) {
  // Initialize from localStorage if available
  const [documents, setDocuments] = useState<Document[]>(() => {
    const savedDocs = localStorage.getItem('ragui_documents');
    return savedDocs ? JSON.parse(savedDocs) : [];
  });

  // Save to localStorage when documents change
  useEffect(() => {
    localStorage.setItem('ragui_documents', JSON.stringify(documents));
  }, [documents]);

  const addDocument = (doc: Document) => {
    setDocuments(prev => [...prev, doc]);
  };

  const removeDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const clearDocuments = () => {
    setDocuments([]);
  };

  const getDocumentById = (id: string) => {
    return documents.find(doc => doc.id === id);
  };

  const value = {
    documents,
    addDocument,
    removeDocument,
    clearDocuments,
    getDocumentById
  };

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
} 