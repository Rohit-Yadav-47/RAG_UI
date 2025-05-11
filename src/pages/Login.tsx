import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, Mail, ArrowRight, Github, Twitter, AlertCircle, CheckCircle2, Facebook, Chrome, BarChart, PieChart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Login = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [rememberMe, setRememberMe] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/dashboard');
    }
  }, [navigate]);

  // Password strength checker
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    // Length check
    if (password.length >= 8) strength += 1;
    // Contains number
    if (/\d/.test(password)) strength += 1;
    // Contains special char
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 1;
    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 1;

    setPasswordStrength(Math.min(strength, 4));
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify({ 
        email: email || 'user@example.com', 
        name: name || 'User',
        isAuthenticated: true,
        lastLogin: new Date().toISOString()
      }));
      
      setSuccess(isLogin ? 'Login successful!' : 'Account created successfully!');
      
      // Navigate after a slight delay to ensure localStorage is updated
      setTimeout(() => {
        window.location.href = '/dashboard'; // Using direct location change to ensure full refresh
      }, 300);
    } catch (error) {
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail('demo@example.com');
    setPassword('Demo123');
    setRememberMe(true);
    
    // Submit the form immediately after setting the demo credentials
    setTimeout(() => {
      const form = document.querySelector('form');
      if (form) form.dispatchEvent(new Event('submit', { cancelable: true }));
    }, 100);
  };

  // Get strength color
  const getStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-200 dark:bg-gray-700';
    if (passwordStrength === 1) return 'bg-red-500';
    if (passwordStrength === 2) return 'bg-orange-500';
    if (passwordStrength === 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Get strength text
  const getStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength === 1) return 'Weak';
    if (passwordStrength === 2) return 'Fair';
    if (passwordStrength === 3) return 'Good';
    return 'Strong';
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800'}`}>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className={`absolute top-0 left-0 w-full h-full ${theme === 'dark' ? 'opacity-10' : 'opacity-20'}`} style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(75, 85, 99, 0.8) 0%, transparent 25%), radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.8) 0%, transparent 25%)' }}></div>
        <div className={`absolute -top-40 -left-40 w-80 h-80 rounded-full ${theme === 'dark' ? 'bg-blue-700' : 'bg-blue-500'} opacity-10 blur-3xl`}></div>
        <div className={`absolute -bottom-40 -right-40 w-80 h-80 rounded-full ${theme === 'dark' ? 'bg-indigo-700' : 'bg-indigo-500'} opacity-10 blur-3xl`}></div>
        
        {/* Decorative Data Visualization Elements */}
        <div className="absolute top-20 right-20 opacity-20">
          <div className="h-32 w-32 flex flex-col items-center">
            <PieChart className={`h-full w-full ${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'}`} strokeWidth={1} />
          </div>
        </div>
        <div className="absolute bottom-20 left-20 opacity-20">
          <div className="h-32 w-32 flex flex-col items-center">
            <BarChart className={`h-full w-full ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-500'}`} strokeWidth={1} />
          </div>
        </div>
      </div>
      <div className="w-full max-w-md relative z-10 backdrop-blur-sm">
        {/* Logo and App Name */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${theme === 'dark' ? 'bg-blue-700 bg-opacity-80' : 'bg-blue-600'} text-white mb-4 shadow-lg`}>
            <User className="w-8 h-8" />
          </div>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>RAG Assistant</h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Your AI-powered research companion</p>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Your intelligent document companion</p>
        </div>

        {/* Card */}
        <div className={`rounded-xl p-8 transition-all duration-300 shadow-2xl ${theme === 'dark' ? 'bg-gray-900 border border-gray-800' : 'bg-white'}`}>
          <h2 className={`text-2xl font-bold text-center mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-800/40 text-red-400 rounded-lg text-sm flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-900/30 border border-green-800/40 text-green-400 rounded-lg text-sm flex items-start">
              <CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name field (only for signup) */}
            {!isLogin && (
              <div className="mb-4">
                <label htmlFor="name" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`pl-10 w-full py-2.5 px-4 rounded-lg focus:ring-2 focus:ring-primary-500 transition-colors ${
                      theme === 'dark' 
                        ? 'bg-gray-800 border-gray-700 text-white focus:border-primary-600' 
                        : 'border border-gray-300 text-gray-900 focus:border-primary-500'
                    }`}
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            {/* Email field */}
            <div className="mb-4">
              <label htmlFor="email" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`pl-10 w-full py-2.5 px-4 rounded-lg focus:ring-2 focus:ring-primary-500 transition-colors ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-primary-600' 
                      : 'border border-gray-300 text-gray-900 focus:border-primary-500'
                  }`}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="mb-2">
              <label htmlFor="password" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`pl-10 w-full py-2.5 px-4 rounded-lg focus:ring-2 focus:ring-primary-500 transition-colors ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-primary-600' 
                      : 'border border-gray-300 text-gray-900 focus:border-primary-500'
                  }`}
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Password strength meter (only for signup) */}
            {!isLogin && password && (
              <div className="mb-4">
                <div className="flex h-1 mt-2 mb-1 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-full w-1/4 ${i < passwordStrength ? getStrengthColor() : 'bg-gray-200 dark:bg-gray-700'} ${i > 0 ? 'ml-1' : ''}`}
                    />
                  ))}
                </div>
                <div className={`relative ${theme === 'dark' ? 'bg-gray-800/90 backdrop-blur-sm' : 'bg-white'} shadow-xl rounded-2xl overflow-hidden border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    Password strength: <span className="font-medium">{getStrengthText()}</span>
                  </p>
                </div>
              </div>
            )}

            {/* Remember me & Forgot password */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className={`h-4 w-4 rounded ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-primary-600' : 'border-gray-300 text-primary-600'}`}
                />
                <label htmlFor="remember-me" className={`ml-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Remember me
                </label>
              </div>
              {isLogin && (
                <button
                  type="button"
                  className={`text-sm ${theme === 'dark' ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-800'}`}
                >
                  Forgot password?
                </button>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full font-medium py-2.5 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center ${
                theme === 'dark'
                  ? 'bg-primary-600 hover:bg-primary-700 text-white'
                  : 'bg-primary-600 hover:bg-primary-700 text-white'
              } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>

            {/* Demo login button */}
            {isLogin && (
              <button
                type="button"
                onClick={handleDemoLogin}
                className={`w-full mt-3 font-medium py-2.5 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center ${
                  theme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                Demo Login
              </button>
            )}

            {/* Social login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className={`w-full border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className={`px-2 ${theme === 'dark' ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-500'}`}>
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-4 gap-3">
                <button
                  type="button"
                  className={`py-2 px-4 rounded-lg flex justify-center items-center ${
                    theme === 'dark'
                      ? 'bg-gray-800 hover:bg-gray-700 text-white'
                      : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <Github className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className={`py-2 px-4 rounded-lg flex justify-center items-center ${
                    theme === 'dark'
                      ? 'bg-gray-800 hover:bg-gray-700 text-white'
                      : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <Chrome className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className={`py-2 px-4 rounded-lg flex justify-center items-center ${
                    theme === 'dark'
                      ? 'bg-gray-800 hover:bg-gray-700 text-white'
                      : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <Facebook className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className={`py-2 px-4 rounded-lg flex justify-center items-center ${
                    theme === 'dark'
                      ? 'bg-gray-800 hover:bg-gray-700 text-white'
                      : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <Twitter className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Toggle between login and signup */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className={`text-sm font-medium transition-colors ${
                  theme === 'dark' ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-800'
                }`}
              >
                {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className={`mt-8 text-center text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
          <p>© 2025 RAG Assistant. All rights reserved.</p>
            <div className="mt-2 space-x-4">
            <a href="#" className={`${theme === 'dark' ? 'text-gray-500 hover:text-gray-300' : 'text-gray-600 hover:text-primary-600'} transition-colors`}>
              Privacy Policy
            </a>
            <a href="#" className={`${theme === 'dark' ? 'text-gray-500 hover:text-gray-300' : 'text-gray-600 hover:text-primary-600'} transition-colors`}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
