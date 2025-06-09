import { baseApi } from './baseApi';

export const chatService = {
    // Enviar mensaje al backend (con campo "mensaje" como espera el backend)
    async sendMessage(mensaje, tramiteId = null) {
        return baseApi.request('/chat/contextual', {
            method: 'POST',
            body: { mensaje, tramiteId }, // ✅ importante: "mensaje", no "message"
        });
    },

    // Obtener historial de chat (si implementas esa ruta)
    async getChatHistory(tramiteId) {
        return baseApi.request(`/chat/history/${tramiteId}`);
    }
};
