import { baseApi } from './baseApi';

export const tramiteService = {
    async getTramites() {
        return baseApi.request('/tramites');
    },

    async getTramiteById(id) {
        return baseApi.request(`/tramites/${id}`);
    },

    async createTramite(tramiteData) {
        return baseApi.request('/tramites', {
            method: 'POST',
            body: tramiteData,
        });
    },

    async updateTramite(id, tramiteData) {
        return baseApi.request(`/tramites/${id}`, {
            method: 'PUT',
            body: tramiteData,
        });
    },

    async deleteTramite(id) {
        return baseApi.request(`/tramites/${id}`, {
            method: 'DELETE',
        });
    }
};