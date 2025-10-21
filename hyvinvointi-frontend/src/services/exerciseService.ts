import api from './api';
import { ExerciseEntry } from '../types';

export const exerciseService = {
  getAll: async (): Promise<ExerciseEntry[]> => {
    const response = await api.get('/exercise');
    return response.data;
  },

  getById: async (id: string): Promise<ExerciseEntry> => {
    const response = await api.get(`/exercise/${id}`);
    return response.data;
  },

  create: async (data: Partial<ExerciseEntry>): Promise<ExerciseEntry> => {
    const response = await api.post('/exercise', data);
    return response.data.entry;
  },

  update: async (id: string, data: Partial<ExerciseEntry>): Promise<ExerciseEntry> => {
    const response = await api.put(`/exercise/${id}`, data);
    return response.data.entry;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/exercise/${id}`);
  },

  getByDateRange: async (startDate: string, endDate: string): Promise<ExerciseEntry[]> => {
    const response = await api.get('/exercise', {
      params: { startDate, endDate },
    });
    return response.data;
  },
};