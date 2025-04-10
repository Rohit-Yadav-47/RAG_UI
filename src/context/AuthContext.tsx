import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define user type
type User = {
  email: string;
  name: string;
  isAuthenticated: boolean;
} | null;

// Define context type
type AuthContextType = {
  user: User;
  login: (email: string, name: string) => void;
  logout: () => void;
  isLoading: boolean;
};

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
});

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing user on mount
  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Failed to parse stored user:', error);
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    };

    checkUser();
  }, []);

  // Login function
  const login = (email: string, name: string) => {
    const newUser = { email, name, isAuthenticated: true };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
