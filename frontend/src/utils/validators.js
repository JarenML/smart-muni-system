// Form validators

// Email validation
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'El correo electrónico es obligatorio';
  if (!regex.test(email)) return 'El formato del correo electrónico no es válido';
  return true;
};

// Phone validation (Peruvian format)
export const validatePhone = (phone) => {
  const regex = /^9\d{8}$/;
  if (!phone) return 'El número de teléfono es obligatorio';
  const cleaned = phone.replace(/\D/g, '');
  if (!regex.test(cleaned)) return 'El número debe empezar con 9 y tener 9 dígitos';
  return true;
};

// Required field validation
export const validateRequired = (value, fieldName = 'Este campo') => {
  if (!value) return `${fieldName} es obligatorio`;
  if (typeof value === 'string' && value.trim() === '') return `${fieldName} es obligatorio`;
  return true;
};

// Min length validation
export const validateMinLength = (value, minLength, fieldName = 'Este campo') => {
  if (!value) return `${fieldName} es obligatorio`;
  if (value.length < minLength) return `${fieldName} debe tener al menos ${minLength} caracteres`;
  return true;
};

// Max length validation
export const validateMaxLength = (value, maxLength, fieldName = 'Este campo') => {
  if (!value) return true;
  if (value.length > maxLength) return `${fieldName} no debe exceder los ${maxLength} caracteres`;
  return true;
};

// File type validation
export const validateFileType = (file, allowedTypes) => {
  if (!file) return true;
  const fileType = file.type;
  if (!allowedTypes.includes(fileType)) {
    return `Tipo de archivo no permitido. Tipos permitidos: ${allowedTypes.join(', ')}`;
  }
  return true;
};

// File size validation (in MB)
export const validateFileSize = (file, maxSizeMB) => {
  if (!file) return true;
  const fileSizeMB = file.size / (1024 * 1024);
  if (fileSizeMB > maxSizeMB) {
    return `El archivo es demasiado grande. Tamaño máximo: ${maxSizeMB} MB`;
  }
  return true;
};

// Compound validator (runs multiple validations)
export const validateMultiple = (value, validators) => {
  for (const validator of validators) {
    const result = validator(value);
    if (result !== true) return result;
  }
  return true;
};