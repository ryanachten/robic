import { ExerciseDefinitionSummary } from "../constants/Interfaces";

// Alphabetical sort fallback
export const sortAlpha = (
  a: ExerciseDefinitionSummary,
  b: ExerciseDefinitionSummary
) => (a.title > b.title ? 1 : -1);

export const sortByImprovement = (
  a: ExerciseDefinitionSummary,
  b: ExerciseDefinitionSummary
): 1 | -1 => {
  const improvementA = a.lastImprovement;
  const improvementB = b.lastImprovement;

  if (
    improvementA !== null &&
    improvementA !== undefined &&
    improvementB !== null &&
    improvementB !== undefined
  ) {
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
  a: ExerciseDefinitionSummary,
  b: ExerciseDefinitionSummary
): 1 | -1 => {
  // Handle date sorting
  const dateA = a.lastSessionDate && new Date(a.lastSessionDate);
  const dateB = b.lastSessionDate && new Date(b.lastSessionDate);
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
  a: ExerciseDefinitionSummary,
  b: ExerciseDefinitionSummary
): 1 | -1 => {
  const sessionsA = a.sessionCount;
  const sessionsB = b.sessionCount;

  if (sessionsA === sessionsB) {
    return sortAlpha(a, b);
  }
  return sessionsA < sessionsB ? 1 : -1;
};

export const filterBySearchTerm = (
  exercise: ExerciseDefinitionSummary,
  searchTerm: string
) => exercise.title.toLowerCase().includes(searchTerm.toLowerCase());
