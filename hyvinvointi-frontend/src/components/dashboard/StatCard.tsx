import React from 'react';
import { Link } from 'react-router-dom';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  color: 'blue' | 'green' | 'purple' | 'pink';
  link: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon, color, link }) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    green: 'bg-green-50 border-green-200 text-green-600',
    purple: 'bg-purple-50 border-purple-200 text-purple-600',
    pink: 'bg-pink-50 border-pink-200 text-pink-600',
  };

  return (
    <Link to={link} className="block">
      <div className={`p-6 rounded-lg border-2 ${colorClasses[color]} hover:shadow-lg transition cursor-pointer`}>
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          {icon && <span className="text-3xl">{icon}</span>}
        </div>
        <p className="text-3xl font-bold mb-1">{value}</p>
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
      </div>
    </Link>
  );
};

export default StatCard;