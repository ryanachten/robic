using MediatR;
using Robic.Service.Models.DTOs.ExerciseDefinition;
using System.Collections.Generic;

namespace Robic.Service.Query;

public class GetExerciseDefinitions : IRequest<IEnumerable<ListExerciseDefinitionDto>>
{
    public required int UserId { get; set; }
}
