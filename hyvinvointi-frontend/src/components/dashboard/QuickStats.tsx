import React from 'react';

interface QuickStatsProps {
  totalCalories?: number;
  totalExerciseMinutes?: number;
  averageSleepHours?: number;
  averageMood?: number;
}

const QuickStats: React.FC<QuickStatsProps> = ({
  totalCalories,
  totalExerciseMinutes,
  averageSleepHours,
  averageMood,
}) => {
  const getMoodEmoji = (mood: number) => {
    if (mood <= 4) return '😕';
    if (mood <= 7) return '🙂';
    return '😄';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Viikon yhteenveto</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Kalorit</p>
          <p className="text-2xl font-bold text-blue-600">
            {totalCalories ? Math.round(totalCalories) : 0}
          </p>
          <p className="text-xs text-gray-500">kcal</p>
        </div>

        <div className="text-center p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Liikunta</p>
          <p className="text-2xl font-bold text-green-600">
            {totalExerciseMinutes || 0}
          </p>
          <p className="text-xs text-gray-500">minuuttia</p>
        </div>

        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Uni</p>
          <p className="text-2xl font-bold text-purple-600">
            {averageSleepHours ? averageSleepHours.toFixed(1) : 0}
          </p>
          <p className="text-xs text-gray-500">h / yö</p>
        </div>

        <div className="text-center p-4 bg-pink-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Mieliala</p>
          <p className="text-2xl font-bold text-pink-600">
            {averageMood ? (
              <>
                {getMoodEmoji(averageMood)} {averageMood.toFixed(1)}
              </>
            ) : (
              '- -'
            )}
          </p>
          <p className="text-xs text-gray-500">keskiarvo</p>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;