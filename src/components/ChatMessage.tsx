import React, { useState } from 'react';
import { Bot, User, FileText, Copy, Check, ThumbsUp, ThumbsDown, Share, MoreHorizontal, Link2, ChevronDown, Code, Image, ExternalLink, Edit, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage as ChatMessageType } from '../types';
import { useTheme } from '../context/ThemeContext';

interface Props {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === 'user';
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [showCodeActions, setShowCodeActions] = useState(false);
  const [showActions, setShowActions] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };
  
  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  return (
    <div className={`group flex gap-4 py-6 animate-fade-in ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
        isUser 
          ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/30' 
          : 'bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/25 group-hover:shadow-xl group-hover:shadow-purple-500/30'
      }`}>
        {isUser ? (
          <User className="w-6 h-6 text-white" />
        ) : (
          <div className="relative">
            <Bot className="w-6 h-6 text-white" />
            <Sparkles className="w-3 h-3 text-white absolute -top-1 -right-1 animate-pulse" />
          </div>
        )}
      </div>
      
      <div className={`flex-1 space-y-3 ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Message header */}
        <div className={`flex items-center gap-2 ${isUser ? 'justify-end' : ''}`}>
          <span className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
            {isUser ? 'You' : 'AI Assistant'}
          </span>
          {!isUser && (
            <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              isDark ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-700'
            }`}>
              Powered by Groq
            </div>
          )}
          <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {message.timestamp || 'Just now'}
          </span>
        </div>

        {/* Message content */}
        <div className={`relative px-6 py-4 rounded-2xl transition-all duration-200 ${
          isUser 
            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tr-md shadow-lg hover:shadow-xl' 
            : isDark
              ? 'bg-gray-800/80 text-gray-100 rounded-tl-md border border-gray-700/50 shadow-lg hover:shadow-xl backdrop-blur-sm'
              : 'bg-white text-gray-800 rounded-tl-md border border-gray-200 shadow-lg hover:shadow-xl'
        }`}>
          {/* Gradient overlay for AI messages */}
          {!isUser && (
            <div className={`absolute inset-0 rounded-2xl rounded-tl-md ${
              isDark 
                ? 'bg-gradient-to-br from-purple-900/5 to-blue-900/5' 
                : 'bg-gradient-to-br from-purple-50/50 to-blue-50/50'
            } pointer-events-none`}></div>
          )}
          
          <div className="relative prose max-w-none dark:prose-invert prose-p:my-2 prose-headings:mb-3 prose-headings:mt-5 prose-pre:bg-gray-900/70 dark:prose-pre:bg-black/50 prose-pre:border prose-pre:border-gray-600 dark:prose-code:text-gray-200 prose-code:text-gray-700 prose-a:text-blue-400 dark:prose-a:text-blue-300 prose-blockquote:border-l-purple-500">
            <ReactMarkdown>
              {message.content}
            </ReactMarkdown>
          </div>

          {/* Code blocks enhancement */}
          {message.content.includes('```') && !isUser && (
            <div className={`mt-4 ${isDark ? 'text-gray-300' : 'text-gray-600'} text-xs`}>
              <button 
                className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                  isDark ? 'hover:bg-gray-700/50 bg-gray-800/30' : 'hover:bg-gray-100 bg-gray-50'
                }`}
                onClick={() => setShowCodeActions(!showCodeActions)}
              >
                <Code className="h-4 w-4 mr-2" />
                Code Actions
                <ChevronDown className={`h-4 w-4 ml-2 transition-transform duration-200 ${showCodeActions ? 'rotate-180' : ''}`} />
              </button>
              
              {showCodeActions && (
                <div className={`mt-3 space-y-2 pl-4 border-l-2 animate-slide-down ${
                  isDark ? 'border-purple-500/30' : 'border-purple-300'
                }`}>
                  <button className={`flex items-center text-sm transition-colors duration-200 ${
                    isDark ? 'hover:text-purple-400' : 'hover:text-purple-600'
                  }`}>
                    <Copy className="h-4 w-4 mr-2" /> Copy all code
                  </button>
                  <button className={`flex items-center text-sm transition-colors duration-200 ${
                    isDark ? 'hover:text-purple-400' : 'hover:text-purple-600'
                  }`}>
                    <Edit className="h-4 w-4 mr-2" /> Edit in playground
                  </button>
                  <button className={`flex items-center text-sm transition-colors duration-200 ${
                    isDark ? 'hover:text-purple-400' : 'hover:text-purple-600'
                  }`}>
                    <ExternalLink className="h-4 w-4 mr-2" /> Create Gist
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Sources */}
        {message.sources && message.sources.length > 0 && (
          <div className="mt-4 space-y-3 animate-slide-up">
            <div className={`flex items-center text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <div className={`p-1.5 rounded-lg mr-2 ${
                isDark ? 'bg-blue-900/30' : 'bg-blue-100'
              }`}>
                <Link2 className={`h-4 w-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              Sources Used
            </div>
            {message.sources.map((source, index) => (
              <div key={index} className={`flex items-start gap-3 rounded-xl p-4 transition-all duration-200 hover:scale-[1.02] ${
                isDark 
                  ? 'bg-gray-800/60 border border-gray-700/50 text-gray-200 hover:bg-gray-800/80' 
                  : 'bg-gray-50/80 border border-gray-200 text-gray-700 hover:bg-gray-100/80'
              }`}>
                <div className={`rounded-xl p-2 ${isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                  <FileText className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {source.title}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {source.content}
                  </div>
                </div>
                <button className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                  isDark ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-300' : 'hover:bg-gray-200 text-gray-500 hover:text-gray-600'
                }`}>
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
        
        {/* Message actions */}
        {!isUser && (
          <div className={`flex justify-end opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0`}>
            <div className={`flex space-x-1 items-center rounded-xl px-2 py-1.5 backdrop-blur-sm ${
              isDark ? 'bg-gray-800/80 border border-gray-700/50' : 'bg-white/80 border border-gray-200 shadow-lg'
            }`}>
              <button 
                onClick={copyToClipboard}
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                  isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100'
                }`}
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500 animate-bounce-subtle" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              
              <button 
                onClick={handleLike}
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                  liked 
                    ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                    : isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100'
                }`}
                title="Like"
              >
                <ThumbsUp className="w-4 h-4" />
              </button>
              
              <button 
                onClick={handleDislike}
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                  disliked 
                    ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                    : isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100'
                }`}
                title="Dislike"
              >
                <ThumbsDown className="w-4 h-4" />
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => setShowActions(!showActions)}
                  className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                    showActions 
                      ? isDark ? 'bg-gray-700/50' : 'bg-gray-100'
                      : isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100'
                  }`}
                  title="More actions"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
                
                {showActions && (
                  <div className={`absolute right-0 bottom-12 z-10 w-40 rounded-xl shadow-xl py-2 animate-scale-in ${
                    isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                  }`}>
                    <button className={`flex w-full items-center px-4 py-2 text-sm transition-colors duration-200 ${
                      isDark ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-gray-100 text-gray-700'
                    }`}>
                      <Edit className="w-4 h-4 mr-3" />
                      Edit response
                    </button>
                    <button className={`flex w-full items-center px-4 py-2 text-sm transition-colors duration-200 ${
                      isDark ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-gray-100 text-gray-700'
                    }`}>
                      <Share className="w-4 h-4 mr-3" />
                      Share response
                    </button>
                    <button className={`flex w-full items-center px-4 py-2 text-sm transition-colors duration-200 ${
                      isDark ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-gray-100 text-gray-700'
                    }`}>
                      <Image className="w-4 h-4 mr-3" />
                      Generate image
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}