﻿using MediatR;
using Robic.Service.Models;
using Robic.Service.Models.DTOs.ExerciseDefinition;

namespace Robic.Service.Command;

public class CreateExerciseDefinition : IRequest<ExerciseDefinition>
{
    public required UpdateExerciseDefinitionDto Definition { get; set; }
}
