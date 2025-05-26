import React from "react";
import { FileText, Download, Eye } from "lucide-react";
import { formatDateTime } from "../../utils/formatters";

const RequestDocuments = ({ documents }) => {
  if (!documents || documents.length === 0) {
    return (
      <div className="py-4 text-center text-gray-500">
        No hay documentos adjuntos a este trámite.
      </div>
    );
  }

  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();

    switch (extension) {
      case "pdf":
        return <FileText className="h-8 w-8 text-red-500" />;
      case "doc":
      case "docx":
        return <FileText className="h-8 w-8 text-blue-500" />;
      case "xls":
      case "xlsx":
        return <FileText className="h-8 w-8 text-green-500" />;
      case "jpg":
      case "jpeg":
      case "png":
        return <FileText className="h-8 w-8 text-purple-500" />;
      default:
        return <FileText className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <ul className="divide-y divide-gray-200">
      {documents.map((doc, index) => (
        <li key={index} className="py-4 flex items-center">
          <div className="flex-shrink-0">{getFileIcon(doc.name)}</div>
          <div className="ml-4 flex-1">
            <div className="font-medium text-gray-900">{doc.name}</div>
            <div className="text-sm text-gray-500">
              Subido el {formatDateTime(doc.uploadedAt)}
            </div>
          </div>
          <div className="ml-4 flex space-x-2">
            <button
              type="button"
              className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50"
              title="Ver documento"
              onClick={() => window.open(doc.url, "_blank")}
            >
              <Eye className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50"
              title="Descargar documento"
              onClick={() => window.open(doc.url, "_blank")}
            >
              <Download className="h-5 w-5" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RequestDocuments;
