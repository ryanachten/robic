using MediatR;
using RobicServer.Data;
using RobicServer.Models;
using System.Threading;
using System.Threading.Tasks;

namespace RobicServer.Query
{
    public class GetExerciseDefinitionByIdHandler : IRequestHandler<GetExerciseDefinitionById, ExerciseDefinition>
    {
        private readonly IExerciseDefinitionRepository _definitionRepo;
        private readonly IExerciseRepository _exerciseRepo;

        public GetExerciseDefinitionByIdHandler(IUnitOfWork unitOfWork)
        {
            _definitionRepo = unitOfWork.ExerciseDefinitionRepo;
            _exerciseRepo = unitOfWork.ExerciseRepo;
        }

        public async Task<ExerciseDefinition> Handle(GetExerciseDefinitionById request, CancellationToken cancellationToken)
        {
            var definition = await _definitionRepo.GetExerciseDefinition(request.DefinitionId);
            if (definition != null)
                definition.PersonalBest = await _exerciseRepo.GetPersonalBest(definition.Id);

            return definition;
        }
    }
}
