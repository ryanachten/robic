using MediatR;
using Robic.Service.Models.Deprecated;

namespace Robic.Service.Query;

public class GetExerciseDefinitionByTitle : IRequest<ExerciseDefinition?>
{
    public required int UserId { get; set; }
    public required string Title { get; set; }
}
