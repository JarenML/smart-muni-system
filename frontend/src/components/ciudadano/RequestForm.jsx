import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Trash2 } from "lucide-react";

import FormField from "../common/FormField";
import TextArea from "../common/TextArea";
import Select from "../common/Select";
import Button from "../common/Button";
import Card from "../common/Card";

// Importar datos actualizados
import { requestTypes, priorityOptions, successMessages, errorMessages } from "../../utils/mockData";
import { useNotification } from "../../contexts/NotificationContext";
import { tramiteService } from "../../services/api/tramiteService";

import {
  validateRequired,
  validateMinLength,
  validateFileSize,
} from "../../utils/validators";

const RequestForm = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  // Form state - nombres que coinciden con el backend
  const [form, setForm] = useState({
    titulo: "",
    tipo_detectado: "",
    descripcion: "",
    prioridad: "media", // valor por defecto
  });

  // Documents state
  const [documents, setDocuments] = useState([]);
  
  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation errors state
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  // Handle document upload
  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);

    // Validate files
    const validatedFiles = files.map((file) => {
      const sizeValidation = validateFileSize(file, 10); // 10MB max

      return {
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
        uploadedAt: new Date().toISOString(),
        error: sizeValidation !== true ? sizeValidation : null,
      };
    });

    setDocuments([...documents, ...validatedFiles]);
  };

  // Remove document
  const handleRemoveDocument = (index) => {
    const newDocuments = [...documents];
    URL.revokeObjectURL(newDocuments[index].url);
    newDocuments.splice(index, 1);
    setDocuments(newDocuments);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Validate required fields
    const requiredFields = {
      titulo: "Título",
      tipo_detectado: "Tipo de trámite",
      descripcion: "Descripción",
    };

    Object.entries(requiredFields).forEach(([field, label]) => {
      const validation = validateRequired(form[field], label);
      if (validation !== true) {
        newErrors[field] = validation;
      }
    });

    // Validate description length
    if (form.descripcion && !newErrors.descripcion) {
      const descValidation = validateMinLength(
        form.descripcion,
        10,
        "La descripción"
      );
      if (descValidation !== true) {
        newErrors.descripcion = descValidation;
      }
    }

    // Check documents for errors
    const hasDocumentErrors = documents.some((doc) => doc.error);
    if (hasDocumentErrors) {
      newErrors.documents = errorMessages.fileSize;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      addNotification(
        "Por favor, corrige los errores en el formulario",
        "error"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Crear el trámite
      const tramiteData = {
        titulo: form.titulo,
        descripcion: form.descripcion,
        tipo_detectado: form.tipo_detectado,
        prioridad: form.prioridad,
        // user_id se agregará automáticamente en el backend usando el token de auth
      };

      console.log('Enviando datos del trámite:', tramiteData);

      const createdTramite = await tramiteService.createTramite(tramiteData);

      // Si hay documentos, subirlos
      if (documents.length > 0 && documents.every(doc => !doc.error)) {
        const files = documents.map(doc => doc.file);
        await tramiteService.uploadDocuments(createdTramite.id, files);
      }

      addNotification(successMessages.tramiteCreated, "success");
      navigate(`/ciudadano/tramites/${createdTramite.id}`);
      
    } catch (error) {
      console.error('Error al crear trámite:', error);
      
      // Manejo de errores más específico
      let errorMessage = errorMessages.serverError;
      
      if (error.message.includes('404')) {
        errorMessage = "Endpoint no encontrado. Verifique que el servidor esté corriendo";
      } else if (error.message.includes('500')) {
        errorMessage = "Error interno del servidor";
      } else if (error.message.includes('400')) {
        errorMessage = "Datos inválidos enviados al servidor";
      } else if (error.message.includes('fetch')) {
        errorMessage = errorMessages.networkError;
      }
      
      addNotification(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Crear Nuevo Trámite</h1>
        <p className="text-gray-600 mt-2">
          Complete la información requerida para crear su solicitud
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card title="Información del Trámite">
              <div className="space-y-4">
                <FormField
                  label="Título del Trámite"
                  id="titulo"
                  name="titulo"
                  value={form.titulo}
                  onChange={handleChange}
                  error={errors.titulo}
                  required
                  placeholder="Ej. Licencia de Funcionamiento para Restaurante"
                  disabled={isSubmitting}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Tipo de Trámite"
                    id="tipo_detectado"
                    name="tipo_detectado"
                    value={form.tipo_detectado}
                    onChange={handleChange}
                    error={errors.tipo_detectado}
                    required
                    options={requestTypes}
                    placeholder="Seleccione el tipo de trámite"
                    disabled={isSubmitting}
                  />

                  <Select
                    label="Prioridad"
                    id="prioridad"
                    name="prioridad"
                    value={form.prioridad}
                    onChange={handleChange}
                    options={priorityOptions}
                    disabled={isSubmitting}
                  />
                </div>

                <TextArea
                  label="Descripción del Trámite"
                  id="descripcion"
                  name="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                  error={errors.descripcion}
                  required
                  placeholder="Describa el propósito y detalles del trámite"
                  rows={5}
                  disabled={isSubmitting}
                />
              </div>
            </Card>

            <Card title="Documentos Adjuntos">
              <div className="space-y-4">
                {/* Document list */}
                {documents.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">
                      Archivos seleccionados ({documents.length})
                    </h4>
                    <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg">
                      {documents.map((doc, index) => (
                        <li
                          key={index}
                          className="p-3 flex justify-between items-center hover:bg-gray-50"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {doc.name}
                            </p>
                            <div className="flex items-center space-x-2">
                              <p className="text-xs text-gray-500">
                                {(doc.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                              <span className="text-xs text-gray-400">•</span>
                              <p className="text-xs text-gray-500">
                                {doc.type}
                              </p>
                            </div>
                            {doc.error && (
                              <p className="text-xs text-red-500 mt-1">{doc.error}</p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveDocument(index)}
                            className="ml-3 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                            disabled={isSubmitting}
                            title="Eliminar archivo"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Upload button */}
                <div className="mt-4">
                  <label className="block">
                    <span className="sr-only">Seleccionar archivos</span>
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleDocumentUpload}
                      disabled={isSubmitting}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      icon={<PlusCircle className="h-5 w-5" />}
                      disabled={isSubmitting}
                      onClick={() =>
                        document.querySelector('input[type="file"]').click()
                      }
                    >
                      {documents.length === 0 ? "Adjuntar Documentos" : "Agregar Más Documentos"}
                    </Button>
                  </label>
                  {errors.documents && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.documents}
                    </p>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-800">
                    <strong>Formatos permitidos:</strong> PDF, DOC, DOCX, JPG, PNG
                    <br />
                    <strong>Tamaño máximo:</strong> 10MB por archivo
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Actions Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <Card title="Acciones">
                <div className="space-y-4">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    fullWidth
                    disabled={isSubmitting}
                    className="relative"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creando...
                      </div>
                    ) : (
                      "Crear Trámite"
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    fullWidth
                    onClick={() => navigate("/ciudadano/tramites")}
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </Button>
                </div>
              </Card>

              {/* Info Panel */}
              <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  💡 Consejos
                </h3>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Sea específico en el título del trámite</li>
                  <li>• Incluya toda la información relevante en la descripción</li>
                  <li>• Adjunte todos los documentos necesarios</li>
                  <li>• Verifique que los archivos sean legibles</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RequestForm;