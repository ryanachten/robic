using MediatR;
using Robic.Service.Models;

namespace Robic.Service.Query;

public class GetExerciseDefinitionByTitle : IRequest<ExerciseDefinition?>
{
    public required int UserId { get; set; }
    public required string Title { get; set; }
}
