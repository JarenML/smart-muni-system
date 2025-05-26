import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "../components/common/Loading"; // Si lo tienes

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading />; // o tu spinner personalizado
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length === 0) {
    return children;
  }

  if (!allowedRoles.includes(user.role)) {
    if (import.meta.env.MODE === "development") {
      console.warn(`Acceso denegado para el rol: ${user.role}`);
    }
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};

export default PrivateRoute;
