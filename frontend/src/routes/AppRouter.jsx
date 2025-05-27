// src/routes/AppRouter.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

import PrivateRoute from "./ProtectedRoute";
import RoleRedirect from "./RoleRedirect";

// Layouts
import AdminLayout from "../components/layout/AdminLayout";
import CiudadanoLayout from "../components/layout/CiudadanoLayout";

// Auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Dashboard dinámico
import Dashboard from "../pages/shared/Dashboard";

// Ciudadano
import CreateRequest from "../pages/ciudadano/CreateRequest";
import RequestList from "../pages/ciudadano/RequestList";
import RequestDetail from "../pages/ciudadano/RequestDetail";
import ResumeForm from "../pages/ciudadano/UploadResume";
import ResumeDetail from "../pages/ciudadano/ResumeDetail";
import ChatBot from "../pages/ciudadano/ChatBot";

// Admin
import GestionTramites from "../pages/admin/GestionTramites";
import GestionCV from "../pages/admin/GestionCV";
import ResumeList from "../pages/admin/ResumeList";

// Compartidos
import Profile from "../pages/shared/Profile";
import NotFound from "../pages/shared/NotFound";
import Unauthorized from "../pages/shared/Unauthorized";

const AppRouter = () => {
  const { user } = useAuth(); // ✅ definido correctamente

  return (
    <Routes>
      {/* Públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard dinámico */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute allowedRoles={["admin", "ciudadano"]}>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* Ciudadano */}
      <Route
        path="/tramites"
        element={
          <PrivateRoute allowedRoles={["ciudadano"]}>
            <CiudadanoLayout>
              <RequestList />
            </CiudadanoLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/tramites/nuevo"
        element={
          <PrivateRoute allowedRoles={["ciudadano"]}>
            <CiudadanoLayout>
              <CreateRequest />
            </CiudadanoLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/tramites/:id"
        element={
          <PrivateRoute allowedRoles={["ciudadano"]}>
            <CiudadanoLayout>
              <RequestDetail />
            </CiudadanoLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/curriculos/subir"
        element={
          <PrivateRoute allowedRoles={["ciudadano"]}>
            <CiudadanoLayout>
              <ResumeForm />
            </CiudadanoLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/curriculos/:id"
        element={
          <PrivateRoute allowedRoles={["ciudadano"]}>
            <CiudadanoLayout>
              <ResumeDetail />
            </CiudadanoLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/chatbot"
        element={
          <PrivateRoute allowedRoles={["ciudadano"]}>
            <CiudadanoLayout>
              <ChatBot />
            </CiudadanoLayout>
          </PrivateRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/tramites"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminLayout>
              <GestionTramites />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/curriculos"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminLayout>
              <GestionCV />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/curriculos/lista"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminLayout>
              <ResumeList />
            </AdminLayout>
          </PrivateRoute>
        }
      />

      {/* Perfil (con layout dinámico por rol) */}
      <Route
        path="/perfil"
        element={
          <PrivateRoute allowedRoles={["admin", "ciudadano"]}>
            {user?.role === "admin" ? (
              <AdminLayout>
                <Profile />
              </AdminLayout>
            ) : (
              <CiudadanoLayout>
                <Profile />
              </CiudadanoLayout>
            )}
          </PrivateRoute>
        }
      />

      {/* Errores */}
      <Route path="/" element={<RoleRedirect />} />
      <Route path="/not-authorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
