import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const navigate = useNavigate();

  // Función para cargar usuario desde localStorage (memoizada)
  const loadUserFromStorage = useCallback(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      
      console.log('🔍 Loading from storage:', { 
        hasUser: !!storedUser, 
        hasToken: !!storedToken,
        userString: storedUser 
      });
      
      if (storedUser && storedToken) {
        const parsedUser = JSON.parse(storedUser);
        console.log('🔍 Parsed user successfully:', parsedUser);
        setUser(parsedUser);
        return parsedUser;
      } else {
        console.log('🔍 No user or token found in storage');
        setUser(null);
      }
    } catch (error) {
      console.error('🔴 Error loading user from storage:', error);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
    }
    return null;
  }, []);

  // Inicialización única
  useEffect(() => {
    if (!initialized) {
      console.log('🔍 AuthContext initializing...');
      loadUserFromStorage();
      setInitialized(true);
      setLoading(false);
    }
  }, [initialized, loadUserFromStorage]);

  // Login function
  const login = async (email, password) => {
    try {
      console.log('🔍 Login attempt for:', email);
      const result = await authService.login({ email, password });
      
      console.log('🔍 Login API result:', result);
      
      if (result && result.token && result.user) {
        // Guardar en localStorage
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        
        console.log('🔍 Saved to localStorage:', {
          token: result.token,
          user: result.user
        });
        
        // Actualizar estado
        setUser(result.user);
        
        console.log('🔍 User state updated to:', result.user);
        
        return { success: true, user: result.user };
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('🔴 Login error:', error);
      return { 
        success: false, 
        error: error.message || "Error al iniciar sesión" 
      };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const result = await authService.register(userData);
      return { success: true };
    } catch (error) {
      console.error('🔴 Register error:', error);
      return { 
        success: false, 
        error: error.message || "Error al registrar usuario" 
      };
    }
  };

  // Logout function
  const logout = useCallback(() => {
    console.log('🔍 Logging out...');
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  // Update profile function
  const updateProfile = useCallback((updatedData) => {
    if (!user) return { success: false, error: "No hay usuario autenticado" };

    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    return { success: true, user: updatedUser };
  }, [user]);

  // Computed values (memoizadas para evitar re-renders)
  const isAuthenticated = !!(user && localStorage.getItem("token"));
  const isAdmin = user?.rol === 'admin';

  // Debug logs para cambios de estado
  useEffect(() => {
    if (initialized) {
      console.log('🔍 AuthContext state updated:', {
        user: user,
        userRole: user?.rol,
        isAuthenticated,
        isAdmin,
        hasToken: !!localStorage.getItem("token")
      });
    }
  }, [user, isAuthenticated, isAdmin, initialized]);

  // Prevenir renderizado hasta que esté inicializado
  if (!initialized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const value = {
    user,
    setUser,
    loading,
    login,
    logout,
    register,
    updateProfile,
    isAuthenticated,
    isAdmin,
    loadUserFromStorage,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};