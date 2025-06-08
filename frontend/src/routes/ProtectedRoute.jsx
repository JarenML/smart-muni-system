import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated, loading } = useAuth();

  // Debug logs
  console.log('🔍 ProtectedRoute check:', {
    user,
    userRole: user?.rol,
    isAuthenticated,
    loading,
    allowedRoles,
    hasToken: !!localStorage.getItem("token")
  });

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    console.log('🔍 ProtectedRoute: Still loading...');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Verificar autenticación de múltiples formas
  const hasStoredToken = !!localStorage.getItem("token");
  const hasStoredUser = !!localStorage.getItem("user");
  const isUserAuthenticated = isAuthenticated || (hasStoredToken && hasStoredUser);

  console.log('🔍 ProtectedRoute auth check:', {
    isUserAuthenticated,
    hasStoredToken,
    hasStoredUser,
    contextIsAuth: isAuthenticated
  });

  // Si no está autenticado, redirigir al login
  if (!isUserAuthenticated || !user) {
    console.log('🔍 ProtectedRoute: Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Si no se especifican roles, permitir acceso
  if (allowedRoles.length === 0) {
    console.log('🔍 ProtectedRoute: No roles required, allowing access');
    return children;
  }

  // Obtener rol del usuario con fallback a localStorage
  let userRole = user?.rol || user?.role;
  
  // Si no hay rol en el user object, intentar obtenerlo de localStorage
  if (!userRole && hasStoredUser) {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      userRole = storedUser?.rol || storedUser?.role;
      console.log('🔍 ProtectedRoute: Got role from localStorage:', userRole);
    } catch (error) {
      console.error('🔴 ProtectedRoute: Error parsing stored user:', error);
    }
  }

  console.log('🔍 ProtectedRoute role check:', {
    userRole,
    allowedRoles,
    isRoleAllowed: allowedRoles.includes(userRole)
  });
  
  // Verificar si el rol del usuario está permitido
  if (!allowedRoles.includes(userRole)) {
    console.warn(`🔴 ProtectedRoute: Access denied for role: ${userRole}`);
    return <Navigate to="/not-authorized" replace />;
  }

  console.log('🔍 ProtectedRoute: Access granted, rendering children');
  return children;
};

export default ProtectedRoute;