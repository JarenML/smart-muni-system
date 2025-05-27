import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "../components/common/Loading"; // Opcional: si ya tienes este componente

const RoleRedirect = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading />; // Reemplaza si no tienes uno, o deja el div
    // return <div className="text-center py-10">Cargando...</div>;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.role) {
    case "admin":
      return <Navigate to="/admin" replace />;
    case "ciudadano":
      return <Navigate to="/dashboard" replace />;
    default:
      if (import.meta.env.DEV) {
        console.warn(`Rol no reconocido: ${user.role}`);
      }
      return <Navigate to="/not-authorized" replace />;
  }
};

export default RoleRedirect;
