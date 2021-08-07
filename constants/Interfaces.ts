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
  email: string;
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

// Used for exercise form
export type FormSet = {
  reps: string;
  value: string;
};

export type PersonalBest = {
  topNetExercise: Exercise | null;
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

export type ExerciseForCreate = {
  definition: string;
  sets: Set[];
  timeTaken?: string;
};

export interface ExerciseDefinition {
  id: string;
  title: string;
  lastSession: Exercise | null;
  lastImprovement: number | null;
  unit: Unit;
  type?: ExerciseType;
  user: string;
  history: string[];
  childExercises: ExerciseDefinition[];
  primaryMuscleGroup?: MuscleGroup[];
  personalBest?: PersonalBest;
}

export type AnalyticsItem = {
  marker: string;
  count: number;
};
export interface Analytics {
  mostFrequentMuscleGroup: AnalyticsItem | null;
  mostFrequentExercise: AnalyticsItem | null;
  muscleGroupFrequency: AnalyticsItem[];
  exerciseFrequency: AnalyticsItem[];
  exerciseProgress: AnalyticsItem[];
}

export type ExerciseDefinitionForCreate = {
  title: string;
  unit: Unit;
  user: string;
  primaryMuscleGroup: MuscleGroup[];
};

export type ExerciseDefinitionForEdit = {
  id: string;
  title: string;
  unit: Unit;
  primaryMuscleGroup: MuscleGroup[];
};
