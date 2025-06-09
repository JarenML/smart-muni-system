import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "../components/common/Loading"; // Si no lo tienes, comenta esta línea

const RoleRedirect = () => {
  const { user, isAuthenticated, loading } = useAuth();

  // Debug logs
  console.log('🔍 RoleRedirect check:', {
    user,
    userRole: user?.rol, // IMPORTANTE: usar 'rol', no 'role'
    isAuthenticated,
    loading,
    hasToken: !!localStorage.getItem("token")
  });

  if (loading) {
    return <Loading />; // Si no tienes Loading, usa el div comentado abajo
    // return <div className="min-h-screen flex items-center justify-center">
    //   <div className="text-center py-10">Cargando...</div>
    // </div>;
  }

  if (!isAuthenticated || !user) {
    console.log('🔍 RoleRedirect: Not authenticated, going to login');
    return <Navigate to="/login" replace />;
  }

  // CRÍTICO: Tu backend devuelve 'rol', no 'role'
  const userRole = user?.rol; // ⚠️ NO usar user.role
  
  console.log('🔍 RoleRedirect: Redirecting based on role:', userRole);
  
  switch (userRole) {
    case 'admin':
      console.log('🔍 RoleRedirect: Admin detected, going to dashboard');
      return <Navigate to="/dashboard" replace />;
    case 'ciudadano':
      console.log('🔍 RoleRedirect: Ciudadano detected, going to dashboard');
      return <Navigate to="/dashboard" replace />;
    default:
      console.error('🔴 RoleRedirect: Unknown role:', userRole, 'Full user:', user);
      return <Navigate to="/not-authorized" replace />;
  }
};

export default RoleRedirect;