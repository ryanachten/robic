export interface User {
  id: string;
  firstName: string;
  lastName: string;
  exercises: any[];
}

export interface ExerciseDefinition {
  id: string;
  title: string;
  unit: string; //TODO: add enum
  type: string; //TODO: add enum
  user: string;
  history: []; //TODO: add history type
  childExercises: ExerciseDefinition[];
  primaryMuscleGroup: string; //TODO: add enum
}
