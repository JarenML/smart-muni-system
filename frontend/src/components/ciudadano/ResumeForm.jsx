import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Trash2 } from "lucide-react";

import FormField from "../common/FormField";
import Select from "../common/Select";
import Button from "../common/Button";
import Card from "../common/Card";

import { jobPositions } from "../../utils/mockData";
import { useNotification } from "../../contexts/NotificationContext";
import { useResume } from "../../contexts/ResumeContext";

import {
  validateRequired,
  validateEmail,
  validatePhone,
  validateFileType,
  validateFileSize,
} from "../../utils/validators";

const ResumeForm = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const { addResume } = useResume();

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    education: "",
  });

  // Resume file state
  const [resumeFile, setResumeFile] = useState(null);

  // Additional documents state
  const [additionalDocs, setAdditionalDocs] = useState([]);

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

  // Handle resume file upload
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    const typeValidation = validateFileType(file, [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]);
    const sizeValidation = validateFileSize(file, 5); // 5MB max

    if (typeValidation !== true) {
      setErrors({ ...errors, resumeFile: typeValidation });
      return;
    }

    if (sizeValidation !== true) {
      setErrors({ ...errors, resumeFile: sizeValidation });
      return;
    }

    setResumeFile({
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
    });

    // Clear error
    if (errors.resumeFile) {
      setErrors({ ...errors, resumeFile: null });
    }
  };

  // Handle additional documents upload
  const handleAdditionalDocsUpload = (e) => {
    const files = Array.from(e.target.files);

    // Validate files
    const validatedFiles = files.map((file) => {
      const typeValidation = validateFileType(file, [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/jpeg",
        "image/png",
      ]);

      const sizeValidation = validateFileSize(file, 5); // 5MB max

      return {
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
        error:
          typeValidation !== true
            ? typeValidation
            : sizeValidation !== true
            ? sizeValidation
            : null,
      };
    });

    setAdditionalDocs([...additionalDocs, ...validatedFiles]);
  };

  // Remove additional document
  const handleRemoveAdditionalDoc = (index) => {
    const newDocs = [...additionalDocs];

    // Revoke object URL to prevent memory leaks
    URL.revokeObjectURL(newDocs[index].url);

    newDocs.splice(index, 1);
    setAdditionalDocs(newDocs);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Validate required fields
    const requiredFields = {
      name: "Nombre completo",
      email: "Correo electrónico",
      phone: "Teléfono",
      position: "Puesto",
      experience: "Años de experiencia",
      education: "Educación",
    };

    Object.entries(requiredFields).forEach(([field, label]) => {
      const validation = validateRequired(form[field], label);
      if (validation !== true) {
        newErrors[field] = validation;
      }
    });

    // Validate email
    if (form.email && !newErrors.email) {
      const emailValidation = validateEmail(form.email);
      if (emailValidation !== true) {
        newErrors.email = emailValidation;
      }
    }

    // Validate phone
    if (form.phone && !newErrors.phone) {
      const phoneValidation = validatePhone(form.phone);
      if (phoneValidation !== true) {
        newErrors.phone = phoneValidation;
      }
    }

    // Validate resume file
    if (!resumeFile) {
      newErrors.resumeFile = "El currículum es obligatorio";
    }

    // Check additional documents for errors
    const hasDocErrors = additionalDocs.some((doc) => doc.error);
    if (hasDocErrors) {
      newErrors.additionalDocs =
        "Uno o más documentos no cumplen con los requisitos";
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
      // Prepare resume data
      const newResume = {
        ...form,
        experience: parseInt(form.experience, 10) || 0,
        resumeFile: {
          name: resumeFile.name,
          url: resumeFile.url, // In a real app, this would be the uploaded file URL
        },
        additionalDocs: additionalDocs.map((doc) => ({
          name: doc.name,
          url: doc.url, // In a real app, this would be the uploaded file URL
        })),
      };

      const createdResume = addResume(newResume);

      addNotification("Currículum subido correctamente", "success");
      navigate(`/curriculos/${createdResume.id}`);
    } catch (error) {
      addNotification("Error al subir el currículum", "error");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card title="Información Personal">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Nombre Completo"
            id="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            required
            placeholder="Nombre completo del candidato"
          />

          <FormField
            label="Correo Electrónico"
            id="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            required
            placeholder="correo@ejemplo.com"
          />

          <FormField
            label="Teléfono"
            id="phone"
            value={form.phone}
            onChange={handleChange}
            error={errors.phone}
            required
            placeholder="9XXXXXXXX"
            helper="Formato: 9XXXXXXXX (9 dígitos)"
          />

          <Select
            label="Puesto al que Postula"
            id="position"
            value={form.position}
            onChange={handleChange}
            error={errors.position}
            required
            options={jobPositions}
            placeholder="Seleccione el puesto"
          />

          <FormField
            label="Años de Experiencia"
            id="experience"
            type="number"
            value={form.experience}
            onChange={handleChange}
            error={errors.experience}
            required
            min="0"
            max="50"
          />

          <FormField
            label="Educación"
            id="education"
            value={form.education}
            onChange={handleChange}
            error={errors.education}
            required
            placeholder="Universidad o Institución Educativa"
          />
        </div>
      </Card>

      <Card title="Currículum Vitae">
        <div className="space-y-4">
          {/* Resume file section */}
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
            {resumeFile ? (
              <div className="w-full">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-50 rounded-md text-blue-600 mr-3">
                      <Upload className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {resumeFile.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      URL.revokeObjectURL(resumeFile.url);
                      setResumeFile(null);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="p-3 rounded-full bg-blue-50 text-blue-600 mb-3">
                  <Upload className="h-8 w-8" />
                </div>
                <p className="text-sm font-medium text-gray-900 mb-1">
                  Arrastra o haz clic para subir tu CV
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  PDF, DOC, DOCX (máx. 5MB)
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("resume-file").click()}
                >
                  Seleccionar archivo
                </Button>
              </>
            )}
            <input
              id="resume-file"
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
            />
          </div>

          {errors.resumeFile && (
            <p className="mt-1 text-xs text-red-600">{errors.resumeFile}</p>
          )}
        </div>
      </Card>

      <div className="flex space-x-4 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/curriculos")}
        >
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          Subir Currículum
        </Button>
      </div>
    </form>
  );
};

export default ResumeForm;
