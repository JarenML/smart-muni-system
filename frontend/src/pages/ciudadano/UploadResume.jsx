import React from "react";
import ResumeForm from "../../components/ciudadano/ResumeForm";

const UploadResume = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Subir Nuevo Currículum
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Complete el formulario para subir un currículum al sistema de
          selección con IA
        </p>
      </div>

      <ResumeForm />
    </div>
  );
};

export default UploadResume;
