import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const register = (newUser) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find(u => u.username === newUser.username)) {
      return { success: false, message: 'User already exists' };
    }

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // ✅ Log them in and persist session
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    return { success: true };
  };

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return { success: true };
    } else {
      return { success: false, message: 'Invalid username or password' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
