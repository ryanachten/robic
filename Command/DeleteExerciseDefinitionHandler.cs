using MediatR;
using RobicServer.Data;

namespace RobicServer.Command
{
    public class DeleteExerciseDefinitionHandler : RequestHandler<DeleteExerciseDefinition>
    {
        private readonly IExerciseDefinitionRepository _definitionRepo;

        public DeleteExerciseDefinitionHandler(IUnitOfWork unitOfWork)
        {
            _definitionRepo = unitOfWork.ExerciseDefinitionRepo;
        }

        protected override async void Handle(DeleteExerciseDefinition request)
        {
            await _definitionRepo.DeleteDefinition(request.Definition);
        }
    }
}