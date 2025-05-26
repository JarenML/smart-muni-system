import React from "react";
import Card from "../../components/common/Card";
import { FileText, User, CheckCircle2, XCircle } from "lucide-react";

// Mock de CVs para mostrar en la tabla (puedes reemplazar por tu data real)
const mockCVs = [
  {
    id: 1,
    nombre: "Juan Pérez",
    email: "juan.perez@correo.com",
    estado: "Aprobado",
    fecha: "2024-05-20",
  },
  {
    id: 2,
    nombre: "Ana García",
    email: "ana.garcia@correo.com",
    estado: "Pendiente",
    fecha: "2024-05-19",
  },
];

const GestionCV = () => {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 text-center">
        Gestión de Currículums Vitae
      </h1>
      <Card>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Fecha
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockCVs.map((cv, idx) => (
              <tr key={cv.id}>
                <td className="px-6 py-4 whitespace-nowrap">{idx + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" /> {cv.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{cv.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {cv.estado === "Aprobado" ? (
                    <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded">
                      <CheckCircle2 className="w-4 h-4 mr-1" /> {cv.estado}
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                      <XCircle className="w-4 h-4 mr-1" /> {cv.estado}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{cv.fecha}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                    <FileText className="w-4 h-4 mr-1" /> Ver CV
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default GestionCV;
