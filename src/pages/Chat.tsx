import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Paperclip, Mic, Smile, Trash2, Settings, Bot, Search, MessageSquare, Code, Image, HelpCircle, User, Home, FileText, History, LogOut, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ChatMessage from '../components/ChatMessage';
import { ChatMessage as ChatMessageType } from '../types';
import { format } from 'date-fns';
import { generateResponse, AVAILABLE_MODELS, ChatCompletionOptions } from '../lib/groq';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const INITIAL_MESSAGE: ChatMessageType = {
  role: "assistant",
  content: "Hello! I'm your AI assistant powered by Groq. I can help you with various tasks. How can I assist you today?",
  timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
};

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessageType[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [currentMode, setCurrentMode] = useState<'chat' | 'document' | 'code' | 'image'>('chat');
  const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[0].id);
  const [showModelSelector, setShowModelSelector] = useState(false);
  const modelSelectorRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Close model selector when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modelSelectorRef.current && !modelSelectorRef.current.contains(event.target as Node)) {
        setShowModelSelector(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessageType = {
      role: 'user',
      content: input,
      timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setShowSuggestions(false);

    try {
      // Convert messages to format expected by Groq API
      const messageHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      messageHistory.push({ role: 'user', content: input });

      // Pass the selected model to the generateResponse function
      const options: ChatCompletionOptions = {
        model: selectedModel,
        temperature: 0.7,
        maxTokens: 2048,
      };
      
      const response = await generateResponse(messageHistory, options);

      const aiMessage: ChatMessageType = {
        role: 'assistant',
        content: response,
        timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: ChatMessageType = {
        role: 'assistant',
        content: 'I apologize, but I encountered an error while processing your request. Please try again.',
        timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);
  };

  const handleModeChange = (mode: 'chat' | 'document' | 'code' | 'image') => {
    setCurrentMode(mode);
  };
  
  const clearConversation = () => {
    setMessages([INITIAL_MESSAGE]);
    setShowSuggestions(true);
  };

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    setShowModelSelector(false);
  };

  const suggestions = [
    "Explain how RAG works in simple terms",
    "Summarize this document for me",
    "Generate code for a Python web scraper",
    "What are best practices for document embedding?"
  ];

  // Find the currently selected model name
  const selectedModelName = AVAILABLE_MODELS.find(model => model.id === selectedModel)?.name || 'Model';

  return (
    <div className={`flex flex-col h-full ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Combined header with mode tabs */}
      <div className={`border-b ${isDark ? 'border-gray-800' : 'border-gray-200'} px-4 py-2`}>
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center space-x-2">
            <Bot className={`h-6 w-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            <h1 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>RAG Assistant</h1>
          </div>
          
          <div className={`flex rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-100'} p-1`}>
            <button
              onClick={() => handleModeChange('chat')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                currentMode === 'chat' 
                  ? isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 shadow-sm' 
                  : isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              <div className="flex items-center space-x-1">
                <MessageSquare className="w-4 h-4" />
                <span>Chat</span>
              </div>
            </button>
            
            <button
              onClick={() => handleModeChange('document')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                currentMode === 'document' 
                  ? isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 shadow-sm' 
                  : isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              <div className="flex items-center space-x-1">
                <FileText className="w-4 h-4" />
                <span>Document</span>
              </div>
            </button>
            
            <button
              onClick={() => handleModeChange('code')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                currentMode === 'code' 
                  ? isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 shadow-sm' 
                  : isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              <div className="flex items-center space-x-1">
                <Code className="w-4 h-4" />
                <span>Code</span>
              </div>
            </button>
            
            <button
              onClick={() => handleModeChange('image')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                currentMode === 'image' 
                  ? isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 shadow-sm' 
                  : isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              <div className="flex items-center space-x-1">
                <Image className="w-4 h-4" />
                <span>Image</span>
              </div>
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Model selector */}
            <div className="relative" ref={modelSelectorRef}>
              <button 
                onClick={() => setShowModelSelector(!showModelSelector)}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm ${
                  isDark 
                    ? 'bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800' 
                    : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm'
                }`}
              >
                <span>{selectedModelName}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showModelSelector && (
                <div className={`absolute z-10 right-0 mt-1 w-48 rounded-md shadow-lg ${
                  isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'
                }`}>
                  <div className="py-1">
                    {AVAILABLE_MODELS.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => handleModelChange(model.id)}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          model.id === selectedModel
                            ? isDark 
                              ? 'bg-gray-800 text-white' 
                              : 'bg-blue-50 text-blue-700'
                            : isDark
                              ? 'text-gray-300 hover:bg-gray-800'
                              : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {model.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <button 
              onClick={clearConversation} 
              className={`p-2 rounded-md ${isDark ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
              title="Clear conversation"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
 
        
        {/* Main chat area */}
        <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full p-4 overflow-hidden">
          {messages.length === 1 && (
            <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <div className={`mx-auto w-16 h-16 rounded-full ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'} flex items-center justify-center mb-4`}>
                <Bot className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <h2 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                How can I help you today?
              </h2>
              <p className={`max-w-md mx-auto mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Ask me anything about your documents, code, or any other questions you might have.
              </p>
              
              {/* Show selected model info */}
              <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-4`}>
                Currently using <span className={isDark ? 'text-blue-400' : 'text-blue-600'}>{selectedModelName}</span> model
              </div>
            </div>
          )}
          
          {/* Suggestions */}
          {showSuggestions && messages.length === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`p-3 text-sm text-left rounded-lg transition-colors ${
                    isDark
                      ? 'bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700'
                      : 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 shadow-sm'
                  }`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          
          {/* Messages container with scrolling */}
          <div className={`flex-1 space-y-6 mb-4 overflow-y-auto pr-2 ${messages.length > 1 ? '' : 'hidden'}`}>
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-center justify-center py-6">
                <div className={`p-3 rounded-full ${isDark ? 'bg-gray-800' : 'bg-blue-50'}`}>
                  <Loader2 className={`w-6 h-6 animate-spin ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Enhanced input form */}
          <form onSubmit={handleSubmit} className={`flex gap-2 items-end rounded-lg border p-2 shadow-sm ${
            isDark 
              ? 'bg-gray-900 border-gray-800' 
              : 'bg-white border-gray-200'
          }`}>
            <button 
              type="button" 
              className={`p-2 rounded-full ${isDark ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-800' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
              title="Attach file"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Message ${currentMode === 'chat' ? 'RAG Assistant' : currentMode === 'document' ? 'about your documents' : currentMode === 'code' ? 'about code' : 'to generate images'}`}
                className={`w-full px-4 py-2 max-h-32 rounded-lg focus:outline-none focus:ring-1 resize-none min-h-[40px] ${
                  isDark
                    ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-500 placeholder:text-gray-500'
                    : 'bg-white border-0 text-gray-900 focus:ring-blue-500 placeholder:text-gray-400'
                }`}
                disabled={isLoading}
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
            </div>
            
            <button 
              type="button" 
              className={`p-2 rounded-full ${isDark ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-800' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
              title="Voice input"
            >
              <Mic className="w-5 h-5" />
            </button>
            
            <button 
              type="button" 
              className={`p-2 rounded-full ${isDark ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-800' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
              title="Emoji"
            >
              <Smile className="w-5 h-5" />
            </button>
            
            <button
              type="submit"
              className={`p-2 rounded-full ${
                !input.trim() || isLoading
                  ? isDark ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isDark ? 'focus:ring-offset-gray-900' : ''}`}
              disabled={!input.trim() || isLoading}
              title="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          
          <div className={`mt-2 text-xs text-center ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>
            RAG Assistant may produce inaccurate information about people, places, or facts
          </div>
        </div>
      </div>
    </div>
  );
}