import api from './api';
import { NutritionEntry } from '../types';

export const nutritionService = {
  getAll: async (): Promise<NutritionEntry[]> => {
    const response = await api.get('/nutrition');
    return response.data;
  },

  getById: async (id: string): Promise<NutritionEntry> => {
    const response = await api.get(`/nutrition/${id}`);
    return response.data;
  },

  create: async (data: Partial<NutritionEntry>): Promise<NutritionEntry> => {
    const response = await api.post('/nutrition', data);
    return response.data.entry;
  },

  update: async (id: string, data: Partial<NutritionEntry>): Promise<NutritionEntry> => {
    const response = await api.put(`/nutrition/${id}`, data);
    return response.data.entry;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/nutrition/${id}`);
  },

  getByDateRange: async (startDate: string, endDate: string): Promise<NutritionEntry[]> => {
    const response = await api.get('/nutrition', {
      params: { startDate, endDate },
    });
    return response.data;
  },
};