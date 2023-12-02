using MediatR;
using RobicServer.Models;

namespace RobicServer.Command;

public class UpdateExercise : IRequest<Exercise>
{
    public required Exercise Exercise { get; set; }
}