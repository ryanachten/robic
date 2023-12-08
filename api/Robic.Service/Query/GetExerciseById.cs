using MediatR;
using Robic.Service.Models;

namespace Robic.Service.Query;

public class GetExerciseById : IRequest<Exercise>
{
    public required string ExerciseId { get; set; }
}