import React, { useState, useEffect } from 'react';
import { nutritionService } from '../services/nutritionService';
import { exerciseService } from '../services/exerciseService';
import { sleepService } from '../services/sleepService';
import { moodService } from '../services/moodService';
import StatCard from '../components/dashboard/StatCard';
import RecentActivity from '../components/dashboard/RecentActivity';
import QuickStats from '../components/dashboard/QuickStats';

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState({
    nutritionCount: 0,
    exerciseCount: 0,
    sleepCount: 0,
    moodCount: 0,
    totalCalories: 0,
    totalExerciseMinutes: 0,
    averageSleepHours: 0,
    averageMood: 0,
  });

  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Hae viimeisen 7 päivän data
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);

      const [nutritionData, exerciseData, sleepData, moodData] = await Promise.all([
        nutritionService.getByDateRange(startDate.toISOString(), endDate.toISOString()),
        exerciseService.getByDateRange(startDate.toISOString(), endDate.toISOString()),
        sleepService.getByDateRange(startDate.toISOString(), endDate.toISOString()),
        moodService.getByDateRange(startDate.toISOString(), endDate.toISOString()),
      ]);

      // Laske tilastot
      const totalCalories = nutritionData.reduce((sum, entry) => sum + (entry.calories || 0), 0);
      const totalExerciseMinutes = exerciseData.reduce((sum, entry) => sum + entry.duration, 0);
      const averageSleepHours = sleepData.length > 0
        ? sleepData.reduce((sum, entry) => sum + entry.duration, 0) / sleepData.length
        : 0;
      const averageMood = moodData.length > 0
        ? moodData.reduce((sum, entry) => sum + entry.mood, 0) / moodData.length
        : 0;

      setStats({
        nutritionCount: nutritionData.length,
        exerciseCount: exerciseData.length,
        sleepCount: sleepData.length,
        moodCount: moodData.length,
        totalCalories,
        totalExerciseMinutes,
        averageSleepHours,
        averageMood,
      });

      // Yhdistä viimeisimmät aktiviteetit
      const allActivities = [
        ...nutritionData.map(entry => ({
          id: entry.id,
          type: 'nutrition' as const,
          title: entry.foodName,
          subtitle: `${entry.mealType} • ${entry.calories || 0} kcal`,
          time: entry.createdAt,
        })),
        ...exerciseData.map(entry => ({
          id: entry.id,
          type: 'exercise' as const,
          title: entry.exerciseType,
          subtitle: `${entry.duration} min • ${entry.intensity || ''}`,
          time: entry.createdAt,
        })),
        ...sleepData.map(entry => ({
          id: entry.id,
          type: 'sleep' as const,
          title: `Uni ${entry.duration}h`,
          subtitle: `Laatu: ${entry.quality}/10`,
          time: entry.createdAt,
        })),
        ...moodData.map(entry => ({
          id: entry.id,
          type: 'mood' as const,
          title: `Mieliala ${entry.mood}/10`,
          subtitle: entry.category || 'Päiväkirja',
          time: entry.createdAt,
        })),
      ];

      // Järjestä ajan mukaan ja ota 10 uusinta
      allActivities.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
      setActivities(allActivities.slice(0, 10));

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Ladataan...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Tilastokortit */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Ravinto"
          value={stats.nutritionCount}
          subtitle="merkintää tällä viikolla"
          icon="🍽️"
          color="blue"
          link="/nutrition"
        />
        <StatCard
          title="Liikunta"
          value={stats.exerciseCount}
          subtitle="harjoitusta tällä viikolla"
          icon="💪"
          color="green"
          link="/exercise"
        />
        <StatCard
          title="Uni"
          value={stats.sleepCount}
          subtitle="yötä kirjattu"
          icon="😴"
          color="purple"
          link="/sleep"
        />
        <StatCard
          title="Mieliala"
          value={stats.moodCount}
          subtitle="merkintää tällä viikolla"
          icon="😊"
          color="pink"
          link="/mood"
        />
      </div>

      {/* Viikon yhteenveto */}
      <div className="mb-8">
        <QuickStats
          totalCalories={stats.totalCalories}
          totalExerciseMinutes={stats.totalExerciseMinutes}
          averageSleepHours={stats.averageSleepHours}
          averageMood={stats.averageMood}
        />
      </div>

      {/* Viimeisimmät aktiviteetit */}
      <RecentActivity activities={activities} />
    </div>
  );
};

export default DashboardPage;