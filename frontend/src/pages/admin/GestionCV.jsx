import React from "react";
import ResumeTable from "../../components/ciudadano/ResumeTable";
import Card from "../../components/common/Card";

/**
 * Página de administración para gestionar currículums recibidos.
 * Los administradores pueden ver, filtrar y revisar los CVs de los ciudadanos.
 */
const GestionCV = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Gestión de Currículums
        </h1>
        <p className="text-sm text-gray-600">
          Consulta, filtra y gestiona los CVs recibidos por los ciudadanos.
        </p>
      </div>

      <Card title="Listado de CVs">
        <ResumeTable showAdminActions />
      </Card>
    </div>
  );
};

export default GestionCV;
