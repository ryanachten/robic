using MediatR;
using RobicServer.Models;

namespace RobicServer.Command
{
    public class DeleteExerciseDefinition : IRequest
    {
        public ExerciseDefinition Definition { get; set; }
    }
}