import React from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  FilePlus,
  UserPlus,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  TrendingUp,
  Calendar,
  Activity,
  Bell,
} from "lucide-react";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import StatCard from "../../components/admin/StatCard";
import { useRequest } from "../../contexts/RequestContext";
import { useAuth } from "../../contexts/AuthContext";

const Dashboard = () => {
  const { requests } = useRequest();
  const { user } = useAuth();

  const userRequests = requests.filter(
    (req) => req.citizenEmail === user?.email
  );

  const pendingRequests = userRequests.filter(
    (req) => req.status === "pending"
  ).length;
  const approvedRequests = userRequests.filter(
    (req) => req.status === "approved"
  ).length;
  const rejectedRequests = userRequests.filter(
    (req) => req.status === "rejected"
  ).length;

  const QuickActionCard = ({
    title,
    description,
    icon,
    buttonText,
    to,
    gradient,
  }) => (
    <div
      className={`relative overflow-hidden rounded-xl p-6 text-white ${gradient}`}
    >
      <div className="relative z-10">
        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-white/90 text-sm mb-4 leading-relaxed">
          {description}
        </p>
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
      {/* Banner + Estadísticas */}
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-2xl shadow-xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>

        <div className="relative z-10 px-8 py-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-white mb-3">
              ¡Hola, {user?.name?.split(" ")[0]}! 👋
            </h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Gestiona tus trámites municipales y postulaciones laborales de
              manera eficiente desde tu panel personalizado.
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

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 px-4 sm:px-6 lg:px-8">
        <StatCard
          title="Trámites en Proceso"
          value={pendingRequests}
          icon={<Clock className="w-5 h-5" />}
          change={4}
          changeType="increase"
          footer={
            <Link
              to="/tramites?status=pending"
              className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center"
            >
              Ver trámites pendientes <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          }
        />
        <StatCard
          title="Trámites Aprobados"
          value={approvedRequests}
          icon={<CheckCircle className="w-5 h-5" />}
          change={2}
          changeType="increase"
        />
        <StatCard
          title="Trámites Rechazados"
          value={rejectedRequests}
          icon={<XCircle className="w-5 h-5" />}
          change={1}
          changeType="decrease"
        />
      </div>

      {/* Trámites recientes */}
      <Card title="Mis Trámites Recientes">
        <div className="space-y-4">
          {userRequests.length === 0 ? (
            <div className="text-center py-10">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">
                No hay trámites
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Comienza creando tu primer trámite municipal.
              </p>
              <div className="mt-6">
                <Link to="/tramites/nuevo">
                  <Button
                    variant="primary"
                    icon={<FilePlus className="h-5 w-5" />}
                  >
                    Crear Nuevo Trámite
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trámite
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="relative px-6 py-3">
                      <span className="sr-only">Ver</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userRequests.slice(0, 5).map((request) => (
                    <tr key={request.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {request.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {request.type}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            request.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : request.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {request.status === "approved"
                            ? "Aprobado"
                            : request.status === "rejected"
                            ? "Rechazado"
                            : "En Proceso"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/tramites/${request.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Ver detalles
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Card>

      {/* Acciones rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 sm:px-6 lg:px-8 mt-8">
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
      </div>
    </div>
  );
};

export default Dashboard;
