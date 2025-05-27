import React from "react";
import { Link } from "react-router-dom";
import { 
  FileText, 
  FilePlus, 
  UserPlus, 
  Clock, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  Calendar,
  Bell,
  Activity,
  ArrowRight
} from "lucide-react";

const DashboardCitizen = () => {
  // Mock data - en tu aplicación real esto vendría de tus contexts
  const user = { name: "Nilton Jesus Castro Salas", email: "nilton@email.com" };
  const userRequests = [];
  const pendingRequests = 0;
  const approvedRequests = 0;
  const rejectedRequests = 0;

  const StatCard = ({ title, value, icon, trend, trendValue, footer, color = "blue" }) => {
    const colorClasses = {
      blue: "bg-blue-50 text-blue-600 border-blue-100",
      green: "bg-green-50 text-green-600 border-green-100",
      red: "bg-red-50 text-red-600 border-red-100",
      yellow: "bg-yellow-50 text-yellow-600 border-yellow-100"
    };

    return (
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            {icon}
          </div>
          {trend && (
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +{trendValue}%
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          <p className="text-sm font-medium text-gray-600 mt-1">{title}</p>
          
          {footer && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              {footer}
            </div>
          )}
        </div>
      </div>
    );
  };

  const QuickActionCard = ({ title, description, icon, buttonText, to, gradient }) => (
    <div className={`relative overflow-hidden rounded-xl p-6 text-white ${gradient}`}>
      <div className="relative z-10">
        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-white/90 text-sm mb-4 leading-relaxed">{description}</p>
        <Link 
          to={to}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center group inline-flex"
        >
          {buttonText}
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-500">Bienvenido de vuelta, {user?.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {user?.name?.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
          
          <div className="relative z-10 px-8 py-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-white mb-3">
                ¡Hola, {user?.name.split(' ')[0]}! 👋
              </h2>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                Gestiona tus trámites municipales y postulaciones laborales de manera eficiente desde tu panel personalizado.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/tramites/nuevo"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200 flex items-center shadow-lg"
                >
                  <FilePlus className="w-5 h-5 mr-2" />
                  Nuevo Trámite
                </Link>
                <Link 
                  to="/curriculos/subir"
                  className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium hover:bg-white/30 transition-colors duration-200 flex items-center border border-white/30"
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Subir Currículum
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Trámites en Proceso"
            value={pendingRequests}
            icon={<Clock className="w-6 h-6" />}
            color="yellow"
            footer={
              <Link 
                to="/tramites?status=pending"
                className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center"
              >
                Ver trámites pendientes
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            }
          />

          <StatCard
            title="Trámites Aprobados"
            value={approvedRequests}
            icon={<CheckCircle className="w-6 h-6" />}
            color="green"
            trend={true}
            trendValue={12}
          />

          <StatCard
            title="Trámites Rechazados"
            value={rejectedRequests}
            icon={<XCircle className="w-6 h-6" />}
            color="red"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Requests */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Mis Trámites Recientes</h3>
                  <p className="text-sm text-gray-500">Últimas actividades en tu cuenta</p>
                </div>
                <Activity className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="p-6">
                {userRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No hay trámites registrados</h4>
                    <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                      Comienza tu gestión municipal creando tu primer trámite oficial.
                    </p>
                    <Link 
                      to="/tramites/nuevo"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center mx-auto"
                    >
                      <FilePlus className="w-5 h-5 mr-2" />
                      Crear Nuevo Trámite
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Aquí irían los trámites reales */}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            <QuickActionCard
              title="Trámites Municipales"
              description="Inicia un nuevo trámite o consulta el estado de tus solicitudes pendientes."
              icon={<FileText className="w-6 h-6" />}
              buttonText="Nuevo Trámite"
              gradient="bg-gradient-to-br from-blue-500 to-blue-600"
              to="/tramites/nuevo"
            />

            <QuickActionCard
              title="Oportunidades Laborales"
              description="Explora las ofertas de empleo disponibles y postula con tu currículum."
              icon={<UserPlus className="w-6 h-6" />}
              buttonText="Subir Currículum"
              gradient="bg-gradient-to-br from-green-500 to-green-600"
              to="/curriculos/subir"
            />

            {/* Activity Feed */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                <h3 className="font-semibold text-gray-900">Actividad Reciente</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">Cuenta creada exitosamente</p>
                    <p className="text-xs text-gray-500">Hace 2 días</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">Perfil completado</p>
                    <p className="text-xs text-gray-500">Hace 2 días</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCitizen;