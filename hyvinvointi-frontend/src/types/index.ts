export interface User {
  id: string;
  email: string;
  profile: Profile;
}

export interface Profile {
  id: string;
  userId: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  weight?: number;
  height?: number;
  gender?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface NutritionEntry {
  id: string;
  userId: string;
  date: string;
  mealType: string;
  foodName: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  waterIntake?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExerciseEntry {
  id: string;
  userId: string;
  date: string;
  exerciseType: string;
  duration: number;
  intensity?: string;
  caloriesBurned?: number;
  distance?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SleepEntry {
  id: string;
  userId: string;
  date: string;
  bedTime: string;
  wakeTime: string;
  duration: number;
  quality: number;
  interruptions?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MoodEntry {
  id: string;
  userId: string;
  date: string;
  mood: number;
  stressLevel?: number;
  energyLevel?: number;
  category?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}