import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Trash2 } from "lucide-react";

import FormField from "../common/FormField";
import TextArea from "../common/TextArea";
import Select from "../common/Select";
import Button from "../common/Button";
import Card from "../common/Card";

import { requestTypes } from "../../utils/mockData";
import { useNotification } from "../../contexts/NotificationContext";
import { useRequest } from "../../contexts/RequestContext";

import {
  validateRequired,
  validateEmail,
  validatePhone,
  validateMinLength,
  validateFileSize,
} from "../../utils/validators";

const RequestForm = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const { addRequest } = useRequest();

  // Form state
  const [form, setForm] = useState({
    title: "",
    type: "",
    description: "",
    citizenName: "",
    citizenEmail: "",
    citizenPhone: "",
    priority: "medium",
  });

  // Documents state
  const [documents, setDocuments] = useState([]);

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

    // Revoke object URL to prevent memory leaks
    URL.revokeObjectURL(newDocuments[index].url);

    newDocuments.splice(index, 1);
    setDocuments(newDocuments);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Validate required fields
    const requiredFields = {
      title: "Título",
      type: "Tipo de trámite",
      description: "Descripción",
      citizenName: "Nombre del ciudadano",
      citizenEmail: "Correo electrónico",
      citizenPhone: "Teléfono",
    };

    Object.entries(requiredFields).forEach(([field, label]) => {
      const validation = validateRequired(form[field], label);
      if (validation !== true) {
        newErrors[field] = validation;
      }
    });

    // Validate email
    if (form.citizenEmail && !newErrors.citizenEmail) {
      const emailValidation = validateEmail(form.citizenEmail);
      if (emailValidation !== true) {
        newErrors.citizenEmail = emailValidation;
      }
    }

    // Validate phone
    if (form.citizenPhone && !newErrors.citizenPhone) {
      const phoneValidation = validatePhone(form.citizenPhone);
      if (phoneValidation !== true) {
        newErrors.citizenPhone = phoneValidation;
      }
    }

    // Validate description length
    if (form.description && !newErrors.description) {
      const descValidation = validateMinLength(
        form.description,
        10,
        "La descripción"
      );
      if (descValidation !== true) {
        newErrors.description = descValidation;
      }
    }

    // Check documents for errors
    const hasDocumentErrors = documents.some((doc) => doc.error);
    if (hasDocumentErrors) {
      newErrors.documents =
        "Uno o más documentos no cumplen con los requisitos de tamaño";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      addNotification(
        "Por favor, corrige los errores en el formulario",
        "error"
      );
      return;
    }

    try {
      // Prepare documents data
      const documentsData = documents.map((doc) => ({
        name: doc.name,
        url: doc.url, // In a real app, this would be the uploaded file URL
        uploadedAt: doc.uploadedAt,
      }));

      // Create new request
      const newRequest = {
        ...form,
        documents: documentsData,
      };

      const createdRequest = addRequest(newRequest);

      addNotification("Trámite creado correctamente", "success");
      navigate(`/tramites/${createdRequest.id}`);
    } catch (error) {
      addNotification("Error al crear el trámite", "error");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Información del Trámite">
            <FormField
              label="Título del Trámite"
              id="title"
              value={form.title}
              onChange={handleChange}
              error={errors.title}
              required
              placeholder="Ej. Licencia de Funcionamiento para Restaurante"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Tipo de Trámite"
                id="type"
                value={form.type}
                onChange={handleChange}
                error={errors.type}
                required
                options={requestTypes.map((type) => ({
                  value: type,
                  label: type,
                }))}
                placeholder="Seleccione el tipo de trámite"
              />

              <Select
                label="Prioridad"
                id="priority"
                value={form.priority}
                onChange={handleChange}
                options={[
                  { value: "low", label: "Baja" },
                  { value: "medium", label: "Media" },
                  { value: "high", label: "Alta" },
                ]}
              />
            </div>

            <TextArea
              label="Descripción del Trámite"
              id="description"
              value={form.description}
              onChange={handleChange}
              error={errors.description}
              required
              placeholder="Describa el propósito y detalles del trámite"
              rows={5}
            />
          </Card>

          <Card title="Documentos Adjuntos">
            <div className="space-y-4">
              {/* Document list */}
              {documents.length > 0 && (
                <ul className="divide-y divide-gray-200">
                  {documents.map((doc, index) => (
                    <li
                      key={index}
                      className="py-3 flex justify-between items-center"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {doc.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(doc.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        {doc.error && (
                          <p className="text-xs text-red-500">{doc.error}</p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveDocument(index)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {/* Upload button */}
              <div className="mt-2">
                <label className="block">
                  <span className="sr-only">Seleccionar archivos</span>
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    onChange={handleDocumentUpload}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    icon={<PlusCircle className="h-5 w-5" />}
                    onClick={() =>
                      document.querySelector('input[type="file"]').click()
                    }
                  >
                    Adjuntar Documentos
                  </Button>
                </label>
                {errors.documents && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.documents}
                  </p>
                )}
              </div>

              <p className="text-xs text-gray-500">
                Formatos permitidos: PDF, JPG, PNG. Tamaño máximo: 10MB por
                archivo.
              </p>
            </div>
          </Card>
        </div>

        {/* Citizen Information */}
        <div className="lg:col-span-1">
          <Card title="Información del Ciudadano">
            <FormField
              label="Nombre Completo"
              id="citizenName"
              value={form.citizenName}
              onChange={handleChange}
              error={errors.citizenName}
              required
              placeholder="Nombre completo del ciudadano"
            />

            <FormField
              label="Correo Electrónico"
              id="citizenEmail"
              type="email"
              value={form.citizenEmail}
              onChange={handleChange}
              error={errors.citizenEmail}
              required
              placeholder="correo@ejemplo.com"
            />

            <FormField
              label="Teléfono"
              id="citizenPhone"
              value={form.citizenPhone}
              onChange={handleChange}
              error={errors.citizenPhone}
              required
              placeholder="9XXXXXXXX"
              helper="Formato: 9XXXXXXXX (9 dígitos)"
            />
          </Card>

          <div className="mt-6 space-y-4">
            <Button type="submit" variant="primary" fullWidth>
              Crear Trámite
            </Button>

            <Button
              type="button"
              variant="outline"
              fullWidth
              onClick={() => navigate("/tramites")}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RequestForm;
