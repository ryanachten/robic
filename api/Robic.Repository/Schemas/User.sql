CREATE TABLE User (
  Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  FirstName nvarchar(255) NOT NULL,
  LastName nvarchar(255) NOT NULL,
  Email nvarchar(255) NOT NULL,
  PasswordHash varbinary(64) NOT NULL,
  PasswordSalt varbinary(128) NOT NULL
);