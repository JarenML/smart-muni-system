/**
 * Valida si un campo tiene contenido.
 */
export function validateRequired(value, fieldName = "Este campo") {
  return value?.trim() ? true : `${fieldName} es obligatorio`;
}

/**
 * Valida si el formato del email es correcto.
 */
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim()) ? true : "El correo electrónico no es válido";
}

/**
 * Valida longitud mínima de una cadena.
 */
export function validateMinLength(value, minLength, fieldName = "Este campo") {
  return value.trim().length >= minLength
    ? true
    : `${fieldName} debe tener al menos ${minLength} caracteres`;
}

/**
 * Valida si dos valores son iguales (por ejemplo, contraseñas).
 */
export function validateMatch(
  value1,
  value2,
  message = "Los campos no coinciden"
) {
  return value1 === value2 ? true : message;
}

/**
 * Valida número de teléfono: solo números y 9 dígitos exactos.
 */
export function validatePhone(phone) {
  const cleaned = phone.replace(/\D/g, "");
  const isValid = /^[0-9]{9}$/.test(cleaned);
  return isValid ? true : "El número de teléfono debe tener 9 dígitos";
}

/**
 * Valida que el archivo no exceda un tamaño máximo (en MB).
 * @param {File} file - Archivo a validar.
 * @param {number} maxSizeMB - Tamaño máximo en megabytes.
 * @returns {true|string} - true si es válido, o mensaje de error.
 */
export function validateFileSize(file, maxSizeMB = 2) {
  if (!file) return "Debe seleccionar un archivo";

  const fileSizeMB = file.size / (1024 * 1024);
  return fileSizeMB <= maxSizeMB
    ? true
    : `El archivo excede el tamaño máximo de ${maxSizeMB} MB`;
}

/**
 * Valida que el archivo tenga un tipo MIME permitido.
 * @param {File} file
 * @param {string[]} allowedTypes
 * @returns {true|string}
 */
export function validateFileType(file, allowedTypes = []) {
  if (!file) return "Debe seleccionar un archivo";
  return allowedTypes.includes(file.type)
    ? true
    : `Tipo de archivo no permitido: ${file.type}`;
}
