import React from "react";
import { FileX } from "lucide-react";
import Button from "./Button";

const EmptyState = ({
  title = "No hay datos disponibles",
  description = "No se encontraron registros que coincidan con tu búsqueda.",
  icon = <FileX className="h-12 w-12 text-gray-400" />,
  actionText,
  onAction,
}) => {
  return (
    <div className="text-center py-12 px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow">
      <div className="flex justify-center">{icon}</div>
      <h3 className="mt-2 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>

      {actionText && onAction && (
        <div className="mt-6">
          <Button onClick={onAction} variant="primary">
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
