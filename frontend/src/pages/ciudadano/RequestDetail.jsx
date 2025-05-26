import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ClipboardList,
  FileText,
  History,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from "lucide-react";

// CORRIGE ESTOS DOS:
import RequestDocuments from "../../components/admin/RequestDocuments";
import RequestHistory from "../../components/admin/RequestHistory";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import StatusBadge from "../../components/common/StatusBadge";
import Tabs from "../../components/common/Tabs";
import Modal from "../../components/common/Modal";
import Loading from "../../components/common/Loading";

import { useRequest } from "../../contexts/RequestContext";
import { useNotification } from "../../contexts/NotificationContext";
import { formatDate, formatDateTime } from "../../utils/formatters";
import { statusOptions } from "../../utils/mockData";

const RequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getRequest, updateRequestStatus } = useRequest();
  const { addNotification } = useNotification();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [statusComment, setStatusComment] = useState("");

  useEffect(() => {
    if (id) {
      const requestData = getRequest(id);
      setRequest(requestData);
      setLoading(false);

      if (!requestData) {
        addNotification("Trámite no encontrado", "error");
        navigate("/tramites");
      }
    }
  }, [id, getRequest, navigate, addNotification]);

  const tabs = [
    {
      id: "details",
      label: "Detalles",
      icon: <ClipboardList className="h-4 w-4" />,
    },
    {
      id: "documents",
      label: "Documentos",
      icon: <FileText className="h-4 w-4" />,
      count: request?.documents?.length || 0,
    },
    {
      id: "history",
      label: "Historial",
      icon: <History className="h-4 w-4" />,
      count: request?.history?.length || 0,
    },
  ];

  const handleStatusUpdate = () => {
    if (!newStatus) {
      addNotification("Seleccione un estado", "error");
      return;
    }

    try {
      updateRequestStatus(id, newStatus, statusComment);
      setRequest(getRequest(id));
      setIsStatusModalOpen(false);
      setNewStatus("");
      setStatusComment("");
      addNotification(
        `Estado actualizado a ${
          statusOptions.find((s) => s.value === newStatus)?.label
        }`,
        "success"
      );
    } catch (error) {
      addNotification("Error al actualizar el estado", "error");
      console.error(error);
    }
  };

  if (loading) {
    return <Loading fullPage text="Cargando detalles del trámite..." />;
  }

  if (!request) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">Trámite no encontrado</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => navigate("/tramites")}
        >
          Volver a Trámites
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <button
            onClick={() => navigate("/tramites")}
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-2"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Volver a Trámites
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{request.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <StatusBadge status={request.status} />
            <StatusBadge status={request.priority} type="priority" />
            <span className="text-sm text-gray-500">
              Creado el {formatDate(request.createdAt)}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setNewStatus("");
              setIsStatusModalOpen(true);
            }}
          >
            Cambiar Estado
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "details" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Request Details */}
            <Card title="Detalles del Trámite" className="lg:col-span-2">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Tipo de Trámite
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{request.type}</dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Fecha de Creación
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {formatDateTime(request.createdAt)}
                  </dd>
                </div>

                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">
                    Descripción
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 whitespace-pre-line">
                    {request.description}
                  </dd>
                </div>

                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">
                    Documentos Adjuntos
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {request.documents && request.documents.length > 0 ? (
                      <span
                        className="text-blue-600 cursor-pointer"
                        onClick={() => setActiveTab("documents")}
                      >
                        Ver {request.documents.length} documento(s)
                      </span>
                    ) : (
                      <span className="text-gray-500">
                        No hay documentos adjuntos
                      </span>
                    )}
                  </dd>
                </div>
              </dl>
            </Card>

            {/* Citizen Info */}
            <Card title="Información del Ciudadano">
              <dl className="grid grid-cols-1 gap-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Nombre</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {request.citizenName}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Correo Electrónico
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <a
                      href={`mailto:${request.citizenEmail}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {request.citizenEmail}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Teléfono
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <a
                      href={`tel:${request.citizenPhone}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {request.citizenPhone}
                    </a>
                  </dd>
                </div>
              </dl>
            </Card>
          </div>
        )}

        {activeTab === "documents" && (
          <Card title="Documentos Adjuntos">
            <RequestDocuments documents={request.documents} />
          </Card>
        )}

        {activeTab === "history" && (
          <Card title="Historial del Trámite">
            <RequestHistory history={request.history} />
          </Card>
        )}
      </div>

      {/* Status Change Modal */}
      <Modal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        title="Cambiar Estado del Trámite"
        size="md"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => setIsStatusModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleStatusUpdate}>
              Actualizar Estado
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nuevo Estado
            </label>
            <select
              id="status"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="" disabled>
                Seleccionar estado
              </option>
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Comentario (opcional)
            </label>
            <textarea
              id="comment"
              rows="3"
              value={statusComment}
              onChange={(e) => setStatusComment(e.target.value)}
              placeholder="Añadir un comentario o explicación del cambio de estado"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>

          {newStatus === "rejected" && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Atención</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>
                      Está a punto de rechazar este trámite. Esta acción
                      notificará al ciudadano y puede requerir que éste realice
                      correcciones o presente documentación adicional.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default RequestDetail;
