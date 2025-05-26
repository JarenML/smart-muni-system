// mockData.js - Archivo base generado
// Puedes editar esto con datos reales después
export const statusOptions = [
  { value: "pending", label: "Pendiente" },
  { value: "approved", label: "Aprobado" },
  { value: "rejected", label: "Rechazado" },
];

export const priorityOptions = [
  { value: "low", label: "Baja" },
  { value: "medium", label: "Media" },
  { value: "high", label: "Alta" },
];

export const requestTypes = [
  { value: "document", label: "Documento" },
  { value: "certificate", label: "Certificado" },
];

export const mockRequests = [
  {
    id: 1,
    name: "Solicitud de DNI",
    status: "pending",
    priority: "high",
    type: "document",
    date: "2024-05-20",
  },
  {
    id: 2,
    name: "Certificado de residencia",
    status: "approved",
    priority: "medium",
    type: "certificate",
    date: "2024-05-18",
  },
];

// Agregado: Mock de resumes para que el frontend funcione
export const mockResumes = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan@example.com",
    phone: "123456789",
    education: "Licenciado en Administración",
    experience: "5 años en sector público",
    status: "pending",
    date: "2024-05-19",
  },
  {
    id: 2,
    name: "Ana García",
    email: "ana@example.com",
    phone: "987654321",
    education: "Ingeniera de Sistemas",
    experience: "3 años en desarrollo de software",
    status: "approved",
    date: "2024-05-18",
  },
];
