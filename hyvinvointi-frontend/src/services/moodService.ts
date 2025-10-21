import api from './api';
import { MoodEntry } from '../types';

export const moodService = {
  getAll: async (): Promise<MoodEntry[]> => {
    const response = await api.get('/mood');
    return response.data;
  },

  getById: async (id: string): Promise<MoodEntry> => {
    const response = await api.get(`/mood/${id}`);
    return response.data;
  },

  create: async (data: Partial<MoodEntry>): Promise<MoodEntry> => {
    const response = await api.post('/mood', data);
    return response.data.entry;
  },

  update: async (id: string, data: Partial<MoodEntry>): Promise<MoodEntry> => {
    const response = await api.put(`/mood/${id}`, data);
    return response.data.entry;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/mood/${id}`);
  },

  getByDateRange: async (startDate: string, endDate: string): Promise<MoodEntry[]> => {
    const response = await api.get('/mood', {
      params: { startDate, endDate },
    });
    return response.data;
  },
};