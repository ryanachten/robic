using System.Threading;
using System.Threading.Tasks;
using MediatR;
using RobicServer.Data;
using RobicServer.Models;

namespace RobicServer.Command
{
    public class UpdateExerciseDefinitionHandler : IRequestHandler<UpdateExerciseDefinition, ExerciseDefinition>
    {
        private readonly IExerciseDefinitionRepository _definitionRepo;

        public UpdateExerciseDefinitionHandler(IUnitOfWork unitOfWork)
        {
            _definitionRepo = unitOfWork.ExerciseDefinitionRepo;
        }

        public async Task<ExerciseDefinition> Handle(UpdateExerciseDefinition request, CancellationToken cancellationToken)
        {
            return await _definitionRepo.UpdateDefinition(request.ExistingDefinition, request.UpdatedDefinition);
        }
    }
}