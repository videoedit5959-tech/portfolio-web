import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '../types/portfolio';

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'asif_portfolio_jwt';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Validate session on mount with real /api/auth/me
  useEffect(() => {
    const verifySession = async () => {
      try {
        const storedToken = localStorage.getItem(AUTH_STORAGE_KEY);
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
          ...(storedToken ? { Authorization: `Bearer ${storedToken}` } : {}),
        };

        const res = await fetch('/api/auth/me', {
          headers,
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            setUser(data.user);
            setToken(storedToken);
          } else {
            setUser(null);
            setToken(null);
            localStorage.removeItem(AUTH_STORAGE_KEY);
          }
        } else {
          setUser(null);
          setToken(null);
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      } catch (e) {
        console.warn('Session verification offline or server unreachable:', e);
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setIsLoading(false);
        return {
          success: false,
          error: data.error || 'Invalid credentials. Please verify your email and password.',
        };
      }

      setUser(data.user);
      setToken(data.token);
      if (data.token) {
        localStorage.setItem(AUTH_STORAGE_KEY, data.token);
      }

      setIsLoading(false);
      return { success: true };
    } catch (err) {
      setIsLoading(false);
      return {
        success: false,
        error: 'Unable to reach authentication server. Please check your network connection.',
      };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (e) {
      console.warn('Logout network error:', e);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
