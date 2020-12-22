export enum MuscleGroup {
  Chest = "Chest",
  Forearms = "Forearms",
  Lats = "Lats",
  // MIDDLE_BACK = "Middle Back",
  Back = "Lower Back",
  Neck = "Neck",
  Hamstrings = "Hamstrings",
  Quadriceps = "Quadriceps",
  Calves = "Calves",
  Triceps = "Triceps",
  Traps = "Traps",
  Shoulders = "Shoulders",
  Abdominals = "Abdominals",
  Obliques = "Obliques",
  Glutes = "Glutes",
  Biceps = "Biceps",
  // ADDUCTORS = "Adductors",
  // ABDUCTORS = "Abductors"
}

export enum ExerciseType {
  Circuit = "Circuit",
  Standard = "Standard",
  Superset = "Superset",
}

export enum Unit {
  kg = "kg",
  min = "min",
  bodyweight = "bodyweight",
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  exercises: any[];
}

export interface SetExercise {
  id: string;
  reps: number;
  value: number;
  unit: Unit;
}

// TODO: doesn't handle nested Set type
export type Set = {
  reps: number;
  value: number;
};

export type PersonalBest = {
  topNetExercise: Exercise;
  topAvgValue: number;
  topReps: Number;
  topSets: Number;
  history: PersonalBestHistory[];
};

export type PersonalBestHistory = {
  date: string;
  netValue: number;
  avgValue: number;
  avgReps: number;
  sets: number;
  timeTaken: number;
};

export interface Exercise {
  id: string;
  date: string;
  definition: string;
  sets: Set[];
  timeTaken: string;
  netValue: number;
}

export interface ExerciseDefinition {
  id: string;
  title: string;
  lastSession: Exercise | null;
  lastImprovement: number | null;
  unit: Unit;
  type?: ExerciseType;
  user: string;
  history: Exercise[];
  childExercises: ExerciseDefinition[];
  primaryMuscleGroup?: MuscleGroup[];
  personalBest: PersonalBest | null;
}

export type AnalyticsItem = {
  label: string;
  count: number;
};
export interface Analytics {
  mostFrequentMuscleGroup: AnalyticsItem | null;
  mostFrequentExercise: AnalyticsItem | null;
  muscleGroupFrequency: AnalyticsItem[];
  exerciseFrequency: AnalyticsItem[];
  exerciseProgress: AnalyticsItem[];
}
