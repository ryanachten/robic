using MediatR;
using RobicServer.Models;
using RobicServer.Models.DTOs.Exercise;

namespace RobicServer.Command;

public class UpdateExercise : IRequest<Exercise>
{
    public required UpdateExerciseDto Exercise { get; set; }
}