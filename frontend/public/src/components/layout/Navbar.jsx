import React from "react";
import { Menu, Bell, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useNotification } from "../../contexts/NotificationContext";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = ({ toggleSidebar, pageTitle }) => {
  const { notifications, addNotification } = useNotification();
  const { user, logout } = useAuth();

  const unreadNotifications = notifications.length;

  const handleNotificationClick = () => {
    addNotification("Todas las notificaciones marcadas como leídas", "success");
  };

  const handleLogout = () => {
    logout();
    addNotification("Sesión cerrada correctamente", "success");
  };

  return (
    <header className="bg-white shadow-sm z-10 sticky top-0">
      <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Botón de menú (solo en móviles) + título de la página */}
        <div className="flex items-center">
          <button
            type="button"
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={toggleSidebar}
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="ml-2 lg:ml-0 text-lg md:text-xl font-semibold text-gray-800">
            {pageTitle}
          </h1>
        </div>

        {/* Notificaciones + menú de usuario */}
        <div className="flex items-center space-x-4">
          {/* Notificaciones */}
          <div className="relative">
            <button
              onClick={handleNotificationClick}
              className="p-1 rounded-full text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <Bell className="h-6 w-6" />
              {unreadNotifications > 0 && (
                <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center transform translate-x-1 -translate-y-1">
                  {unreadNotifications > 9 ? "9+" : unreadNotifications}
                </span>
              )}
            </button>
          </div>

          {/* Menú de usuario */}
          <div className="relative group">
            <button
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div className="rounded-full bg-gray-200 p-1">
                <User className="h-5 w-5" />
              </div>
              <span className="hidden md:inline-block text-sm font-medium">
                {user?.name || "Usuario"}
              </span>
            </button>

            {/* Dropdown */}
            <div
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block"
              role="menu"
              aria-label="User menu"
            >
              <Link
                to="/perfil"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Mi Perfil
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar Sesión
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
