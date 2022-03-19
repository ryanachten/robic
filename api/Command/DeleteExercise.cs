using MediatR;
using RobicServer.Models;

namespace RobicServer.Command
{
    public class DeleteExercise : IRequest
    {
        public string ExerciseId { get; set; }
        public ExerciseDefinition Definition { get; set; }
    }
}