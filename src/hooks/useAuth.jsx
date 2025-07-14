import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (credentials.email && credentials.password) {
        const userData = {
          email: credentials.email,
          name: "Admin",
          role: "admin"
        };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return true;
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return { user, isLoading, login, register, logout };
}