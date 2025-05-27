import React from "react";
import RequestForm from "../../components/ciudadano/RequestForm"; // ✅ Ruta corregida

const CreateRequest = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Crear Nuevo Trámite
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Complete el formulario para registrar un nuevo trámite en el sistema
        </p>
      </div>

      <RequestForm />
    </div>
  );
};

export default CreateRequest;
