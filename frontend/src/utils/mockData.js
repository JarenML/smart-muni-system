// Mock data for development and testing

// Request types
export const requestTypes = [
  'Licencia de Funcionamiento',
  'Certificado de Defensa Civil',
  'Permiso de Construcción',
  'Autorización para Eventos',
  'Reclamo por Servicios Públicos',
  'Solicitud de Información',
  'Pago de Arbitrios',
  'Otros',
];

// Resume job positions
export const jobPositions = [
  'Asistente Administrativo',
  'Ingeniero Civil',
  'Arquitecto',
  'Abogado',
  'Contador',
  'Técnico Informático',
  'Asistente Social',
  'Personal de Limpieza',
  'Seguridad',
];

// Mock requests data
export const mockRequests = [
  {
    id: 'req-001',
    title: 'Licencia de Funcionamiento para Restaurante',
    type: 'Licencia de Funcionamiento',
    description: 'Solicitud de licencia para restaurante de comida típica en Av. Principal 123',
    createdAt: '2023-03-15T10:30:00Z',
    status: 'pending',
    priority: 'medium',
    citizenName: 'María López',
    citizenEmail: 'maria@ejemplo.com',
    citizenPhone: '987654321',
    documents: [
      { name: 'DNI.pdf', url: '#', uploadedAt: '2023-03-15T10:30:00Z' },
      { name: 'PlanoLocal.pdf', url: '#', uploadedAt: '2023-03-15T10:30:00Z' },
    ],
    history: [
      {
        date: '2023-03-15T10:30:00Z',
        status: 'pending',
        comment: 'Trámite creado correctamente',
      },
      {
        date: '2023-03-16T14:20:00Z',
        status: 'review',
        comment: 'En revisión por Departamento de Comercio',
      },
    ],
  },
  {
    id: 'req-002',
    title: 'Permiso para Construcción de Vivienda',
    type: 'Permiso de Construcción',
    description: 'Solicitud para construir vivienda unifamiliar en Calle Las Flores 456',
    createdAt: '2023-03-10T09:15:00Z',
    status: 'approved',
    priority: 'high',
    citizenName: 'Juan Pérez',
    citizenEmail: 'juan@ejemplo.com',
    citizenPhone: '923456789',
    documents: [
      { name: 'DNI.pdf', url: '#', uploadedAt: '2023-03-10T09:15:00Z' },
      { name: 'PlanoVivienda.pdf', url: '#', uploadedAt: '2023-03-10T09:15:00Z' },
      { name: 'TituloPropiedad.pdf', url: '#', uploadedAt: '2023-03-10T09:15:00Z' },
    ],
    history: [
      {
        date: '2023-03-10T09:15:00Z',
        status: 'pending',
        comment: 'Trámite creado correctamente',
      },
      {
        date: '2023-03-11T11:30:00Z',
        status: 'review',
        comment: 'En revisión por Departamento de Obras',
      },
      {
        date: '2023-03-14T16:45:00Z',
        status: 'approved',
        comment: 'Permiso aprobado. Puede recoger el documento en oficinas municipales',
      },
    ],
  },
  {
    id: 'req-003',
    title: 'Reclamo por Alumbrado Público',
    type: 'Reclamo por Servicios Públicos',
    description: 'Falta de alumbrado público en la Calle Los Pinos desde hace 3 días',
    createdAt: '2023-03-12T08:45:00Z',
    status: 'rejected',
    priority: 'low',
    citizenName: 'Ana Castro',
    citizenEmail: 'ana@ejemplo.com',
    citizenPhone: '945678123',
    documents: [
      { name: 'DNI.pdf', url: '#', uploadedAt: '2023-03-12T08:45:00Z' },
      { name: 'FotosCalle.jpg', url: '#', uploadedAt: '2023-03-12T08:45:00Z' },
    ],
    history: [
      {
        date: '2023-03-12T08:45:00Z',
        status: 'pending',
        comment: 'Reclamo registrado correctamente',
      },
      {
        date: '2023-03-13T10:20:00Z',
        status: 'review',
        comment: 'En revisión por Departamento de Servicios Públicos',
      },
      {
        date: '2023-03-14T15:30:00Z',
        status: 'rejected',
        comment: 'El mantenimiento ya estaba programado para el día de mañana. Se cierra el caso.',
      },
    ],
  },
  {
    id: 'req-004',
    title: 'Solicitud de Certificado de Residencia',
    type: 'Solicitud de Información',
    description: 'Necesito certificado de residencia para trámites legales',
    createdAt: '2023-03-14T13:10:00Z',
    status: 'pending',
    priority: 'medium',
    citizenName: 'Carlos Mendoza',
    citizenEmail: 'carlos@ejemplo.com',
    citizenPhone: '956789012',
    documents: [
      { name: 'DNI.pdf', url: '#', uploadedAt: '2023-03-14T13:10:00Z' },
      { name: 'RecibosServicios.pdf', url: '#', uploadedAt: '2023-03-14T13:10:00Z' },
    ],
    history: [
      {
        date: '2023-03-14T13:10:00Z',
        status: 'pending',
        comment: 'Solicitud registrada correctamente',
      },
    ],
  },
];

