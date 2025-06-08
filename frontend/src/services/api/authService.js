import { baseApi } from './baseApi';

export const authService = {
    async register(userData) {
        return baseApi.request('/auth/register', {
            method: 'POST',
            body: userData,
        });
    },

    async login(credentials) {
        return baseApi.request('/auth/login', {
            method: 'POST',
            body: credentials,
        });
    },

    async logout() {
        return baseApi.request('/auth/logout', {
            method: 'POST',
        });
    },

    async getProfile() {
        return baseApi.request('/auth/profile');
    }
};