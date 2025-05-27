/**
 * Formatea una fecha a dd/mm/yyyy.
 * @param {string|Date} date
 * @returns {string}
 */
export function formatDate(date) {
  if (!date) return "";

  const d = new Date(date);
  if (isNaN(d)) return "Fecha inválida";

  return d.toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/**
 * Formatea fecha y hora en formato local (ej: 26/05/2025 14:30).
 * @param {string|Date} date
 * @returns {string}
 */
export function formatDateTime(date) {
  if (!date) return "";

  const d = new Date(date);
  if (isNaN(d)) return "Fecha inválida";

  return d.toLocaleString("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

/**
 * Devuelve una fecha relativa (ej: "hace 2 días").
 * @param {string|Date} date
 * @returns {string}
 */
export function formatRelativeDate(date) {
  if (!date) return "";

  const now = new Date();
  const then = new Date(date);
  const diffMs = now - then;

  if (isNaN(then)) return "Fecha inválida";

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `hace ${days} día${days > 1 ? "s" : ""}`;
  if (hours > 0) return `hace ${hours} hora${hours > 1 ? "s" : ""}`;
  if (minutes > 0) return `hace ${minutes} minuto${minutes > 1 ? "s" : ""}`;
  return "hace unos segundos";
}

/**
 * Formatea un número de teléfono (ej: 987 654 321).
 * @param {string} phone
 * @returns {string}
 */
export function formatPhone(phone) {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
}

/**
 * Capitaliza la primera letra de una cadena.
 * @param {string} text
 * @returns {string}
 */
export function capitalize(text) {
  return typeof text === "string" && text.length > 0
    ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    : "";
}

/**
 * Convierte estados backend a etiquetas legibles.
 * @param {string} status
 * @returns {string}
 */
export function formatStatusLabel(status) {
  const labels = {
    pending: "Pendiente",
    approved: "Aprobado",
    rejected: "Rechazado",
  };
  return labels[status] || capitalize(status);
}

/**
 * Formatea números como moneda en soles (S/).
 * @param {number} amount
 * @returns {string}
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
  }).format(amount);
}
