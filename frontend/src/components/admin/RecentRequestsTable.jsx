import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import StatusBadge from "../common/StatusBadge";
import { formatDate } from "../../utils/formatters";
import EmptyState from "../common/EmptyState";

const RecentRequestsTable = ({ requests, loading }) => {
  if (loading) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">Cargando solicitudes recientes...</p>
      </div>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <EmptyState
        title="No hay trámites recientes"
        description="Cuando se creen nuevos trámites, aparecerán aquí."
        actionText="Crear nuevo trámite"
        onAction={() => (window.location.href = "/tramites/nuevo")}
      />
    );
  }

  return (
    <div className="mt-2 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Trámite
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Ciudadano
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Fecha
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Estado
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Ver</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {requests.slice(0, 5).map((request) => (
            <tr key={request.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {request.title}
                </div>
                <div className="text-sm text-gray-500">{request.type}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {request.citizenName}
                </div>
                <div className="text-sm text-gray-500">
                  {request.citizenEmail}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(request.createdAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={request.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  to={`/tramites/${request.id}`}
                  className="text-blue-600 hover:text-blue-900 flex items-center justify-end"
                >
                  <span>Ver</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {requests.length > 5 && (
        <div className="bg-gray-50 px-6 py-3 text-center">
          <Link
            to="/tramites"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Ver todos los trámites
          </Link>
        </div>
      )}
    </div>
  );
};

export default RecentRequestsTable;
