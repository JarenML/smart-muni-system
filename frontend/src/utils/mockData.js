// mockData.js — Datos simulados y constantes para selects, pruebas y validaciones

// ==========================
// OPCIONES ESTÁTICAS (Selects)
// ==========================

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

export const jobPositions = [
  { value: "developer", label: "Desarrollador" },
  { value: "analyst", label: "Analista" },
  { value: "designer", label: "Diseñador" },
  { value: "manager", label: "Gerente" },
  { value: "intern", label: "Practicante" },
];

// ==========================
// FUNCIONES DE ACCESO (Getters por valor)
// ==========================

export const getStatusData = () => statusOptions;
export const getPriorityData = () => priorityOptions;
export const getRequestTypes = () => requestTypes;
export const getJobPositions = () => jobPositions;

export const getStatusByValue = (value) =>
  statusOptions.find((option) => option.value === value) || null;

export const getPriorityByValue = (value) =>
  priorityOptions.find((option) => option.value === value) || null;

export const getRequestTypeByValue = (value) =>
  requestTypes.find((option) => option.value === value) || null;

export const getJobPositionByValue = (value) =>
  jobPositions.find((option) => option.value === value) || null;

// ==========================
// DATOS SIMULADOS (Mock Data)
// ==========================

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
