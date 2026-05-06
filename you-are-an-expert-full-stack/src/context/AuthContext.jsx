import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { demoUsers, roles } from '../data/mockData';

const AuthContext = createContext(null);

const STORAGE_USER = 'campusgrid_user';
const STORAGE_TOKEN = 'campusgrid_token';

function makeToken(user) {
  return `mock-jwt-${user.role}-${user.user_id}-${Date.now()}`;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_USER);
    const savedToken = localStorage.getItem(STORAGE_TOKEN);

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }

    setIsBootstrapping(false);
  }, []);

  const login = async ({ email, password, role }) => {
    if (!email || !password || !role) {
      throw new Error('Email, password, and role are required.');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    const normalizedEmail = email.trim().toLowerCase();
    const foundUser =
      demoUsers.find((candidate) => candidate.email === normalizedEmail && candidate.role === role) ||
      demoUsers.find((candidate) => candidate.role === role);

    if (!foundUser) {
      throw new Error('No demo account exists for that role.');
    }

    const nextToken = makeToken(foundUser);
    setUser(foundUser);
    setToken(nextToken);
    localStorage.setItem(STORAGE_USER, JSON.stringify(foundUser));
    localStorage.setItem(STORAGE_TOKEN, nextToken);
    return foundUser;
  };

  const register = async (payload) => {
    if (!payload.name || !payload.email || !payload.password) {
      throw new Error('Name, email, and password are required.');
    }

    if (payload.password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    const newUser = {
      user_id: 900 + Math.floor(Math.random() * 1000),
      name: payload.name,
      email: payload.email.trim().toLowerCase(),
      role: payload.role || roles.STUDENT,
      branch: payload.branch || 'Undeclared',
      year: payload.year || 'First Year',
      academic_details: payload.academic_details || '',
      bio: '',
      domains: [],
      links: { portfolio: '', github: '', linkedin: '' },
      achievements: [],
      created_at: new Date().toISOString()
    };

    const nextToken = makeToken(newUser);
    setUser(newUser);
    setToken(nextToken);
    localStorage.setItem(STORAGE_USER, JSON.stringify(newUser));
    localStorage.setItem(STORAGE_TOKEN, nextToken);
    return newUser;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_USER);
    localStorage.removeItem(STORAGE_TOKEN);
  };

  const updateUser = (updates) => {
    setUser((current) => {
      const nextUser = { ...current, ...updates };
      localStorage.setItem(STORAGE_USER, JSON.stringify(nextUser));
      return nextUser;
    });
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      isBootstrapping,
      login,
      register,
      logout,
      updateUser
    }),
    [user, token, isBootstrapping]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
