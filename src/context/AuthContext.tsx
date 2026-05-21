import { useState, type ReactNode } from 'react';
import { loginUser } from '../services/authService';
import { AuthContext } from './AuthContext';

interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'normal';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (data: FormData) => {
    setIsLoading(true);

    try {
      const response = await loginUser(data);

      const userData = response.user;

      setUser(userData);

      localStorage.setItem('token', userData.access_token);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}