import React, { useState } from 'react';

interface ExerciseFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    exerciseType: initialData?.exerciseType || 'running',
    duration: initialData?.duration || '',
    intensity: initialData?.intensity || 'medium',
    caloriesBurned: initialData?.caloriesBurned || '',
    distance: initialData?.distance || '',
    notes: initialData?.notes || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      duration: parseInt(formData.duration),
      caloriesBurned: formData.caloriesBurned ? parseFloat(formData.caloriesBurned) : undefined,
      distance: formData.distance ? parseFloat(formData.distance) : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Liikuntalaji</label>
        <select
          name="exerciseType"
          value={formData.exerciseType}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="running">Juoksu</option>
          <option value="gym">Kuntosali</option>
          <option value="cycling">Pyöräily</option>
          <option value="swimming">Uinti</option>
          <option value="walking">Kävely</option>
          <option value="yoga">Jooga</option>
          <option value="other">Muu</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Kesto (min)</label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Intensiteetti</label>
        <select
          name="intensity"
          value={formData.intensity}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
        >
          <option value="low">Matala</option>
          <option value="medium">Keskitaso</option>
          <option value="high">Korkea</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Poltetut kalorit</label>
          <input
            type="number"
            name="caloriesBurned"
            value={formData.caloriesBurned}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Matka (km)</label>
          <input
            type="number"
            step="0.1"
            name="distance"
            value={formData.distance}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Muistiinpanot</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
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

export default ExerciseForm;