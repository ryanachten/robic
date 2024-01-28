CREATE TABLE ExerciseSet (
  Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  ExerciseId INT NOT NULL,
  DefinitionId INT NOT NULL,
  SetOrder INT NOT NULL,
  Reps INT NOT NULL,
  Value FLOAT NOT NULL,
  FOREIGN KEY (ExerciseId) REFERENCES Exercise(Id),
  FOREIGN KEY (DefinitionId) REFERENCES ExerciseDefinition(Id)
);