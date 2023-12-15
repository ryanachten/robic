using MediatR;
using Robic.Service.Models.Deprecated;

namespace Robic.Service.Query;

public class GetExerciseDefinitionById : IRequest<MongoExerciseDefinition>
{
    public required string DefinitionId { get; set; }
}
