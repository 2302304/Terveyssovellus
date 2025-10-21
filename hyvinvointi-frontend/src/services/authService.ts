import api from './api';
import { AuthResponse } from '../types';

export const authService = {
  register: async (email: string, password: string, firstName?: string, lastName?: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', {
      email,
      password,
      firstName,
      lastName,
    });
    return response.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};