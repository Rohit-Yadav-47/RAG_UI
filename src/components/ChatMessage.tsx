import React, { useState } from 'react';
import { Bot, User, FileText, Copy, Check, ThumbsUp, ThumbsDown, Share, MoreHorizontal, Link2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage as ChatMessageType } from '../types';
import { useTheme } from '../context/ThemeContext';

interface Props {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === 'user';
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  
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
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser 
          ? 'bg-blue-600 shadow-md shadow-blue-500/20' 
          : theme === 'dark' 
            ? 'bg-purple-700 shadow-md shadow-purple-500/20' 
            : 'bg-gray-700 shadow-sm'
      }`}>
        {isUser ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
      </div>
      
      <div className={`flex-1 space-y-2 ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`px-4 py-3 rounded-2xl shadow-sm ${
          isUser 
            ? 'bg-blue-600 text-white rounded-tr-none shadow-blue-500/10' 
            : theme === 'dark'
              ? 'bg-gray-800 text-gray-100 rounded-tl-none border border-gray-700'
              : 'bg-white text-gray-800 rounded-tl-none border border-gray-100 shadow-gray-200/50'
        }`}>
          <div className="prose max-w-none dark:prose-invert prose-p:my-1 prose-headings:mb-2 prose-headings:mt-4 prose-pre:bg-gray-800/70 dark:prose-pre:bg-black/50 prose-pre:border prose-pre:border-gray-700 prose-code:text-gray-200">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        </div>
        
        {message.timestamp && (
          <div className="flex items-center justify-between">
            <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
              {message.timestamp}
            </div>
            
            {!isUser && (
              <div className="flex space-x-2 items-center">
                <button 
                  onClick={copyToClipboard}
                  className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
                
                <button 
                  onClick={handleLike}
                  className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                    liked 
                      ? 'text-green-500' 
                      : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                </button>
                
                <button 
                  onClick={handleDislike}
                  className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                    disliked 
                      ? 'text-red-500' 
                      : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <ThumbsDown className="w-4 h-4" />
                </button>
                
                <button 
                  className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
                >
                  <Share className="w-4 h-4" />
                </button>
                
                <button 
                  className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
        
        {message.sources && message.sources.length > 0 && (
          <div className="mt-2 space-y-2">
            <p className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Sources</p>
            {message.sources.map((source, index) => (
              <div key={index} className={`flex items-start gap-2 text-sm rounded-lg p-2 ${
                theme === 'dark' 
                  ? 'bg-gray-800/50 border border-gray-700 text-gray-200' 
                  : 'bg-gray-50 border border-gray-100 text-gray-700'
              }`}>
                <Link2 className={`w-4 h-4 mt-0.5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                <div>
                  <div className="font-medium">{source.title}</div>
                  <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>{source.content}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}