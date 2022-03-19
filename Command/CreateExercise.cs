using MediatR;
using RobicServer.Models;

namespace RobicServer.Command
{
    public class CreateExercise : IRequest<Exercise>
    {
        public ExerciseDefinition Definition { get; set; }
        public Exercise Exercise { get; set; }
    }
}