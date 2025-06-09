const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class BaseApiClient {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;

        // ✅ Obtener token del localStorage
        const token = localStorage.getItem("token");

        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }), // ✅ Añadir token si existe
                ...options.headers,
            },
            credentials: 'include',
            ...options,
        };

        // Si el cuerpo es objeto, convertir a JSON (excepto si es FormData)
        if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
            config.body = JSON.stringify(config.body);
        }

        // 🔄 Enviar solicitud
        const response = await fetch(url, config);

        // ❌ Si hay error, lanzar excepción con el status
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // ✅ Retornar respuesta JSON
        return response.json();
    }
}

export const baseApi = new BaseApiClient();
