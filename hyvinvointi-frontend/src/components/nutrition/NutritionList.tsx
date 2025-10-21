import React from 'react';
import { NutritionEntry } from '../../types';

interface NutritionListProps {
  entries: NutritionEntry[];
  onDelete: (id: string) => void;
  onEdit: (entry: NutritionEntry) => void;
}

const NutritionList: React.FC<NutritionListProps> = ({ entries, onDelete, onEdit }) => {
  const getMealTypeLabel = (type: string) => {
    const labels: any = {
      breakfast: 'Aamupala',
      lunch: 'Lounas',
      dinner: 'Illallinen',
      snack: 'Välipala',
    };
    return labels[type] || type;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fi-FI');
  };

  return (
    <div className="space-y-4">
      {entries.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Ei ravintomerkintöjä</p>
      ) : (
        entries.map((entry) => (
          <div key={entry.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg">{entry.foodName}</h3>
                <p className="text-sm text-gray-600">
                  {getMealTypeLabel(entry.mealType)} • {formatDate(entry.date)}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(entry)}
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  Muokkaa
                </button>
                <button
                  onClick={() => onDelete(entry.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Poista
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              {entry.calories && (
                <div>
                  <span className="text-gray-600">Kalorit:</span>{' '}
                  <span className="font-medium">{entry.calories} kcal</span>
                </div>
              )}
              {entry.protein && (
                <div>
                  <span className="text-gray-600">Proteiini:</span>{' '}
                  <span className="font-medium">{entry.protein} g</span>
                </div>
              )}
              {entry.carbs && (
                <div>
                  <span className="text-gray-600">Hiilihydraatit:</span>{' '}
                  <span className="font-medium">{entry.carbs} g</span>
                </div>
              )}
              {entry.fat && (
                <div>
                  <span className="text-gray-600">Rasva:</span>{' '}
                  <span className="font-medium">{entry.fat} g</span>
                </div>
              )}
            </div>

            {entry.waterIntake && (
              <div className="mt-2 text-sm">
                <span className="text-gray-600">Vesi:</span>{' '}
                <span className="font-medium">{entry.waterIntake} l</span>
              </div>
            )}

            {entry.notes && (
              <div className="mt-2 text-sm text-gray-600 italic">{entry.notes}</div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default NutritionList;