import React, { useState } from 'react';

interface SleepFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

const SleepForm: React.FC<SleepFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    bedTime: initialData?.bedTime ? new Date(initialData.bedTime).toISOString().slice(0, 16) : '',
    wakeTime: initialData?.wakeTime ? new Date(initialData.wakeTime).toISOString().slice(0, 16) : '',
    duration: initialData?.duration || '',
    quality: initialData?.quality || '5',
    interruptions: initialData?.interruptions || '',
    notes: initialData?.notes || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      bedTime: new Date(formData.bedTime).toISOString(),
      wakeTime: new Date(formData.wakeTime).toISOString(),
      duration: parseFloat(formData.duration),
      quality: parseInt(formData.quality),
      interruptions: formData.interruptions ? parseInt(formData.interruptions) : undefined,
      notes: formData.notes,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nukkumaanmenoaika</label>
          <input
            type="datetime-local"
            name="bedTime"
            value={formData.bedTime}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Heräämisaika</label>
          <input
            type="datetime-local"
            name="wakeTime"
            value={formData.wakeTime}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Unen kesto (tuntia)</label>
        <input
          type="number"
          step="0.5"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Unen laatu (1-10): {formData.quality}
        </label>
        <input
          type="range"
          name="quality"
          min="1"
          max="10"
          value={formData.quality}
          onChange={handleChange}
          className="w-full"
          required
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Huono</span>
          <span>Erinomainen</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Heräämisten määrä</label>
        <input
          type="number"
          name="interruptions"
          value={formData.interruptions}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Muistiinpanot</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition"
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

export default SleepForm;