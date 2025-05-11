import React, { useState } from 'react';
import { Bot, User, FileText, Copy, Check, ThumbsUp, ThumbsDown, Share, MoreHorizontal, Link2, ChevronDown, Code, Image, ExternalLink, Edit } from 'lucide-react';
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
    <div className={`group flex gap-3 py-6 ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser 
          ? isDark ? 'bg-blue-600 shadow-md shadow-blue-900/20' : 'bg-blue-600 shadow-md shadow-blue-500/20' 
          : isDark ? 'bg-purple-700 shadow-md shadow-purple-900/20' : 'bg-purple-700 shadow-md shadow-purple-500/20'
      }`}>
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>
      
      <div className={`flex-1 space-y-2 ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Message header */}
        <div className={`flex items-center mb-1 ${isUser ? 'justify-end' : ''}`}>
          <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {isUser ? 'You' : 'AI Assistant'}
          </span>
          <span className={`mx-2 text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {message.timestamp || 'Just now'}
          </span>
        </div>

        {/* Message content */}
        <div className={`px-5 py-4 rounded-2xl shadow-sm ${
          isUser 
            ? isDark 
              ? 'bg-blue-600/90 text-white rounded-tr-none shadow-blue-900/10' 
              : 'bg-blue-600 text-white rounded-tr-none shadow-blue-500/10' 
            : isDark
              ? 'bg-gray-800 text-gray-100 rounded-tl-none border border-gray-700'
              : 'bg-white text-gray-800 rounded-tl-none border border-gray-100 shadow-gray-200/50'
        }`}>
          <div className="prose max-w-none dark:prose-invert prose-p:my-1 prose-headings:mb-2 prose-headings:mt-4 prose-pre:bg-gray-800/70 dark:prose-pre:bg-black/50 prose-pre:border prose-pre:border-gray-700 dark:prose-code:text-gray-200 prose-code:text-gray-700 prose-a:text-blue-500 dark:prose-a:text-blue-400">
            <ReactMarkdown>
              {message.content}
            </ReactMarkdown>
          </div>

          {/* Code blocks - enhanced with copy button and language tag */}
          {message.content.includes('```') && !isUser && (
            <div className={`mt-4 ${isDark ? 'text-gray-300' : 'text-gray-600'} text-xs`}>
              <button 
                className={`flex items-center px-2 py-1 rounded ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                onClick={() => setShowCodeActions(!showCodeActions)}
              >
                <Code className="h-3.5 w-3.5 mr-1" />
                Code Snippets 
                <ChevronDown className={`h-3.5 w-3.5 ml-1 transition-transform ${showCodeActions ? 'rotate-180' : ''}`} />
              </button>
              
              {showCodeActions && (
                <div className={`mt-2 space-y-1 pl-3 border-l-2 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <button className="flex items-center hover:underline">
                    <Copy className="h-3.5 w-3.5 mr-1" /> Copy all code snippets
                  </button>
                  <button className="flex items-center hover:underline">
                    <Edit className="h-3.5 w-3.5 mr-1" /> Edit in playground
                  </button>
                  <button className="flex items-center hover:underline">
                    <ExternalLink className="h-3.5 w-3.5 mr-1" /> Create Gist
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Sources */}
        {message.sources && message.sources.length > 0 && (
          <div className="mt-3 space-y-2">
            <div className={`flex items-center text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <Link2 className="h-3.5 w-3.5 mr-1.5" />
              Sources
            </div>
            {message.sources.map((source, index) => (
              <div key={index} className={`flex items-start gap-2 rounded-lg p-3 text-sm ${
                isDark 
                  ? 'bg-gray-800/50 border border-gray-700 text-gray-200' 
                  : 'bg-gray-50 border border-gray-100 text-gray-700'
              }`}>
                <div className={`rounded-full p-1.5 ${isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                  <FileText className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1">
                  <div className={`font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {source.title}
                  </div>
                  <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {source.content}
                  </div>
                </div>
                <button className={`p-1 rounded ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-500'}`}>
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
        
        {/* Message actions */}
        {!isUser && (
          <div className={`flex justify-end ${isDark ? 'opacity-70 group-hover:opacity-100' : 'opacity-60 group-hover:opacity-100'} transition-opacity duration-200`}>
            <div className={`flex space-x-1 items-center ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'} px-1 py-0.5 rounded-lg`}>
              <button 
                onClick={copyToClipboard}
                className={`p-1.5 rounded-md ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
                title="Copy to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              
              <button 
                onClick={handleLike}
                className={`p-1.5 rounded-md ${
                  liked 
                    ? isDark ? 'bg-gray-700 text-green-500' : 'bg-gray-100 text-green-600'
                    : isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                } transition-colors`}
                title="Like"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>
              
              <button 
                onClick={handleDislike}
                className={`p-1.5 rounded-md ${
                  disliked 
                    ? isDark ? 'bg-gray-700 text-red-500' : 'bg-gray-100 text-red-600'
                    : isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                } transition-colors`}
                title="Dislike"
              >
                <ThumbsDown className="w-3.5 h-3.5" />
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => setShowActions(!showActions)}
                  className={`p-1.5 rounded-md ${
                    showActions 
                      ? isDark ? 'bg-gray-700' : 'bg-gray-100'
                      : isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  } transition-colors`}
                  title="More actions"
                >
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
                
                {showActions && (
                  <div className={`absolute right-0 bottom-8 z-10 w-36 rounded-md shadow-lg py-1 ${
                    isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                  }`}>
                    <button className={`flex w-full items-center px-3 py-2 text-xs ${
                      isDark ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-gray-100 text-gray-700'
                    }`}>
                      <Edit className="w-3.5 h-3.5 mr-2" />
                      Edit response
                    </button>
                    <button className={`flex w-full items-center px-3 py-2 text-xs ${
                      isDark ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-gray-100 text-gray-700'
                    }`}>
                      <Share className="w-3.5 h-3.5 mr-2" />
                      Share response
                    </button>
                    <button className={`flex w-full items-center px-3 py-2 text-xs ${
                      isDark ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-gray-100 text-gray-700'
                    }`}>
                      <Image className="w-3.5 h-3.5 mr-2" />
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