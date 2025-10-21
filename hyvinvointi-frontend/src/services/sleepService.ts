import api from './api';
import { SleepEntry } from '../types';

export const sleepService = {
  getAll: async (): Promise<SleepEntry[]> => {
    const response = await api.get('/sleep');
    return response.data;
  },

  getById: async (id: string): Promise<SleepEntry> => {
    const response = await api.get(`/sleep/${id}`);
    return response.data;
  },

  create: async (data: Partial<SleepEntry>): Promise<SleepEntry> => {
    const response = await api.post('/sleep', data);
    return response.data.entry;
  },

  update: async (id: string, data: Partial<SleepEntry>): Promise<SleepEntry> => {
    const response = await api.put(`/sleep/${id}`, data);
    return response.data.entry;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/sleep/${id}`);
  },

  getByDateRange: async (startDate: string, endDate: string): Promise<SleepEntry[]> => {
    const response = await api.get('/sleep', {
      params: { startDate, endDate },
    });
    return response.data;
  },
};