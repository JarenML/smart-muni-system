// src/components/layout/AdminLayout.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SidebarAdmin from "../admin/SidebarAdmin";
import Navbar from "./Navbar";
import NotificationContainer from "../common/NotificationContainer";

const AdminLayout = ({ children }) => {
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

    if (path === "/admin") return "Dashboard";
    if (path === "/admin/tramites") return "Gestión de Trámites";
    if (path === "/admin/curriculos") return "Gestión de Currículos";
    if (path === "/admin/curriculos/lista") return "Lista de Currículos";
    if (path === "/perfil") return "Perfil";

    return "Panel de Administración";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      <SidebarAdmin isOpen={sidebarOpen} closeSidebar={closeSidebar} />

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

export default AdminLayout;
