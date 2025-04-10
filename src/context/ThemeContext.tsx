import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'dark' | 'light';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  isDarkMode: boolean;
  themeColors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
    muted: string;
    border: string;
    cardBg: string;
    inputBg: string;
  };
};

const lightColors = {
  background: 'bg-white',
  foreground: 'text-gray-900',
  primary: 'text-blue-600',
  secondary: 'text-indigo-600',
  accent: 'text-purple-600',
  muted: 'text-gray-500',
  border: 'border-gray-200',
  cardBg: 'bg-white',
  inputBg: 'bg-gray-50',
};

const darkColors = {
  background: 'bg-black',
  foreground: 'text-gray-100',
  primary: 'text-blue-400',
  secondary: 'text-indigo-400',
  accent: 'text-purple-400',
  muted: 'text-gray-400',
  border: 'border-gray-800',
  cardBg: 'bg-gray-900',
  inputBg: 'bg-gray-800',
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  isDarkMode: true,
  themeColors: darkColors,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const isDarkMode = theme === 'dark';
  const themeColors = isDarkMode ? darkColors : lightColors;

  // Initialize theme from localStorage or default to dark
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  // Update document class when theme changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-black');
      document.body.classList.remove('bg-gray-50');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-black');
      document.body.classList.add('bg-gray-50');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode, themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};
