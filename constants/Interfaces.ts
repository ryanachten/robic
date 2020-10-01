export enum MuscleGroup {
  CHEST = "Chest",
  FOREARMS = "Forearms",
  LATS = "Lats",
  // MIDDLE_BACK = "Middle Back",
  LOWER_BACK = "Lower Back",
  NECK = "Neck",
  HAMS = "Hamstrings",
  QUADS = "Quadriceps",
  CALVES = "Calves",
  TRICEPS = "Triceps",
  TRAPS = "Traps",
  SHOULDERS = "Shoulders",
  ABS = "Abdominals",
  OBLIQUES = "Obliques",
  GLUTES = "Glutes",
  BICEPS = "Biceps",
  // ADDUCTORS = "Adductors",
  // ABDUCTORS = "Abductors"
}

export enum ExerciseType {
  CIRCUIT = "Circuit",
  STANDARD = "Standard",
  SUPERSET = "Superset",
}

export enum Unit {
  kg = "kg",
  min = "min",
  bodyweight = "body weight",
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

export interface Exercise {
  id: string;
  date: string;
  definiton: string;
  sets: Set[];
  timeTaken: string;
}

export interface ExerciseDefinition {
  id: string;
  title: string;
  unit: Unit;
  type?: ExerciseType;
  user: string;
  history: Exercise[];
  childExercises: ExerciseDefinition[];
  primaryMuscleGroup?: MuscleGroup[];
}
