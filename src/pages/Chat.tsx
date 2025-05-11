import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Paperclip, Mic, Smile, Trash2, Settings, Bot, Search, MessageSquare, Code, Image, HelpCircle, User, Home, FileText, History, LogOut, ChevronDown, MoreHorizontal, PlusCircle, Pin, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ChatMessage from '../components/ChatMessage';
import { ChatMessage as ChatMessageType } from '../types';
import { format } from 'date-fns';
import { generateResponse, generateResponseWithContext, AVAILABLE_MODELS, ChatCompletionOptions } from '../lib/groq';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useDocuments } from '../context/DocumentContext';

const INITIAL_MESSAGE: ChatMessageType = {
  role: "assistant",
  content: "Hello! I'm your AI assistant powered by Groq. I can help you with various tasks. How can I assist you today?",
  timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
};

// Sample conversations
const SAMPLE_CONVERSATIONS = [
  {
    id: 1,
    title: "RAG Implementation",
    date: "2 hours ago",
    preview: "Explaining how to implement a retrieval augmented generation system..."
  },
  {
    id: 2,
    title: "Vector Database Comparison",
    date: "Yesterday",
    preview: "Comparing different vector databases for document retrieval..."
  },
  {
    id: 3,
    title: "PDF Processing Pipeline",
    date: "2 days ago",
    preview: "Building a PDF processing pipeline with OCR and chunking..."
  }
];

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessageType[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [currentMode, setCurrentMode] = useState<'chat' | 'document' | 'code' | 'image'>('chat');
  const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[0].id);
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [showConversationList, setShowConversationList] = useState(false);
  const [useDocumentContext, setUseDocumentContext] = useState(true);
  const modelSelectorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const { documents } = useDocuments();
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

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
      
      let response;
      
      if (useDocumentContext && documents.length > 0) {
        // Use documents as context if available and enabled
        response = await generateResponseWithContext(messageHistory, documents, options);
      } else {
        // Otherwise use normal response generation
        response = await generateResponse(messageHistory, options);
      }

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
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    if (inputRef.current) {
      inputRef.current.focus();
    }
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
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
    <div className="flex h-full">
      {/* Conversations sidebar */}
      <div className={`w-72 border-r flex-shrink-0 flex flex-col transition-all duration-300 ${
        showConversationList 
          ? 'block' 
          : 'hidden md:flex'
      } ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className={`h-16 flex items-center justify-between px-4 border-b ${
          isDark ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <h2 className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>Conversations</h2>
          <button className={`p-1.5 rounded-md ${
            isDark ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
          }`}>
            <Search className="h-4 w-4" />
          </button>
        </div>
        
        <div className="flex-1 overflow-auto">
          {/* New Chat button */}
          <div className="p-3">
            <button onClick={clearConversation} className={`w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg font-medium ${
              isDark 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}>
              <PlusCircle className="h-4 w-4" />
              <span>New Chat</span>
            </button>
          </div>
          
          {/* Conversation list */}
          <div className="px-2 space-y-1">
            {SAMPLE_CONVERSATIONS.map((convo) => (
              <button 
                key={convo.id}
                className={`w-full text-left px-3 py-2 rounded-lg ${
                  convo.id === 1 
                    ? isDark ? 'bg-gray-800 text-gray-100' : 'bg-blue-50 text-gray-800' 
                    : isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium truncate">{convo.title}</span>
                  <button className={`p-1 rounded-md opacity-0 group-hover:opacity-100 ${
                    isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-500'
                  }`}>
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className={`text-xs truncate mt-1 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>{convo.preview}</p>
                <p className={`text-xs mt-1 ${
                  isDark ? 'text-gray-500' : 'text-gray-400'
                }`}>{convo.date}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main chat area */}
      <div className={`flex-1 flex flex-col h-full ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Chat header */}
        <div className={`border-b ${isDark ? 'border-gray-800' : 'border-gray-200'} px-4 py-2`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => setShowConversationList(!showConversationList)}
                className={`md:hidden mr-2 p-1.5 rounded-md ${
                  isDark ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <MessageSquare className="h-5 w-5" />
              </button>
              
              <div className={`flex rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'} p-1`}>
                <button
                  onClick={() => handleModeChange('chat')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                    currentMode === 'chat' 
                      ? isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-800 shadow-sm' 
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
                      ? isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-800 shadow-sm' 
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
                      ? isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-800 shadow-sm' 
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
                      ? isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-800 shadow-sm' 
                      : isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    <Image className="w-4 h-4" />
                    <span>Image</span>
                  </div>
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Document context toggle */}
              <div className="flex items-center mr-2">
                <label className={`flex items-center cursor-pointer ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <input
                    type="checkbox"
                    checked={useDocumentContext}
                    onChange={() => setUseDocumentContext(!useDocumentContext)}
                    className={`sr-only peer`}
                  />
                  <div className={`relative w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer 
                    ${isDark ? 'dark:bg-gray-700 peer-checked:dark:bg-blue-600' : 'peer-checked:bg-blue-600'}
                    transition-colors after:absolute after:top-[2px] after:left-[2px] 
                    after:bg-white after:rounded-full after:h-4 after:w-4 
                    after:transition-all peer-checked:after:translate-x-5`}>
                  </div>
                  <span className="ml-2 text-sm font-medium">Use Documents</span>
                </label>
              </div>
              
              <div ref={modelSelectorRef} className="relative">
                <button 
                  onClick={() => setShowModelSelector(!showModelSelector)}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm ${
                    isDark 
                      ? 'bg-gray-800 text-white hover:bg-gray-700' 
                      : 'bg-white text-gray-800 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  <span>{selectedModelName}</span>
                  <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                </button>
                
                {showModelSelector && (
                  <div className={`absolute right-0 mt-1 w-48 rounded-md shadow-lg z-10 ${
                    isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                  }`}>
                    <div className={`py-1 ${isDark ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
                      <div className={`px-3 py-2 text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Select Model
                      </div>
                    </div>
                    <div className="py-1">
                      {AVAILABLE_MODELS.map(model => (
                        <button
                          key={model.id}
                          onClick={() => handleModelChange(model.id)}
                          className={`flex items-center w-full text-left px-3 py-2 text-sm ${
                            selectedModel === model.id
                              ? isDark ? 'bg-gray-700 text-white' : 'bg-blue-50 text-blue-700'
                              : isDark ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {selectedModel === model.id && (
                            <span className="mr-2 text-blue-500">✓</span>
                          )}
                          {model.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <button onClick={clearConversation} className={`p-1.5 rounded-md ${
                isDark ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
              }`} title="Clear chat">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          
          {isLoading && (
            <div className={`flex justify-center py-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Document context info */}
        {useDocumentContext && (
          <div className={`px-4 ${documents.length === 0 ? 'pb-0' : 'pb-2'}`}>
            <div className={`rounded-lg p-2 text-sm ${
              isDark ? 'bg-blue-900/20 text-blue-300 border border-blue-900/30' : 'bg-blue-50 text-blue-700 border border-blue-100'
            } ${documents.length === 0 ? 'border-dashed' : ''}`}>
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                {documents.length === 0 ? (
                  <span>No documents available. <button 
                    onClick={() => navigate('/documents')}
                    className="underline font-medium"
                  >Upload documents</button> to use as context.</span>
                ) : (
                  <span>Using <span className="font-medium">{documents.length}</span> document{documents.length !== 1 ? 's' : ''} as context.</span>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Suggestions */}
        {showSuggestions && messages.length <= 2 && (
          <div className="px-4 pb-4">
            <div className={`rounded-xl p-4 ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'
            }`}>
              <h3 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                Try asking
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`text-left p-3 rounded-lg text-sm transition-colors ${
                      isDark 
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Input area */}
        <div className="p-4">
          <form onSubmit={handleSubmit} className="relative">
            <div className={`flex flex-col rounded-xl shadow-sm ${
              isDark 
                ? 'bg-gray-800 border border-gray-700' 
                : 'bg-white border border-gray-200'
            }`}>
              <div className="relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  rows={1}
                  className={`w-full px-4 pt-3 pb-2 rounded-t-xl resize-none overflow-hidden focus:outline-none focus:ring-0 ${
                    isDark 
                      ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-700' 
                      : 'bg-white text-gray-900 placeholder-gray-400 border-gray-200'
                  }`}
                  style={{ maxHeight: '200px' }}
                />
              </div>
              
              <div className={`flex items-center justify-between px-2 py-2 ${
                isDark ? 'border-t border-gray-700' : 'border-t border-gray-200'
              }`}>
                <div className="flex items-center space-x-1">
                  <button 
                    type="button" 
                    className={`p-1.5 rounded-md ${
                      isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                    }`}
                  >
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <button 
                    type="button" 
                    className={`p-1.5 rounded-md ${
                      isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                    }`}
                  >
                    <Mic className="h-5 w-5" />
                  </button>
                  <button 
                    type="button" 
                    className={`p-1.5 rounded-md ${
                      isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                    }`}
                  >
                    <Smile className="h-5 w-5" />
                  </button>
                </div>
                
                <div>
                  <button 
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className={`flex items-center justify-center px-4 py-2 rounded-lg ${
                      !input.trim() || isLoading
                        ? isDark ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : isDark ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <div className="flex items-center">
                        <Send className="h-4 w-4 mr-1.5" />
                        <span>Send</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            <div className={`mt-2 text-xs text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              The AI may produce inaccurate information. 
              <a href="#" className={`ml-1 ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
                Learn about our data usage policy
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}