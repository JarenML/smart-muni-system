import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Filter } from "lucide-react";
import StatusBadge from "../UI/StatusBadge";
import { formatDate } from "../../utils/formatters";
import EmptyState from "../UI/EmptyState";
import Loading from "../UI/Loading";

const RequestTable = ({ requests, loading, error }) => {
  if (loading) {
    return <Loading text="Cargando trámites..." />;
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <EmptyState
        title="No se encontraron trámites"
        description="No hay trámites que coincidan con los criterios de búsqueda."
        icon={<Filter className="h-12 w-12 text-gray-400" />}
      />
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      <div className="overflow-x-auto">
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
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Prioridad
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Ver</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {request.title}
                  </div>
                  <div className="text-xs text-gray-500">{request.type}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {request.citizenName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {request.citizenEmail}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(request.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={request.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={request.priority} type="priority" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    to={`/tramites/${request.id}`}
                    className="text-blue-600 hover:text-blue-900 flex items-center justify-end"
                  >
                    <span>Ver detalle</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestTable;
