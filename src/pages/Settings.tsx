import { useState } from 'react';
import { Save, Bell, Key, Database, Cpu, Shield, UserCog, Languages, Info, HelpCircle, RefreshCw, Download, Upload } from 'lucide-react';
import { Settings as SettingsType } from '../types';
import { useTheme } from '../context/ThemeContext';
import { AVAILABLE_MODELS } from '../lib/groq';

export default function Settings() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [settings, setSettings] = useState<SettingsType>({
    model: AVAILABLE_MODELS[0].id,
    temperature: 0.7,
    maxTokens: 2000,
    notifications: true,
    historyRetention: '30days',
    apiKey: '••••••••••••••••'
  });
  
  const [activeTab, setActiveTab] = useState('general');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newValue = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setSettings(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleSaveSettings = () => {
    // Save settings logic here
    console.log('Settings saved:', settings);
    
    // Show success message
    alert('Settings saved successfully!');
  };

  return (
    <div className={`flex-1 p-6 max-w-5xl mx-auto w-full ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Settings</h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Configure your RAG Assistant
          </p>
        </div>
        
        <button 
          onClick={handleSaveSettings}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Navigation */}
        <div className={`md:w-64 shrink-0 rounded-lg border ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } overflow-hidden`}>
          <nav className="p-2 h-full flex flex-col">
            <button 
              onClick={() => setActiveTab('general')} 
              className={`flex items-center px-3 py-2.5 rounded-lg text-left ${
                activeTab === 'general'
                  ? isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-700'
                  : isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <UserCog className="w-5 h-5 mr-3" />
              <span>General</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('model')} 
              className={`flex items-center px-3 py-2.5 rounded-lg text-left mt-1 ${
                activeTab === 'model'
                  ? isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-700'
                  : isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Cpu className="w-5 h-5 mr-3" />
              <span>Model Settings</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('api')} 
              className={`flex items-center px-3 py-2.5 rounded-lg text-left mt-1 ${
                activeTab === 'api'
                  ? isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-700'
                  : isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Key className="w-5 h-5 mr-3" />
              <span>API Keys</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('notifications')} 
              className={`flex items-center px-3 py-2.5 rounded-lg text-left mt-1 ${
                activeTab === 'notifications'
                  ? isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-700'
                  : isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Bell className="w-5 h-5 mr-3" />
              <span>Notifications</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('data')} 
              className={`flex items-center px-3 py-2.5 rounded-lg text-left mt-1 ${
                activeTab === 'data'
                  ? isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-700'
                  : isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Database className="w-5 h-5 mr-3" />
              <span>Data & Privacy</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('security')} 
              className={`flex items-center px-3 py-2.5 rounded-lg text-left mt-1 ${
                activeTab === 'security'
                  ? isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-700'
                  : isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Shield className="w-5 h-5 mr-3" />
              <span>Security</span>
            </button>
            
            <div className="flex-1"></div>
            
            <div className={`mt-6 p-3 rounded-lg text-sm ${
              isDark ? 'bg-gray-700/50 text-gray-400' : 'bg-gray-50 text-gray-600'
            }`}>
              <div className="flex items-center mb-2">
                <Info className="w-4 h-4 mr-2" />
                <span className="font-medium">Need Help?</span>
              </div>
              <p className="mb-2">Check out our documentation or contact support for assistance.</p>
              <button className={`w-full py-1.5 rounded ${
                isDark ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}>
                <HelpCircle className="w-4 h-4 inline mr-1" />
                <span>Support Center</span>
              </button>
            </div>
          </nav>
        </div>
        
        {/* Settings Content */}
        <div className={`flex-1 rounded-lg border ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } p-6`}>
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className={`text-lg font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>General Settings</h2>
              
              <div className={`space-y-4 pb-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    History Retention
                  </label>
                  <select
                    name="historyRetention"
                    value={settings.historyRetention}
                    onChange={handleChange}
                    className={`w-full max-w-xs px-3 py-2 rounded-md ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                        : 'border border-gray-300 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2`}
                  >
                    <option value="7days">7 days</option>
                    <option value="30days">30 days</option>
                    <option value="90days">90 days</option>
                    <option value="1year">1 year</option>
                    <option value="forever">Forever</option>
                  </select>
                  <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    How long to keep your chat history
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Notifications
                    </label>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Receive notifications about updates
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="notifications"
                      checked={settings.notifications}
                      onChange={handleChange}
                      className="sr-only peer" 
                    />
                    <div className={`w-11 h-6 rounded-full peer ${
                      isDark ? 'bg-gray-700' : 'bg-gray-200'
                    } peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}></div>
                  </label>
                </div>
              </div>
              
              <div className="pt-2 flex flex-col sm:flex-row sm:justify-between gap-4">
                <button className={`flex items-center justify-center px-4 py-2 rounded-lg ${
                  isDark 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </button>
                
                <button className={`flex items-center justify-center px-4 py-2 rounded-lg ${
                  isDark 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset Settings
                </button>
              </div>
            </div>
          )}

          {/* Model Settings */}
          {activeTab === 'model' && (
            <div className="space-y-6">
              <h2 className={`text-lg font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>Model Settings</h2>
              
              <div className="space-y-5">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    AI Model
                  </label>
                  <select
                    name="model"
                    value={settings.model}
                    onChange={handleChange}
                    className={`w-full max-w-xs px-3 py-2 rounded-md ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                        : 'border border-gray-300 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2`}
                  >
                    {AVAILABLE_MODELS.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name}
                      </option>
                    ))}
                  </select>
                  <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Select the AI model to use for your assistant
                  </p>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Temperature ({settings.temperature})
                  </label>
                  <div className="flex items-center gap-4 max-w-xs">
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Precise</span>
                    <input
                      type="range"
                      name="temperature"
                      min="0"
                      max="1"
                      step="0.1"
                      value={settings.temperature}
                      onChange={handleChange}
                      className={`w-full ${isDark ? '' : ''}`}
                    />
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Creative</span>
                  </div>
                  <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Controls the randomness of the AI's responses
                  </p>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Max Tokens
                  </label>
                  <input
                    type="number"
                    name="maxTokens"
                    value={settings.maxTokens}
                    onChange={handleChange}
                    min="100"
                    max="4000"
                    step="100"
                    className={`w-full max-w-xs px-3 py-2 rounded-md ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                        : 'border border-gray-300 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2`}
                  />
                  <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Maximum number of tokens the AI can generate per response
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* API Settings */}
          {activeTab === 'api' && (
            <div className="space-y-6">
              <h2 className={`text-lg font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>API Settings</h2>
              
              <div className="space-y-5">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    API Key
                  </label>
                  <div className="flex max-w-md">
                    <input
                      type="password"
                      name="apiKey"
                      value={settings.apiKey}
                      onChange={handleChange}
                      className={`flex-1 px-3 py-2 rounded-l-md ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                          : 'border border-gray-300 focus:ring-blue-500'
                      } focus:outline-none focus:ring-2`}
                    />
                    <button className={`px-4 py-2 rounded-r-md ${
                      isDark ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}>
                      Show
                    </button>
                  </div>
                  <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Your Groq API key for authentication
                  </p>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-blue-50'} mt-6`}>
                <div className="flex items-start">
                  <Info className={`w-5 h-5 mr-3 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                  <div>
                    <h3 className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      About API Keys
                    </h3>
                    <p className={`text-sm mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Your API key is stored securely and only used for authenticating with the Groq API. 
                      Never share your API key with others.
                    </p>
                    <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer" className="text-sm text-blue-500 hover:underline mt-2 inline-block">
                      Get an API key from Groq
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className={`text-lg font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>Notification Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      Email Notifications
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Receive email notifications about important updates
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={true} className="sr-only peer" />
                    <div className={`w-11 h-6 rounded-full peer ${
                      isDark ? 'bg-gray-700' : 'bg-gray-200'
                    } peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      Browser Notifications
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Allow browser notifications for chat responses
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={false} className="sr-only peer" />
                    <div className={`w-11 h-6 rounded-full peer ${
                      isDark ? 'bg-gray-700' : 'bg-gray-200'
                    } peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      Document Processing Alerts
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Get notified when document processing is complete
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={true} className="sr-only peer" />
                    <div className={`w-11 h-6 rounded-full peer ${
                      isDark ? 'bg-gray-700' : 'bg-gray-200'
                    } peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}></div>
                  </label>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'data' && (
            <div className="space-y-6">
              <h2 className={`text-lg font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>Data & Privacy</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className={`text-base font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                    Data Collection
                  </h3>
                  <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Control how your data is collected and used within the application.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="usage-data" 
                        checked={true} 
                        className={`w-4 h-4 mr-2 ${
                          isDark ? 'text-blue-500 bg-gray-700' : 'text-blue-600 bg-gray-100'
                        }`} 
                      />
                      <label htmlFor="usage-data" className={isDark ? 'text-gray-200' : 'text-gray-700'}>
                        Share anonymous usage data to improve the service
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="chat-history" 
                        checked={true} 
                        className={`w-4 h-4 mr-2 ${
                          isDark ? 'text-blue-500 bg-gray-700' : 'text-blue-600 bg-gray-100'
                        }`} 
                      />
                      <label htmlFor="chat-history" className={isDark ? 'text-gray-200' : 'text-gray-700'}>
                        Save chat history for personalized assistance
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg ${isDark ? 'bg-red-900/20 border border-red-900/30' : 'bg-red-50 border border-red-100'}`}>
                  <h3 className={`text-base font-medium ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                    Danger Zone
                  </h3>
                  <p className={`text-sm mt-1 mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    These actions are permanent and cannot be undone.
                  </p>
                  
                  <div className="space-y-3">
                    <button className={`px-4 py-2 rounded ${
                      isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}>
                      Clear All Chat History
                    </button>
                    
                    <button className={`px-4 py-2 rounded ${
                      isDark ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' : 'bg-red-100 text-red-600 hover:bg-red-200'
                    }`}>
                      Delete Account Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className={`text-lg font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>Security Settings</h2>
              
              <div>
                <h3 className={`text-base font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  Access Control
                </h3>
                
                <div className={`mb-4 p-4 rounded-lg ${
                  isDark ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        Two-Factor Authentication
                      </h4>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <button className={`px-3 py-1 rounded text-sm ${
                      isDark ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}>
                      Enable
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        Password
                      </h4>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Last changed 30 days ago
                      </p>
                    </div>
                    <button className={`px-3 py-1 rounded text-sm ${
                      isDark ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}>
                      Change
                    </button>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    Active Sessions
                  </h4>
                  
                  <div className={`p-3 rounded mb-2 ${
                    isDark ? 'bg-green-900/20 border border-green-900/30' : 'bg-green-50 border border-green-100'
                  }`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                          Current Session (Windows)
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Started Apr 11, 2025 · Chrome Browser
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded ${
                        isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
                      }`}>
                        Active Now
                      </span>
                    </div>
                  </div>
                  
                  <div className={`p-3 rounded ${
                    isDark ? 'bg-gray-800' : 'bg-white border border-gray-100'
                  }`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                          Mobile Session (iOS)
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Started Apr 10, 2025 · Mobile App
                        </p>
                      </div>
                      <button className={`px-2 py-1 text-xs rounded ${
                        isDark ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' : 'bg-red-50 text-red-600 hover:bg-red-100'
                      }`}>
                        Revoke
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}