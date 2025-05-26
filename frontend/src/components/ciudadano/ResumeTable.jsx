import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Filter } from "lucide-react";
import StatusBadge from "../UI/StatusBadge";
import { formatDate } from "../../utils/formatters";
import EmptyState from "../UI/EmptyState";
import Loading from "../UI/Loading";

const ResumeTable = ({ resumes, loading, error }) => {
  if (loading) {
    return <Loading text="Cargando currículos..." />;
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  if (!resumes || resumes.length === 0) {
    return (
      <EmptyState
        title="No se encontraron currículos"
        description="No hay currículos que coincidan con los criterios de búsqueda."
        icon={<Filter className="h-12 w-12 text-gray-400" />}
      />
    );
  }

  // Helper function to get color based on AI score
  const getScoreColor = (score) => {
    if (score >= 80) return "bg-green-600";
    if (score >= 60) return "bg-blue-600";
    if (score >= 40) return "bg-yellow-500";
    return "bg-red-600";
  };

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
                Experiencia
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
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Fecha
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Ver</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {resumes.map((resume) => (
              <tr key={resume.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {resume.name}
                  </div>
                  <div className="text-xs text-gray-500">{resume.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {resume.position}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {resume.experience} años
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(resume.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    to={`/curriculos/${resume.id}`}
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

export default ResumeTable;
