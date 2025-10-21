import React from 'react';
import { Link } from 'react-router-dom';

interface Activity {
  id: string;
  type: 'nutrition' | 'exercise' | 'sleep' | 'mood';
  title: string;
  subtitle: string;
  time: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'nutrition':
        return '🍽️';
      case 'exercise':
        return '💪';
      case 'sleep':
        return '😴';
      case 'mood':
        return '😊';
      default:
        return '📝';
    }
  };

  const getLink = (type: string) => {
    return `/${type}`;
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} min sitten`;
    } else if (diffHours < 24) {
      return `${diffHours} h sitten`;
    } else if (diffDays < 7) {
      return `${diffDays} pv sitten`;
    } else {
      return date.toLocaleDateString('fi-FI');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Viimeisimmät merkinnät</h2>
      
      {activities.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Ei merkintöjä vielä</p>
      ) : (
        <div className="space-y-3">
          {activities.map((activity) => (
            <Link
              key={activity.id}
              to={getLink(activity.type)}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
            >
              <span className="text-2xl">{getIcon(activity.type)}</span>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{activity.title}</h3>
                <p className="text-sm text-gray-600">{activity.subtitle}</p>
              </div>
              <span className="text-xs text-gray-500">{formatTime(activity.time)}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;