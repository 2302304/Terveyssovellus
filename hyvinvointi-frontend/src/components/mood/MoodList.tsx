import React from 'react';
import { MoodEntry } from '../../types';

interface MoodListProps {
  entries: MoodEntry[];
  onDelete: (id: string) => void;
  onEdit: (entry: MoodEntry) => void;
}

const MoodList: React.FC<MoodListProps> = ({ entries, onDelete, onEdit }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fi-FI');
  };

  const getMoodEmoji = (mood: number) => {
    if (mood <= 2) return '😢';
    if (mood <= 4) return '😕';
    if (mood <= 6) return '😐';
    if (mood <= 8) return '🙂';
    return '😄';
  };

  const getCategoryLabel = (category?: string) => {
    const labels: any = {
      work: 'Työ',
      relationships: 'Ihmissuhteet',
      health: 'Terveys',
      other: 'Muu',
    };
    return category ? labels[category] || category : '';
  };

  return (
    <div className="space-y-4">
      {entries.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Ei mielialamerkintöjä</p>
      ) : (
        entries.map((entry) => (
          <div key={entry.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                  {formatDate(entry.date)}
                </h3>
                {entry.category && (
                  <p className="text-sm text-gray-600">{getCategoryLabel(entry.category)}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(entry)}
                  className="text-pink-500 hover:text-pink-700 text-sm"
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

            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <span className="text-gray-600">Mieliala:</span>{' '}
                <span className="font-medium">{entry.mood}/10</span>
              </div>
              {entry.stressLevel !== undefined && (
                <div>
                  <span className="text-gray-600">Stressi:</span>{' '}
                  <span className="font-medium">{entry.stressLevel}/10</span>
                </div>
              )}
              {entry.energyLevel !== undefined && (
                <div>
                  <span className="text-gray-600">Energia:</span>{' '}
                  <span className="font-medium">{entry.energyLevel}/10</span>
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

export default MoodList;