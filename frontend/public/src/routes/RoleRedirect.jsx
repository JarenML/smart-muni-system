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

  // Redirección según el rol del usuario
  switch (user.role) {
    case "admin":
      return <Navigate to="/admin" replace />;
    case "ciudadano":
      return <Navigate to="/tramites" replace />;
    default:
      // Log en desarrollo si se detecta un rol desconocido
      if (process.env.NODE_ENV === "development") {
        console.warn(`Rol no reconocido: ${user.role}`);
      }
      return <Navigate to="/not-authorized" replace />;
  }
};

export default RoleRedirect;
