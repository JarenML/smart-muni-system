import { baseApi } from './baseApi';

export const curriculoService = {
    async getCurriculos() {
        return baseApi.request('/curriculos');
    },

    async uploadCurriculo(formData) {
        return baseApi.request('/curriculos', {
            method: 'POST',
            body: formData,
            headers: {}, // Para FormData
        });
    },

    async deleteCurriculo(id) {
        return baseApi.request(`/curriculos/${id}`, {
            method: 'DELETE',
        });
    }
};