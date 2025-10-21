import React from 'react';
import { SleepEntry } from '../../types';

interface SleepListProps {
  entries: SleepEntry[];
  onDelete: (id: string) => void;
  onEdit: (entry: SleepEntry) => void;
}

const SleepList: React.FC<SleepListProps> = ({ entries, onDelete, onEdit }) => {
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('fi-FI', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fi-FI');
  };

  return (
    <div className="space-y-4">
      {entries.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Ei unimerkintöjä</p>
      ) : (
        entries.map((entry) => (
          <div key={entry.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg">{formatDate(entry.date)}</h3>
                <p className="text-sm text-gray-600">
                  {formatDateTime(entry.bedTime)} → {formatDateTime(entry.wakeTime)}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(entry)}
                  className="text-purple-500 hover:text-purple-700 text-sm"
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
                <span className="text-gray-600">Kesto:</span>{' '}
                <span className="font-medium">{entry.duration} h</span>
              </div>
              <div>
                <span className="text-gray-600">Laatu:</span>{' '}
                <span className="font-medium">{entry.quality}/10</span>
              </div>
              {entry.interruptions !== undefined && (
                <div>
                  <span className="text-gray-600">Heräämisiä:</span>{' '}
                  <span className="font-medium">{entry.interruptions}</span>
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

export default SleepList;