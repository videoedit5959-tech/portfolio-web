import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '../types/portfolio';

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'asif_portfolio_auth_token';
const AUTH_USER_KEY = 'asif_portfolio_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(AUTH_STORAGE_KEY);
      const storedUser = localStorage.getItem(AUTH_USER_KEY);
      if (storedToken && storedUser) {
        // Validate token expiry (simulated 24-hour token)
        const parsedToken = JSON.parse(storedToken);
        if (parsedToken.exp && Date.now() < parsedToken.exp) {
          setToken(parsedToken.jwt);
          setUser(JSON.parse(storedUser));
        } else {
          // Expired
          localStorage.removeItem(AUTH_STORAGE_KEY);
          localStorage.removeItem(AUTH_USER_KEY);
        }
      }
    } catch (e) {
      console.error('Failed to restore auth session', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    // Simulate network authentication request
    await new Promise((resolve) => setTimeout(resolve, 600));

    const cleanEmail = email.trim().toLowerCase();
    
    // Check credentials against standard default or custom stored admin
    // Default admin: admin@asifdev.com / asif2026! or admin12345
    const validEmails = ['admin@asifdev.com', 'asif@gmail.com', 'admin@example.com'];
    const validPasswords = ['admin12345', 'asif2026!', 'mern@asif2026'];

    const isValidUser = validEmails.includes(cleanEmail) || cleanEmail.includes('admin') || cleanEmail.includes('asif');
    const isValidPass = validPasswords.includes(password) || password === 'admin123' || password === 'admin12345';

    if (isValidUser && isValidPass) {
      const adminUser: AdminUser = {
        id: 'admin-1',
        email: cleanEmail,
        name: 'Asif (Administrator)',
        role: 'admin',
      };

      // Create simulated JWT with signature and expiration
      const simulatedJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
        JSON.stringify({ sub: adminUser.id, email: adminUser.email, role: 'admin', iat: Date.now() })
      )}.simulated_hmac_sha256_signature`;

      const tokenObj = {
        jwt: simulatedJwt,
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      };

      setUser(adminUser);
      setToken(simulatedJwt);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(tokenObj));
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(adminUser));
      setIsLoading(false);
      return { success: true };
    }

    setIsLoading(false);
    return {
      success: false,
      error: 'Invalid email or password. Please check your credentials.',
    };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
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
