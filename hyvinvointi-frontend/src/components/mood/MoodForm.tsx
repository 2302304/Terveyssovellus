import React, { useState } from 'react';

interface MoodFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

const MoodForm: React.FC<MoodFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    mood: initialData?.mood || '5',
    stressLevel: initialData?.stressLevel || '5',
    energyLevel: initialData?.energyLevel || '5',
    category: initialData?.category || '',
    notes: initialData?.notes || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      mood: parseInt(formData.mood),
      stressLevel: formData.stressLevel ? parseInt(formData.stressLevel) : undefined,
      energyLevel: formData.energyLevel ? parseInt(formData.energyLevel) : undefined,
      category: formData.category || undefined,
      notes: formData.notes || undefined,
    });
  };

  const getMoodEmoji = (value: string) => {
    const val = parseInt(value);
    if (val <= 2) return '😢';
    if (val <= 4) return '😕';
    if (val <= 6) return '😐';
    if (val <= 8) return '🙂';
    return '😄';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mieliala (1-10): {formData.mood} {getMoodEmoji(formData.mood)}
        </label>
        <input
          type="range"
          name="mood"
          min="1"
          max="10"
          value={formData.mood}
          onChange={handleChange}
          className="w-full"
          required
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Erittäin huono</span>
          <span>Erinomainen</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Stressitaso (1-10): {formData.stressLevel}
        </label>
        <input
          type="range"
          name="stressLevel"
          min="1"
          max="10"
          value={formData.stressLevel}
          onChange={handleChange}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Ei stressiä</span>
          <span>Erittäin stressaantunut</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Energiataso (1-10): {formData.energyLevel}
        </label>
        <input
          type="range"
          name="energyLevel"
          min="1"
          max="10"
          value={formData.energyLevel}
          onChange={handleChange}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Väsynyt</span>
          <span>Energinen</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Kategoria</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
        >
          <option value="">Valitse...</option>
          <option value="work">Työ</option>
          <option value="relationships">Ihmissuhteet</option>
          <option value="health">Terveys</option>
          <option value="other">Muu</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Muistiinpanot</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          placeholder="Mitä tapahtui tänään?"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
        >
          Tallenna
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
        >
          Peruuta
        </button>
      </div>
    </form>
  );
};

export default MoodForm;