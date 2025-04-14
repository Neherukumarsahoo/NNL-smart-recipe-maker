import React, { createContext, useState, useEffect } from "react";

export const UserProvider = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);
  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <UserContext.Provider value={{ user, login, logout, theme, toggleTheme }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;