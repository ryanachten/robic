using MediatR;
using RobicServer.Models;

namespace RobicServer.Command
{
    public class CreateExerciseDefinition : IRequest<ExerciseDefinition>
    {
        public string UserId { get; set; }
        public ExerciseDefinition Definition { get; set; }
    }
}
