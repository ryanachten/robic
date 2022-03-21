import { ExerciseDefinition } from "../constants/Interfaces";

// Alphbetical sort fallback
export const sortAlpha = (a: ExerciseDefinition, b: ExerciseDefinition) =>
  a.title > b.title ? 1 : -1;

export const sortByImprovment = (
  a: ExerciseDefinition,
  b: ExerciseDefinition
): 1 | -1 => {
  const improvementA = a.lastImprovement;
  const improvementB = b.lastImprovement;

  if (improvementA !== null && improvementB !== null) {
    if (improvementA === improvementB) {
      return sortAlpha(a, b);
    }
    return improvementA < improvementB ? 1 : -1;
  }

  // Handle cases where dates don't exist
  if (improvementA && !improvementB) {
    return -1;
  } else if (!improvementA && improvementB) {
    return 1;
  }
  return sortAlpha(a, b);
};

export const sortByDate = (
  a: ExerciseDefinition,
  b: ExerciseDefinition
): 1 | -1 => {
  // Handle date sorting
  const dateA = a.lastSession && new Date(a.lastSession.date);
  const dateB = b.lastSession && new Date(b.lastSession.date);
  if (dateA instanceof Date && dateB instanceof Date) {
    if (dateA.getMilliseconds() === dateB.getMilliseconds()) {
      return sortAlpha(a, b);
    }
    return dateA < dateB ? 1 : -1;
  }

  // Handle cases where dates don't exist
  if (dateA && !dateB) {
    return -1;
  } else if (!dateA && dateB) {
    return 1;
  }
  return sortAlpha(a, b);
};

export const sortByNumberOfSessions = (
  a: ExerciseDefinition,
  b: ExerciseDefinition
): 1 | -1 => {
  const sessionsA = a.history.length;
  const sessionsB = b.history.length;

  if (sessionsA === sessionsB) {
    return sortAlpha(a, b);
  }
  return sessionsA < sessionsB ? 1 : -1;
};

export const filterBySearchTerm = (
  exercise: ExerciseDefinition,
  searchTerm: string
) => exercise.title.toLowerCase().includes(searchTerm.toLowerCase());
