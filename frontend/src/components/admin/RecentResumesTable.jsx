import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import StatusBadge from "../UI/StatusBadge";
import { formatDate } from "../../utils/formatters";
import EmptyState from "../UI/EmptyState";

const RecentResumesTable = ({ resumes, loading }) => {
  if (loading) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">Cargando currículos recientes...</p>
      </div>
    );
  }

  if (!resumes || resumes.length === 0) {
    return (
      <EmptyState
        title="No hay currículos recientes"
        description="Cuando se suban nuevos currículos, aparecerán aquí."
        actionText="Subir nuevo currículum"
        onAction={() => (window.location.href = "/curriculos/nuevo")}
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
              Candidato
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Puesto
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              IA Score
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
          {resumes.slice(0, 5).map((resume) => (
            <tr key={resume.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {resume.name}
                </div>
                <div className="text-sm text-gray-500">{resume.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {resume.position}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${getScoreColor(
                        resume.aiScore
                      )}`}
                      style={{ width: `${resume.aiScore}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {resume.aiScore}%
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={resume.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  to={`/curriculos/${resume.id}`}
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

      {resumes.length > 5 && (
        <div className="bg-gray-50 px-6 py-3 text-center">
          <Link
            to="/curriculos"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Ver todos los currículos
          </Link>
        </div>
      )}
    </div>
  );
};

// Helper function to get color based on AI score
const getScoreColor = (score) => {
  if (score >= 80) return "bg-green-600";
  if (score >= 60) return "bg-blue-600";
  if (score >= 40) return "bg-yellow-500";
  return "bg-red-600";
};

export default RecentResumesTable;
