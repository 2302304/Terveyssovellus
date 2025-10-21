import React, { useState } from 'react';

interface NutritionFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

const NutritionForm: React.FC<NutritionFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    mealType: initialData?.mealType || 'breakfast',
    foodName: initialData?.foodName || '',
    calories: initialData?.calories || '',
    protein: initialData?.protein || '',
    carbs: initialData?.carbs || '',
    fat: initialData?.fat || '',
    waterIntake: initialData?.waterIntake || '',
    notes: initialData?.notes || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      calories: formData.calories ? parseFloat(formData.calories) : undefined,
      protein: formData.protein ? parseFloat(formData.protein) : undefined,
      carbs: formData.carbs ? parseFloat(formData.carbs) : undefined,
      fat: formData.fat ? parseFloat(formData.fat) : undefined,
      waterIntake: formData.waterIntake ? parseFloat(formData.waterIntake) : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Ateriatyyppi</label>
        <select
          name="mealType"
          value={formData.mealType}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="breakfast">Aamupala</option>
          <option value="lunch">Lounas</option>
          <option value="dinner">Illallinen</option>
          <option value="snack">Välipala</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Ruoka</label>
        <input
          type="text"
          name="foodName"
          value={formData.foodName}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kalorit (kcal)</label>
          <input
            type="number"
            name="calories"
            value={formData.calories}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Proteiini (g)</label>
          <input
            type="number"
            name="protein"
            value={formData.protein}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hiilihydraatit (g)</label>
          <input
            type="number"
            name="carbs"
            value={formData.carbs}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rasva (g)</label>
          <input
            type="number"
            name="fat"
            value={formData.fat}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Veden määrä (l)</label>
        <input
          type="number"
          step="0.1"
          name="waterIntake"
          value={formData.waterIntake}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Muistiinpanot</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
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

export default NutritionForm;