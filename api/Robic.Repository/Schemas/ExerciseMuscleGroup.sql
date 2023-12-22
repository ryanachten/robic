CREATE TABLE ExerciseMuscleGroup (
  MuscleCode VARCHAR(50) NOT NULL,
  DefinitionId INT NOT NULL,
  FOREIGN KEY (MuscleCode) REFERENCES MuscleGroup(MuscleCode),
  FOREIGN KEY (DefinitionId) REFERENCES ExerciseDefinition(Id)
);