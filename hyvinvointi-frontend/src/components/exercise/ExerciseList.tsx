import React from 'react';
import { ExerciseEntry } from '../../types';

interface ExerciseListProps {
  entries: ExerciseEntry[];
  onDelete: (id: string) => void;
  onEdit: (entry: ExerciseEntry) => void;
}

const ExerciseList: React.FC<ExerciseListProps> = ({ entries, onDelete, onEdit }) => {
  const getExerciseTypeLabel = (type: string) => {
    const labels: any = {
      running: 'Juoksu',
      gym: 'Kuntosali',
      cycling: 'Pyöräily',
      swimming: 'Uinti',
      walking: 'Kävely',
      yoga: 'Jooga',
      other: 'Muu',
    };
    return labels[type] || type;
  };

  const getIntensityLabel = (intensity: string) => {
    const labels: any = {
      low: 'Matala',
      medium: 'Keskitaso',
      high: 'Korkea',
    };
    return labels[intensity] || intensity;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fi-FI');
  };

  return (
    <div className="space-y-4">
      {entries.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Ei liikuntamerkintöjä</p>
      ) : (
        entries.map((entry) => (
          <div key={entry.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg">{getExerciseTypeLabel(entry.exerciseType)}</h3>
                <p className="text-sm text-gray-600">
                  {formatDate(entry.date)} • {entry.duration} min
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(entry)}
                  className="text-green-500 hover:text-green-700 text-sm"
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

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              <div>
                <span className="text-gray-600">Intensiteetti:</span>{' '}
                <span className="font-medium">{getIntensityLabel(entry.intensity || '')}</span>
              </div>
              {entry.caloriesBurned && (
                <div>
                  <span className="text-gray-600">Kalorit:</span>{' '}
                  <span className="font-medium">{entry.caloriesBurned} kcal</span>
                </div>
              )}
              {entry.distance && (
                <div>
                  <span className="text-gray-600">Matka:</span>{' '}
                  <span className="font-medium">{entry.distance} km</span>
                </div>
              )}
            </div>

            {entry.notes && (
              <div className="mt-2 text-sm text-gray-600 italic">{entry.notes}</div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ExerciseList;