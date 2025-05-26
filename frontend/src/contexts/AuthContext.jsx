import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// 🧪 Usuario admin simulado para pruebas
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
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const normalizedEmail = email.toLowerCase().trim();

    if (
      normalizedEmail === ADMIN_USER.email &&
      password === ADMIN_USER.password
    ) {
      setUser(ADMIN_USER);
      localStorage.setItem("user", JSON.stringify(ADMIN_USER));
      return { success: true, user: ADMIN_USER };
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find(
      (u) =>
        u.email.toLowerCase().trim() === normalizedEmail &&
        u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      return { success: true, user: foundUser };
    }

    return { success: false, error: "Credenciales inválidas" };
  };

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((u) => u.email === userData.email)) {
      return {
        success: false,
        error: "El correo electrónico ya está registrado",
      };
    }

    const newUser = {
      ...userData,
      role: "ciudadano",
      id: `user-${Date.now()}`,
    };

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

    if (user.role === "ciudadano") {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map((u) =>
        u.id === user.id ? updatedUser : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    return { success: true, user: updatedUser };
  };

  // ✅ Nueva función: actualizar contraseña
  const updatePassword = (currentPassword, newPassword) => {
    if (!user) return { success: false, error: "Usuario no autenticado" };

    // Admin hardcodeado
    if (user.email === ADMIN_USER.email) {
      if (currentPassword !== ADMIN_USER.password) {
        return { success: false, error: "Contraseña actual incorrecta" };
      }

      const updatedAdmin = { ...ADMIN_USER, password: newPassword };
      setUser(updatedAdmin);
      localStorage.setItem("user", JSON.stringify(updatedAdmin));
      return { success: true };
    }

    // Usuario registrado
    if (user.password !== currentPassword) {
      return { success: false, error: "Contraseña actual incorrecta" };
    }

    const updatedUser = { ...user, password: newPassword };
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u) => (u.id === user.id ? updatedUser : u));
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);

    return { success: true };
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    updateProfile,
    updatePassword, // 👈 Añadido aquí
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
