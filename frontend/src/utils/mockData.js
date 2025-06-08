// mockData.js — Datos simulados y constantes para selects, pruebas y validaciones

// ==========================
// OPCIONES ESTÁTICAS (Selects) - Actualizadas para coincidir con el backend
// ==========================

// Estados de trámites según la base de datos
export const statusOptions = [
  { value: "recibido", label: "Recibido" },
  { value: "en_revision", label: "En Revisión" },
  { value: "observado", label: "Observado" },
  { value: "resuelto", label: "Resuelto" },
  { value: "rechazado", label: "Rechazado" },
];

// Prioridades según la base de datos
export const priorityOptions = [
  { value: "baja", label: "Baja" },
  { value: "media", label: "Media" },
  { value: "alta", label: "Alta" },
];

// Tipos de trámites según el CHECK constraint de la base de datos
export const requestTypes = [
  { value: "Licencia de Funcionamiento", label: "Licencia de Funcionamiento" },
  { value: "Permiso de Construcción", label: "Permiso de Construcción" },
  { value: "Solicitud de Reclamo", label: "Solicitud de Reclamo" },
  { value: "Certificado Domiciliario", label: "Certificado Domiciliario" },
  { value: "Registro de Empresa", label: "Registro de Empresa" },
  { value: "Inscripción en Padrón", label: "Inscripción en Padrón" },
  { value: "Autorización de Evento", label: "Autorización de Evento" },
  { value: "Reclamo de Servicio Público", label: "Reclamo de Servicio Público" },
  { value: "Solicitud de Subsidio", label: "Solicitud de Subsidio" },
  { value: "Otros", label: "Otros" },
];

// Roles de usuario según la base de datos
export const userRoles = [
  { value: "ciudadano", label: "Ciudadano" },
  { value: "admin", label: "Administrador" },
];

// Estados de currículos según la base de datos
export const resumeStatusOptions = [
  { value: "recibido", label: "Recibido" },
  { value: "en_proceso", label: "En Proceso" },
  { value: "aceptado", label: "Aceptado" },
  { value: "rechazado", label: "Rechazado" },
];

// Posiciones de trabajo (puedes expandir según necesites)
export const jobPositions = [
  { value: "Desarrollador Full Stack", label: "Desarrollador Full Stack" },
  { value: "Analista de Sistemas", label: "Analista de Sistemas" },
  { value: "Diseñador UX/UI", label: "Diseñador UX/UI" },
  { value: "Gerente de Proyecto", label: "Gerente de Proyecto" },
  { value: "Practicante", label: "Practicante" },
  { value: "Administrador de Base de Datos", label: "Administrador de Base de Datos" },
  { value: "Especialista en Ciberseguridad", label: "Especialista en Ciberseguridad" },
  { value: "Coordinador de TI", label: "Coordinador de TI" },
];

// Niveles de educación
export const educationLevels = [
  { value: "Secundaria", label: "Secundaria Completa" },
  { value: "Técnico", label: "Técnico" },
  { value: "Universitario", label: "Universitario" },
  { value: "Bachiller", label: "Bachiller" },
  { value: "Titulado", label: "Titulado" },
  { value: "Maestría", label: "Maestría" },
  { value: "Doctorado", label: "Doctorado" },
];

// ==========================
// FUNCIONES DE ACCESO (Getters por valor)
// ==========================

export const getStatusData = () => statusOptions;
export const getPriorityData = () => priorityOptions;
export const getRequestTypes = () => requestTypes;
export const getJobPositions = () => jobPositions;
export const getUserRoles = () => userRoles;
export const getResumeStatusOptions = () => resumeStatusOptions;
export const getEducationLevels = () => educationLevels;

export const getStatusByValue = (value) =>
  statusOptions.find((option) => option.value === value) || null;

export const getPriorityByValue = (value) =>
  priorityOptions.find((option) => option.value === value) || null;

export const getRequestTypeByValue = (value) =>
  requestTypes.find((option) => option.value === value) || null;

export const getJobPositionByValue = (value) =>
  jobPositions.find((option) => option.value === value) || null;

export const getUserRoleByValue = (value) =>
  userRoles.find((option) => option.value === value) || null;

export const getResumeStatusByValue = (value) =>
  resumeStatusOptions.find((option) => option.value === value) || null;

export const getEducationLevelByValue = (value) =>
  educationLevels.find((option) => option.value === value) || null;

