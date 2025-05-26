import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";
import PrivateRoute from "./ProtectedRoute";
import RoleRedirect from "./RoleRedirect"; // ✅ AÑADIDO

// Auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Ciudadano
import DashboardCiudadano from "../pages/ciudadano/Dashboard";
import CreateRequest from "../pages/ciudadano/CreateRequest";
import RequestList from "../pages/ciudadano/RequestList";
import RequestDetail from "../pages/ciudadano/RequestDetail";
import ResumeForm from "../pages/ciudadano/UploadResume";
import ResumeDetail from "../pages/ciudadano/ResumeDetail";
import ChatBot from "../pages/ciudadano/ChatBot";

// Admin
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import GestionTramites from "../pages/admin/GestionTramites";
import GestionCV from "../pages/admin/GestionCV";
import ResumeList from "../pages/admin/ResumeList";

// Compartidos
import Profile from "../pages/shared/Profile";
import NotFound from "../pages/shared/NotFound";
import Unauthorized from "../pages/shared/Unauthorized"; // ✅ AÑADIDO

const AppRouter = () => {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Ciudadano */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute allowedRoles={["ciudadano"]}>
            <Layout>
              <DashboardCiudadano />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/tramites"
        element={
          <PrivateRoute allowedRoles={["ciudadano"]}>
            <Layout>
              <RequestList />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/tramites/nuevo"
        element={
          <PrivateRoute allowedRoles={["ciudadano"]}>
            <Layout>
              <CreateRequest />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/tramites/:id"
        element={
          <PrivateRoute allowedRoles={["ciudadano"]}>
            <Layout>
              <RequestDetail />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/curriculos/subir"
        element={
          <PrivateRoute allowedRoles={["ciudadano"]}>
            <Layout>
              <ResumeForm />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/curriculos/:id"
        element={
          <PrivateRoute allowedRoles={["ciudadano"]}>
            <Layout>
              <ResumeDetail />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/chatbot"
        element={
          <PrivateRoute allowedRoles={["ciudadano"]}>
            <Layout>
              <ChatBot />
            </Layout>
          </PrivateRoute>
        }
      />
      {/* Admin */}
      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <Layout>
              <DashboardAdmin />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/tramites"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <Layout>
              <GestionTramites />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/curriculos"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <Layout>
              <GestionCV />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/curriculos/lista"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <Layout>
              <ResumeList />
            </Layout>
          </PrivateRoute>
        }
      />
      {/* Redirección inteligente por rol */}
      <Route path="/" element={<RoleRedirect />} />
      {/* Perfil y errores */}
      <Route
        path="/perfil"
        element={
          <PrivateRoute allowedRoles={["admin", "ciudadano"]}>
            <Layout>
              <Profile />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route path="/not-authorized" element={<Unauthorized />} />{" "}
      {/* ✅ NUEVA RUTA */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
