import React from "react";
import { Link } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";
import Button from "../../components/common/Button";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
      <div className="p-6 rounded-full bg-red-100 mb-8">
        <AlertTriangle className="h-16 w-16 text-red-600" />
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Página no encontrada
      </h1>

      <p className="text-lg text-gray-600 max-w-md mb-8">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>

      <Link to="/">
        <Button variant="primary" icon={<Home className="h-5 w-5" />}>
          Volver al Inicio
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
