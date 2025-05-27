// src/components/layout/CiudadanoLayout.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SidebarCiudadano from "../ciudadano/SidebarCiudadano";
import Navbar from "./Navbar";
import NotificationContainer from "../common/NotificationContainer";

const CiudadanoLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const getPageTitle = () => {
    const path = location.pathname;

    if (path === "/dashboard") return "Dashboard";
    if (path === "/tramites") return "Trámites";
    if (path === "/tramites/nuevo") return "Nuevo Trámite";
    if (path.startsWith("/tramites/")) return "Detalle de Trámite";
    if (path === "/curriculos") return "Currículos";
    if (path === "/curriculos/subir") return "Subir Currículum";
    if (path.startsWith("/curriculos/")) return "Detalle de Currículum";
    if (path === "/chatbot") return "Asistente Virtual";
    if (path === "/perfil") return "Perfil";

    return "Muni Yau";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      <SidebarCiudadano isOpen={sidebarOpen} closeSidebar={closeSidebar} />

      <div className="lg:pl-64 flex flex-col min-h-screen">
        <Navbar toggleSidebar={toggleSidebar} pageTitle={getPageTitle()} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>

        <footer className="bg-white p-4 border-t border-gray-200 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Municipalidad Provincial de Yau. Todos
          los derechos reservados.
        </footer>
      </div>

      <NotificationContainer />
    </div>
  );
};

export default CiudadanoLayout;
