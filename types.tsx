export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type AuthenticatedParamList = {
  Start: undefined;
  Exercises: undefined;
  Activity: undefined;
};

export type UnauthenticatedParamList = {
  Login: undefined;
  Register: undefined;
};

export type LoginParamList = {
  LoginScreen: undefined;
};

export type RegisterParamList = {
  Register: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
};

export type ExercisesParamList = {
  ExercisesScreen: undefined;
  ExerciseEditScreen: undefined;
  ExerciseDetailScreen: {
    definitionId: string;
  };
};
