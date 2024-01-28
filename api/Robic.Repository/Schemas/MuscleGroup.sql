CREATE TABLE MuscleGroup (
  MuscleCode VARCHAR(50) NOT NULL PRIMARY KEY
);

-- MuscleGroup is a lookup table, so we seed values at creation
INSERT INTO MuscleGroup (MuscleCode)
VALUES
    ('CHEST'),
    ('FOREARMS'),
    ('LATS'),
    ('BACK'),
    ('NECK'),
    ('HAMSTRINGS'),
    ('QUADRICEPS'),
    ('CALVES'),
    ('TRICEPS'),
    ('TRAPS'),
    ('SHOULDERS'),
    ('ABDOMINALS'),
    ('OBLIQUES'),
    ('GLUTES'),
    ('BICEPS');