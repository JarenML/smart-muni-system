import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  FileText,
  Brain,
  Mail,
  Phone,
  Building,
  GraduationCap,
  CheckCircle2,
  XCircle,
  Download,
} from "lucide-react";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import StatusBadge from "../../components/common/StatusBadge";
import Modal from "../../components/common/Modal";
import Loading from "../../components/common/Loading";

import { useResume } from "../../contexts/ResumeContext";
import { useNotification } from "../../contexts/NotificationContext";
import { formatDate } from "../../utils/formatters";
import { statusOptions } from "../../utils/mockData";

const ResumeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getResume, updateResumeStatus } = useResume();
  const { addNotification } = useNotification();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [statusComment, setStatusComment] = useState("");

  useEffect(() => {
    if (id) {
      const resumeData = getResume(id);
      setResume(resumeData);
      setLoading(false);

      if (!resumeData) {
        addNotification("Currículum no encontrado", "error");
        navigate("/curriculos");
      }
    }
  }, [id, getResume, navigate, addNotification]);

  const handleStatusUpdate = () => {
    if (!newStatus) {
      addNotification("Seleccione un estado", "error");
      return;
    }

    try {
      updateResumeStatus(id, newStatus, statusComment);
      setResume(getResume(id));
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

  // Function to get color based on AI score
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return "bg-green-50";
    if (score >= 60) return "bg-blue-50";
    if (score >= 40) return "bg-yellow-50";
    return "bg-red-50";
  };

  if (loading) {
    return <Loading fullPage text="Cargando detalles del currículum..." />;
  }

  if (!resume) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">Currículum no encontrado</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => navigate("/curriculos")}
        >
          Volver a Currículos
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
            onClick={() => navigate("/curriculos")}
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-2"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Volver a Currículos
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{resume.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <StatusBadge status={resume.status} />
            <span className="text-sm text-gray-500">
              Postulando para:{" "}
              <span className="font-medium">{resume.position}</span>
            </span>
            <span className="text-sm text-gray-500">
              Recibido el {formatDate(resume.createdAt)}
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Personal Information */}
        <Card title="Información Personal" className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-500">
                  Nombre Completo
                </h3>
                <p className="text-sm text-gray-900">{resume.name}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-500">
                  Correo Electrónico
                </h3>
                <p className="text-sm text-gray-900">
                  <a
                    href={`mailto:${resume.email}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {resume.email}
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-500">Teléfono</h3>
                <p className="text-sm text-gray-900">
                  <a
                    href={`tel:${resume.phone}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {resume.phone}
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Building className="h-5 w-5 text-gray-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-500">
                  Experiencia
                </h3>
                <p className="text-sm text-gray-900">
                  {resume.experience} años
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-500">Puesto</h3>
                <p className="text-sm text-gray-900">{resume.position}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <GraduationCap className="h-5 w-5 text-gray-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-500">Educación</h3>
                <p className="text-sm text-gray-900">{resume.education}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* AI Evaluation */}
        <Card
          title="Evaluación IA"
          className={`border-l-4 ${getScoreBgColor(
            resume.aiScore
          )} border-${getScoreColor(resume.aiScore).replace("text-", "")}`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">
                Puntuación de IA
              </span>
              <span
                className={`text-lg font-bold ${getScoreColor(resume.aiScore)}`}
              >
                {resume.aiScore}%
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${getScoreColor(
                  resume.aiScore
                ).replace("text", "bg")}`}
                style={{ width: `${resume.aiScore}%` }}
              ></div>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                <div className="flex items-center">
                  <Brain className="h-4 w-4 mr-1 text-blue-500" />
                  Recomendación de IA
                </div>
              </h3>
              <p className="text-sm text-gray-900 bg-blue-50 p-3 rounded-md border border-blue-100">
                {resume.aiRecommendation}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Resume and Documents */}
      <Card title="Documentos del Candidato">
        <div className="space-y-4">
          {/* Resume file */}
          <div className="border rounded-md p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-blue-50 rounded-md text-blue-600 mr-3">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Currículum Vitae
                  </h3>
                  <p className="text-xs text-gray-500">
                    {resume.resumeFile.name}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                icon={<Download className="h-4 w-4" />}
                onClick={() => window.open(resume.resumeFile.url, "_blank")}
              >
                Descargar
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Status Change Modal */}
      <Modal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        title="Cambiar Estado del Currículum"
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
        </div>
      </Modal>
    </div>
  );
};

export default ResumeDetail;
