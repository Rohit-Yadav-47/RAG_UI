import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Chat from './pages/Chat';
import Documents from './pages/Documents';
import Settings from './pages/Settings';
import History from './pages/History';
import Login from './pages/Login';
import Home from './pages/Home';
import KnowledgeBase from './pages/KnowledgeBase';
import Embeddings from './pages/Embeddings';
import Analytics from './pages/Analytics';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { DocumentProvider } from './context/DocumentContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DocumentProvider>
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              
              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="chat" element={<Chat />} />
                  <Route path="documents" element={<Documents />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="history" element={<History />} />
                  <Route path="knowledge-base" element={<KnowledgeBase />} />
                  <Route path="embeddings" element={<Embeddings />} />
                  <Route path="analytics" element={<Analytics />} />
                </Route>
              </Route>
              
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </DocumentProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;