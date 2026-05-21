import { useEffect, useState, type ReactNode } from 'react';

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

  // Charger l'utilisateur depuis le localStorage au refresh
  useEffect(() => {

    const storedUser = localStorage.getItem('user');

    if (storedUser) {

      setUser(JSON.parse(storedUser));

    }

  }, []);

  const login = async (data: FormData) => {

    setIsLoading(true);

    try {

      const response = await loginUser(data);

      // Stocker le token
      localStorage.setItem('token', response.access_token);

      // Stocker l'utilisateur
      localStorage.setItem(
        'user',
        JSON.stringify(response.user)
      );

      // Mettre à jour le context
      setUser(response.user);

    } finally {

      setIsLoading(false);

    }

  };

  const logout = () => {

    setUser(null);

    localStorage.removeItem('token');

    localStorage.removeItem('user');

  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}