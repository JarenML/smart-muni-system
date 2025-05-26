import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { RequestProvider } from "./contexts/RequestContext";
import { ResumeProvider } from "./contexts/ResumeContext";

import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/ciudadano/Dashboard";
import RequestList from "./pages/ciudadano/MisTramites";
import CreateRequest from "./pages/ciudadano/EnviarTramite";
import UploadResume from "./pages/ciudadano/EnviarCV";
import ResumeList from "./pages/admin/GestionCV";

import "./index.css";

// Temporal: página fallback para rutas no encontradas
const NotFound = () => (
  <h1 className="p-6 text-xl font-semibold">404 - Página no encontrada</h1>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <RequestProvider>
            <ResumeProvider>
              <Routes>
                {/* Rutas públicas */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Rutas protegidas comunes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tramites"
                  element={
                    <ProtectedRoute>
                      <RequestList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tramites/nuevo"
                  element={
                    <ProtectedRoute>
                      <CreateRequest />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/curriculos/nuevo"
                  element={
                    <ProtectedRoute>
                      <UploadResume />
                    </ProtectedRoute>
                  }
                />

                {/* Rutas solo para ADMIN */}
                <Route
                  path="/curriculos"
                  element={
                    <ProtectedRoute requireAdmin>
                      <ResumeList />
                    </ProtectedRoute>
                  }
                />

                {/* Ruta no encontrada */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ResumeProvider>
          </RequestProvider>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
