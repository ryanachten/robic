using MediatR;
using Robic.Service.Models.Deprecated;
using Robic.Service.Models.DTOs.Exercise;

namespace Robic.Service.Command;

public class UpdateExercise : IRequest<MongoExercise>
{
    public required UpdateExerciseDto Exercise { get; set; }
}