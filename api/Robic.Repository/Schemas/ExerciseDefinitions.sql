CREATE TABLE ExerciseDefinitions (
  Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  Title nvarchar(255) NOT NULL,
  Unit varchar(100) NOT NULL,
  UserId int NOT NULL,
  FOREIGN KEY (UserId) REFERENCES Users(Id)
);