export interface RegisterInput {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
}

export interface UpdateProfileInput {
  firstName?: string;
  lastName?: string;
  age?: number;
  weight?: number;
  height?: number;
  gender?: string;
}

export interface CreateNutritionInput {
  date?: Date;
  mealType: string;
  foodName: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  waterIntake?: number;
  notes?: string;
}

export interface UpdateNutritionInput {
  mealType?: string;
  foodName?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  waterIntake?: number;
  notes?: string;
}

export interface CreateExerciseInput {
  date?: Date;
  exerciseType: string;
  duration: number;
  intensity?: string;
  caloriesBurned?: number;
  distance?: number;
  notes?: string;
}

export interface UpdateExerciseInput {
  exerciseType?: string;
  duration?: number;
  intensity?: string;
  caloriesBurned?: number;
  distance?: number;
  notes?: string;
}

export interface CreateSleepInput {
  date?: Date;
  bedTime: Date;
  wakeTime: Date;
  duration: number;
  quality: number;
  interruptions?: number;
  notes?: string;
}

export interface UpdateSleepInput {
  bedTime?: Date;
  wakeTime?: Date;
  duration?: number;
  quality?: number;
  interruptions?: number;
  notes?: string;
}

export interface CreateMoodInput {
  date?: Date;
  mood: number;
  stressLevel?: number;
  energyLevel?: number;
  category?: string;
  notes?: string;
}

export interface UpdateMoodInput {
  mood?: number;
  stressLevel?: number;
  energyLevel?: number;
  category?: string;
  notes?: string;
}