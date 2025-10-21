import React, { useState, useEffect } from 'react';
import { sleepService } from '../services/sleepService';
import { SleepEntry } from '../types';
import SleepForm from '../components/sleep/SleepForm';
import SleepList from '../components/sleep/SleepList';

const SleepPage: React.FC = () => {
  const [entries, setEntries] = useState<SleepEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<SleepEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      setLoading(true);
      const data = await sleepService.getAll();
      setEntries(data);
    } catch (err) {
      setError('Virhe ladattaessa merkintöjä');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      if (editingEntry) {
        await sleepService.update(editingEntry.id, data);
      } else {
        await sleepService.create(data);
      }
      await loadEntries();
      setShowForm(false);
      setEditingEntry(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Virhe tallennuksessa');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Haluatko varmasti poistaa tämän merkinnän?')) {
      try {
        await sleepService.delete(id);
        await loadEntries();
      } catch (err) {
        setError('Virhe poistettaessa merkintää');
      }
    }
  };

  const handleEdit = (entry: SleepEntry) => {
    setEditingEntry(entry);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingEntry(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Uni</h1>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition"
            >
              + Lisää merkintä
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingEntry ? 'Muokkaa merkintää' : 'Uusi merkintä'}
            </h2>
            <SleepForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              initialData={editingEntry}
            />
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-600">Ladataan...</p>
        ) : (
          <SleepList entries={entries} onDelete={handleDelete} onEdit={handleEdit} />
        )}
      </div>
    </div>
  );
};

export default SleepPage;