// Mock resumes data
export const mockResumes = [
  {
    id: 'res-001',
    name: 'Pedro Sánchez',
    email: 'pedro@ejemplo.com',
    phone: '987123456',
    position: 'Ingeniero Civil',
    experience: 5,
    education: 'Universidad Nacional de Ingeniería',
    createdAt: '2023-03-10T09:30:00Z',
    status: 'approved',
    aiScore: 85,
    aiRecommendation: 'Candidato altamente recomendado para el puesto. Experiencia relevante en proyectos municipales.',
    resumeFile: { name: 'CV_PedroSanchez.pdf', url: '#' },
    additionalDocs: [
      { name: 'Certificados.pdf', url: '#' },
      { name: 'PortafolioProy.pdf', url: '#' },
    ],
  },
  {
    id: 'res-002',
    name: 'Lucía Ramírez',
    email: 'lucia@ejemplo.com',
    phone: '945123789',
    position: 'Asistente Administrativo',
    experience: 3,
    education: 'Universidad San Martín',
    createdAt: '2023-03-11T14:20:00Z',
    status: 'pending',
    aiScore: 72,
    aiRecommendation: 'Candidata con perfil adecuado. Se recomienda entrevista para evaluar habilidades de organización.',
    resumeFile: { name: 'CV_LuciaRamirez.pdf', url: '#' },
    additionalDocs: [
      { name: 'Certificados.pdf', url: '#' },
    ],
  },
  {
    id: 'res-003',
    name: 'Roberto Torres',
    email: 'roberto@ejemplo.com',
    phone: '932145678',
    position: 'Contador',
    experience: 8,
    education: 'Universidad del Pacífico',
    createdAt: '2023-03-09T11:15:00Z',
    status: 'rejected',
    aiScore: 65,
    aiRecommendation: 'Candidato con experiencia en sector privado pero poca exposición al sector público.',
    resumeFile: { name: 'CV_RobertoTorres.pdf', url: '#' },
    additionalDocs: [
      { name: 'Certificados.pdf', url: '#' },
      { name: 'ReferenciasLaborales.pdf', url: '#' },
    ],
  },
  {
    id: 'res-004',
    name: 'Carmen Vega',
    email: 'carmen@ejemplo.com',
    phone: '912345678',
    position: 'Arquitecto',
    experience: 6,
    education: 'Universidad Ricardo Palma',
    createdAt: '2023-03-12T10:45:00Z',
    status: 'pending',
    aiScore: 88,
    aiRecommendation: 'Excelente candidata con experiencia relevante en planificación urbana municipal.',
    resumeFile: { name: 'CV_CarmenVega.pdf', url: '#' },
    additionalDocs: [
      { name: 'Certificados.pdf', url: '#' },
      { name: 'PortafolioProyectos.pdf', url: '#' },
    ],
  },
];

// Status options
export const statusOptions = [
  { value: 'pending', label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'review', label: 'En Revisión', color: 'bg-blue-100 text-blue-800' },
  { value: 'approved', label: 'Aprobado', color: 'bg-green-100 text-green-800' },
  { value: 'rejected', label: 'Rechazado', color: 'bg-red-100 text-red-800' },
  { value: 'completed', label: 'Completado', color: 'bg-purple-100 text-purple-800' },
];

// Priority options
export const priorityOptions = [
  { value: 'low', label: 'Baja', color: 'bg-gray-100 text-gray-800' },
  { value: 'medium', label: 'Media', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', label: 'Alta', color: 'bg-red-100 text-red-800' },
];

// Get status data by value
export const getStatusData = (value) => {
  return statusOptions.find(status => status.value === value) || statusOptions[0];
};

// Get priority data by value
export const getPriorityData = (value) => {
  return priorityOptions.find(priority => priority.value === value) || priorityOptions[0];
};