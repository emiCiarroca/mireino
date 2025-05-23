import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (credentials) => {
    // Simulación de autenticación
    if (credentials.email && credentials.password) {
      setUser({
        email: credentials.email,
        name: "Admin",
        role: "admin"
      });
      navigate('/');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  return { user, login, logout };
}