// ==========================
// UTILIDADES DE MAPEO
// ==========================

// Para mostrar etiquetas amigables en la UI
export const getStatusLabel = (value) => getStatusByValue(value)?.label || value;
export const getPriorityLabel = (value) => getPriorityByValue(value)?.label || value;
export const getRequestTypeLabel = (value) => getRequestTypeByValue(value)?.label || value;
export const getUserRoleLabel = (value) => getUserRoleByValue(value)?.label || value;

// Para validar si un valor es válido
export const isValidStatus = (value) => statusOptions.some(option => option.value === value);
export const isValidPriority = (value) => priorityOptions.some(option => option.value === value);
export const isValidRequestType = (value) => requestTypes.some(option => option.value === value);
export const isValidUserRole = (value) => userRoles.some(option => option.value === value);

// ==========================
// DATOS SIMULADOS (Mock Data) - Actualizados
// ==========================

export const mockRequests = [
  {
    id: 1,
    titulo: "Licencia de Funcionamiento para Restaurante",
    estado: "recibido",
    prioridad: "alta",
    tipo_detectado: "Licencia de Funcionamiento",
    descripcion: "Solicitud de licencia para apertura de restaurante en zona comercial",
    creado_en: "2024-05-20",
    ciudadano: "Juan Pérez",
    email: "juan@example.com",
  },
  {
    id: 2,
    titulo: "Certificado Domiciliario",
    estado: "resuelto",
    prioridad: "media",
    tipo_detectado: "Certificado Domiciliario",
    descripcion: "Certificado de residencia para trámites bancarios",
    creado_en: "2024-05-18",
    ciudadano: "María García",
    email: "maria@example.com",
  },
  {
    id: 3,
    titulo: "Permiso de Construcción",
    estado: "en_revision",
    prioridad: "alta",
    tipo_detectado: "Permiso de Construcción",
    descripcion: "Permiso para construcción de vivienda unifamiliar",
    creado_en: "2024-05-19",
    ciudadano: "Carlos López",
    email: "carlos@example.com",
  },
];

export const mockResumes = [
  {
    id: 1,
    nombre: "Juan Pérez",
    email: "juan.developer@example.com",
    telefono: "987654321",
    cargo_postula: "Desarrollador Full Stack",
    anios_experiencia: 5,
    educacion: "Universitario",
    estado: "recibido",
    puntaje_ia: null,
    evaluacion_ia: null,
    creado_en: "2024-05-19",
  },
  {
    id: 2,
    nombre: "Ana García",
    email: "ana.systems@example.com",
    telefono: "987654322",
    cargo_postula: "Analista de Sistemas",
    anios_experiencia: 3,
    educacion: "Titulado",
    estado: "aceptado",
    puntaje_ia: 85,
    evaluacion_ia: "Excelente perfil técnico con experiencia relevante",
    creado_en: "2024-05-18",
  },
  {
    id: 3,
    nombre: "Carlos Mendoza",
    email: "carlos.designer@example.com",
    telefono: "987654323",
    cargo_postula: "Diseñador UX/UI",
    anios_experiencia: 2,
    educacion: "Bachiller",
    estado: "en_proceso",
    puntaje_ia: 78,
    evaluacion_ia: "Buen potencial creativo, requiere más experiencia",
    creado_en: "2024-05-17",
  },
];

// ==========================
// CONFIGURACIÓN DE ARCHIVOS
// ==========================

export const allowedFileTypes = {
  documents: ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'],
  resumes: ['.pdf', '.doc', '.docx'],
  images: ['.jpg', '.jpeg', '.png', '.gif', '.webp']
};

export const maxFileSizes = {
  document: 10 * 1024 * 1024, // 10MB
  resume: 5 * 1024 * 1024,    // 5MB
  image: 2 * 1024 * 1024      // 2MB
};

// ==========================
// MENSAJES Y CONSTANTES
// ==========================

export const successMessages = {
  tramiteCreated: "Trámite creado correctamente",
  tramiteUpdated: "Trámite actualizado correctamente",
  resumeUploaded: "Currículum subido correctamente",
  documentUploaded: "Documento subido correctamente",
};

export const errorMessages = {
  networkError: "Error de conexión. Verifique su conexión a internet",
  serverError: "Error del servidor. Intente nuevamente más tarde",
  fileSize: "El archivo excede el tamaño máximo permitido",
  fileType: "Tipo de archivo no permitido",
  required: "Este campo es obligatorio",
};