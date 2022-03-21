using MediatR;
using RobicServer.Models;

namespace RobicServer.Command
{
    public class UpdateExerciseDefinition : IRequest<ExerciseDefinition>
    {
        public ExerciseDefinition ExistingDefinition { get; set; }

        public ExerciseDefinition UpdatedDefinition { get; set; }
    }
}