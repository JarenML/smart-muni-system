import { baseApi } from './baseApi';

export const chatService = {
    async sendMessage(message, tramiteId = null) {
        return baseApi.request('/chat', {
            method: 'POST',
            body: { message, tramiteId },
        });
    },

    async getChatHistory(tramiteId) {
        return baseApi.request(`/chat/history/${tramiteId}`);
    }
};