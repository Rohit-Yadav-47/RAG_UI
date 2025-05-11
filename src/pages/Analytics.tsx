import { useState, useEffect } from 'react';
import { PieChart, Calendar, ArrowUp, ArrowDown, Clock, Users, MessageSquare, FileText, ChevronDown, BarChart2, Download, Filter } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title } from 'chart.js';
import { Pie, Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title);

type TimeRange = '24h' | '7d' | '30d' | '90d' | 'custom';

export default function Analytics() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const [showFilters, setShowFilters] = useState(false);
  
  // Generate random data for charts
  const [chartData, setChartData] = useState({
    pieData: {},
    lineData: {},
    barData: {}
  });

  useEffect(() => {
    // Generate random data when timeRange changes
    generateRandomChartData();
  }, [timeRange]);

  const generateRandomChartData = () => {
    // Pie chart data
    const pieData = {
      labels: ['Successful Queries', 'Failed Queries', 'Timeout Queries', 'Cached Responses'],
      datasets: [
        {
          data: [Math.floor(Math.random() * 100) + 50, Math.floor(Math.random() * 30) + 10, Math.floor(Math.random() * 20) + 5, Math.floor(Math.random() * 40) + 20],
          backgroundColor: [
            'rgba(75, 192, 192, 0.8)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(255, 205, 86, 0.8)',
            'rgba(54, 162, 235, 0.8)'
          ],
          borderColor: isDark ? 'rgba(32, 32, 36, 0.8)' : 'white',
          borderWidth: 1,
        },
      ],
    };

    // Line chart data - Response time distribution
    const labels = ['5ms', '10ms', '50ms', '100ms', '200ms', '500ms', '1000ms+'];
    const lineData = {
      labels,
      datasets: [
        {
          label: 'Current Period',
          data: labels.map(() => Math.floor(Math.random() * 1000) + 100),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          tension: 0.3
        },
        {
          label: 'Previous Period',
          data: labels.map(() => Math.floor(Math.random() * 1000) + 100),
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          tension: 0.3
        }
      ],
    };

    // Bar chart data - Query count by model
    const barData = {
      labels: ['GPT-3.5', 'GPT-4', 'Claude', 'Llama', 'Mistral', 'Gemini'],
      datasets: [
        {
          label: 'Query Count',
          data: [Math.floor(Math.random() * 1000) + 500, Math.floor(Math.random() * 1500) + 1000, 
                Math.floor(Math.random() * 800) + 300, Math.floor(Math.random() * 600) + 200,
                Math.floor(Math.random() * 700) + 250, Math.floor(Math.random() * 900) + 400],
          backgroundColor: 'rgba(54, 162, 235, 0.7)'
        }
      ]
    };

    setChartData({ pieData, lineData, barData });
  };

  // Sample metrics data
  const metrics = [
    {
      name: 'Total Queries',
      value: '28,429',
      change: '+12.5%',
      increasing: true,
      icon: MessageSquare
    },
    {
      name: 'Avg. Response Time',
      value: '230ms',
      change: '-18.3%',
      increasing: false,
      icon: Clock
    },
    {
      name: 'Active Users',
      value: '1,893',
      change: '+8.1%',
      increasing: true,
      icon: Users
    },
    {
      name: 'Documents Processed',
      value: '4,721',
      change: '+23.7%',
      increasing: true,
      icon: FileText
    }
  ];
  
  const renderTimeRangeButton = (range: TimeRange, label: string) => (
    <button
      onClick={() => setTimeRange(range)}
      className={`px-3 py-1.5 text-sm font-medium rounded-md ${
        timeRange === range
          ? isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-800 shadow-sm border border-gray-200'
          : isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      {label}
    </button>
  );
  
  return (
    <div className={`flex flex-col h-full ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`border-b ${isDark ? 'border-gray-800' : 'border-gray-200'} px-6 py-4`}>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              <div className="flex items-center">
                <PieChart className={`mr-2 h-6 w-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                Analytics
              </div>
            </h1>
            
            <div className="flex items-center space-x-2">
              <button className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center ${
                isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}>
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </button>
              
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center ${
                  isDark 
                    ? showFilters ? 'bg-gray-700 text-white' : 'bg-gray-800 text-white hover:bg-gray-700' 
                    : showFilters ? 'bg-gray-200 text-gray-800' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex space-x-1">
              {renderTimeRangeButton('24h', 'Last 24 Hours')}
              {renderTimeRangeButton('7d', 'Last 7 Days')}
              {renderTimeRangeButton('30d', 'Last 30 Days')}
              {renderTimeRangeButton('90d', 'Last 90 Days')}
              {renderTimeRangeButton('custom', 'Custom Range')}
            </div>
            
            {timeRange === 'custom' && (
              <div className="flex items-center space-x-2">
                <div className={`relative ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  <input
                    type="date"
                    className={`pl-10 pr-4 py-1.5 rounded-lg text-sm ${
                      isDark 
                        ? 'bg-gray-800 border-gray-700 focus:border-blue-500 focus:ring-blue-500' 
                        : 'bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                    defaultValue="2023-10-01"
                  />
                  <Calendar className="absolute left-3 top-2 h-4 w-4" />
                </div>
                <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>to</span>
                <div className={`relative ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  <input
                    type="date"
                    className={`pl-10 pr-4 py-1.5 rounded-lg text-sm ${
                      isDark 
                        ? 'bg-gray-800 border-gray-700 focus:border-blue-500 focus:ring-blue-500' 
                        : 'bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                    defaultValue="2023-10-31"
                  />
                  <Calendar className="absolute left-3 top-2 h-4 w-4" />
                </div>
                <button className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  isDark ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}>
                  Apply
                </button>
              </div>
            )}
          </div>
          
          {/* Filter panel */}
          {showFilters && (
            <div className={`mt-2 p-4 rounded-lg ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Data Source
                  </label>
                  <div className="relative">
                    <select className={`w-full rounded-lg py-2 pl-3 pr-10 text-sm ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    }`}>
                      <option value="all">All Sources</option>
                      <option value="docs">Documents</option>
                      <option value="web">Web Search</option>
                      <option value="custom">Custom Knowledge Base</option>
                    </select>
                    <ChevronDown className={`absolute right-3 top-2.5 h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  </div>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    User Group
                  </label>
                  <div className="relative">
                    <select className={`w-full rounded-lg py-2 pl-3 pr-10 text-sm ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    }`}>
                      <option value="all">All Users</option>
                      <option value="active">Active Users</option>
                      <option value="new">New Users</option>
                      <option value="returning">Returning Users</option>
                    </select>
                    <ChevronDown className={`absolute right-3 top-2.5 h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  </div>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Model
                  </label>
                  <div className="relative">
                    <select className={`w-full rounded-lg py-2 pl-3 pr-10 text-sm ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    }`}>
                      <option value="all">All Models</option>
                      <option value="gpt4">GPT-4</option>
                      <option value="claude">Claude 3</option>
                      <option value="mistral">Mistral</option>
                    </select>
                    <ChevronDown className={`absolute right-3 top-2.5 h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <button className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                  Reset
                </button>
                <button className={`ml-2 px-3 py-1.5 rounded-lg text-sm font-medium ${
                  isDark ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}>
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className={`rounded-xl p-6 ${
                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm border border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {metric.name}
                  </h3>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {metric.value}
                  </p>
                </div>
                <div className={`p-2 rounded-lg ${
                  isDark ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <metric.icon className={`h-5 w-5 ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className={`flex items-center text-sm font-medium ${
                  metric.increasing
                    ? isDark ? 'text-green-400' : 'text-green-600'
                    : isDark ? 'text-red-400' : 'text-red-600'
                }`}>
                  {metric.increasing ? (
                    <ArrowUp className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDown className="h-3 w-3 mr-1" />
                  )}
                  {metric.change}
                </span>
                <span className={`ml-1.5 text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  vs. previous period
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Queries Over Time Chart */}
          <div className={`rounded-xl overflow-hidden border ${
            isDark ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <div className={`px-6 py-4 border-b ${isDark ? 'border-gray-800 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
              <div className="flex items-center justify-between">
                <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Queries Over Time
                </h3>
                <div className="flex items-center space-x-2">
                  <select className={`text-xs rounded p-1 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-700'
                  }`}>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={`p-6 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <div className="flex items-center justify-center h-64">
                <BarChart2 className={`h-20 w-20 ${isDark ? 'text-gray-700' : 'text-gray-300'}`} />
                <p className={`ml-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Chart visualization would go here
                </p>
              </div>
            </div>
          </div>
          
          {/* Response Time Distribution */}
          <div className={`rounded-xl overflow-hidden border ${
            isDark ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <div className={`px-6 py-4 border-b ${isDark ? 'border-gray-800 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
              <div className="flex items-center justify-between">
                <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Response Time Distribution
                </h3>
                <div className="flex items-center space-x-2">
                  <select className={`text-xs rounded p-1 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-700'
                  }`}>
                    <option value="all">All Models</option>
                    <option value="gpt4">GPT-4</option>
                    <option value="claude">Claude 3</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={`p-6 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-opacity-50 rounded-lg p-4 h-64 flex flex-col">
                  <h3 className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Query Success Distribution</h3>
                  <div className="flex-1 flex items-center justify-center">
                    {Object.keys(chartData.pieData).length > 0 && (
                      <Pie 
                        data={chartData.pieData} 
                        options={{
                          plugins: {
                            legend: {
                              position: 'bottom',
                              labels: {
                                color: isDark ? '#e5e7eb' : '#374151',
                                padding: 20,
                                font: {
                                  size: 12
                                }
                              }
                            }
                          },
                          maintainAspectRatio: false
                        }} 
                      />
                    )}
                  </div>
                </div>

                <div className="bg-opacity-50 rounded-lg p-4 h-64 flex flex-col">
                  <h3 className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Response Time Distribution</h3>
                  <div className="flex-1">
                    {Object.keys(chartData.lineData).length > 0 && (
                      <Line 
                        data={chartData.lineData} 
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          scales: {
                            y: {
                              ticks: {
                                color: isDark ? '#9ca3af' : '#4b5563'
                              },
                              grid: {
                                color: isDark ? 'rgba(75, 85, 99, 0.2)' : 'rgba(209, 213, 219, 0.5)'
                              }
                            },
                            x: {
                              ticks: {
                                color: isDark ? '#9ca3af' : '#4b5563'
                              },
                              grid: {
                                color: isDark ? 'rgba(75, 85, 99, 0.2)' : 'rgba(209, 213, 219, 0.5)'
                              }
                            }
                          },
                          plugins: {
                            legend: {
                              labels: {
                                color: isDark ? '#e5e7eb' : '#374151'
                              }
                            }
                          }
                        }} 
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional Charts/Metrics */}
        <div className="grid grid-cols-1 gap-6">
          {/* Query count by model */}
          <div className={`rounded-xl overflow-hidden border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className={`px-6 py-4 border-b ${isDark ? 'border-gray-800 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
              <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Query Count by Model
              </h3>
            </div>
            <div className={`p-6 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <div className="h-80">
                {Object.keys(chartData.barData).length > 0 && (
                  <Bar 
                    data={chartData.barData} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            color: isDark ? '#9ca3af' : '#4b5563'
                          },
                          grid: {
                            color: isDark ? 'rgba(75, 85, 99, 0.2)' : 'rgba(209, 213, 219, 0.5)'
                          }
                        },
                        x: {
                          ticks: {
                            color: isDark ? '#9ca3af' : '#4b5563'
                          },
                          grid: {
                            color: isDark ? 'rgba(75, 85, 99, 0.2)' : 'rgba(209, 213, 219, 0.5)'
                          }
                        }
                      },
                      plugins: {
                        legend: {
                          display: false
                        },
                        title: {
                          display: false
                        }
                      }
                    }} 
                  />
                )}
              </div>
            </div>
          </div>
          {/* Top Queries */}
          <div className={`rounded-xl overflow-hidden border ${
            isDark ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <div className={`px-6 py-4 border-b ${isDark ? 'border-gray-800 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
              <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Top Queries
              </h3>
            </div>
            <div className={`${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>
                      Query
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>
                      Count
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>
                      Avg. Response Time
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>
                      Success Rate
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {['How to implement RAG?', 'What is vector database?', 'Explain embeddings', 'PDF parsing techniques', 'Nearest neighbor search'].map((query, index) => (
                    <tr 
                      key={index} 
                      className={`${
                        index !== 4 ? isDark ? 'border-b border-gray-800' : 'border-b border-gray-200' : ''
                      } hover:${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}
                    >
                      <td className={`px-6 py-4 text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {query}
                      </td>
                      <td className={`px-6 py-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {Math.floor(Math.random() * 1000) + 100}
                      </td>
                      <td className={`px-6 py-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {Math.floor(Math.random() * 300) + 100}ms
                      </td>
                      <td className={`px-6 py-4 text-sm`}>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium 
                          ${index % 3 === 0 
                            ? isDark ? 'bg-yellow-900/30 text-yellow-300' : 'bg-yellow-100 text-yellow-800' 
                            : isDark ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-800'
                          }`
                        }>
                          {95 + Math.floor(Math.random() * 5)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}