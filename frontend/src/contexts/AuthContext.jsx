import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Mock admin user for testing
const ADMIN_USER = {
  username: "makanaky1",
  email: "makanaky@gmail.com",
  password: "votame tu gaaa",
  role: "admin",
  name: "Administrador",
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Check if it's the admin user
    if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
      const adminUser = { ...ADMIN_USER };
      setUser(adminUser);
      localStorage.setItem("user", JSON.stringify(adminUser));
      return { success: true, user: adminUser };
    }

    // Check registered users in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      return { success: true, user: foundUser };
    }

    return { success: false, error: "Credenciales inválidas" };
  };

  const register = (userData) => {
    // Validate if email already exists
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some((u) => u.email === userData.email)) {
      return {
        success: false,
        error: "El correo electrónico ya está registrado",
      };
    }

    // Create new user with citizen role
    const newUser = {
      ...userData,
      role: "citizen",
      id: `user-${Date.now()}`,
    };

    // Save to localStorage
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  const updateProfile = (updatedData) => {
    if (!user) return { success: false, error: "No hay usuario autenticado" };

    const updatedUser = { ...user, ...updatedData };

    // Update in localStorage
    if (user.role === "citizen") {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map((u) =>
        u.id === user.id ? updatedUser : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }

    // Update current user
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    return { success: true, user: updatedUser };
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    updateProfile,
    isAdmin: user?.role === "admin",
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
