// src/components/ciudadano/SidebarCiudadano.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"; // ✅ AGREGADO
import {
  LayoutDashboard,
  FileText,
  FileCheck,
  MessageCircleQuestion,
  User,
  ChevronRight,
  X,
} from "lucide-react";

const SidebarCiudadano = ({ isOpen, closeSidebar }) => {
  const { user } = useAuth(); // ✅ AGREGADO

  const navItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: "Trámites",
      icon: <FileText className="w-5 h-5" />,
      subItems: [
        { path: "/tramites", label: "Ver enviados" },
        { path: "/tramites/nuevo", label: "Crear Nuevo" },
      ],
    },
    {
      label: "Currículos",
      icon: <FileCheck className="w-5 h-5" />,
      subItems: [
        { path: "/curriculos", label: "Ver enviados" },
        { path: "/curriculos/subir", label: "Subir Nuevo" },
      ],
    },
    {
      label: "Chatbot",
      icon: <MessageCircleQuestion className="w-5 h-5" />,
      subItems: [{ path: "/chatbot", label: "Consultar trámite/cv" }],
    },
    {
      path: "/perfil",
      label: "Perfil",
      icon: <User className="w-5 h-5" />,
    },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Encabezado */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 text-white p-1 rounded">
            <LayoutDashboard className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold">Muni Yau</span>
        </div>
        <button
          onClick={closeSidebar}
          className="lg:hidden rounded-md p-2 text-gray-400 hover:text-white focus:outline-none"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Navegación */}
      <nav className="mt-4 px-2">
        <div className="space-y-1">
          {navItems.map((item, idx) => (
            <div key={idx} className="mb-2">
              {item.subItems ? (
                <>
                  <div className="flex items-center px-4 py-2 text-sm font-medium text-gray-300">
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.label}</span>
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </div>
                  <div className="mt-1 ml-10 space-y-1">
                    {item.subItems.map((subItem) => (
                      <NavLink
                        key={subItem.path}
                        to={subItem.path}
                        className={({ isActive }) =>
                          `block pl-3 pr-4 py-2 text-sm font-medium rounded-md transition-colors ${
                            isActive
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:bg-gray-700 hover:text-white"
                          }`
                        }
                        onClick={closeSidebar}
                      >
                        {subItem.label}
                      </NavLink>
                    ))}
                  </div>
                </>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`
                  }
                  onClick={closeSidebar}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Info Usuario - ✅ CORREGIDO */}
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 text-white p-1 rounded-full">
            <User className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">
              {user?.name || user?.nombre || 'Usuario'}
            </p>
            <p className="text-xs text-gray-400">Ciudadano</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarCiudadano;