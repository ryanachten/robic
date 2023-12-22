using AutoMapper;
using MediatR;
using Robic.Repository;
using Robic.Service.Models;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using RepositoryModel = Robic.Repository.Models;

namespace Robic.Service.Command;

public class CreateExerciseDefinitionHandler(
    IExerciseDefinitionRepository exerciseDefinitionRepository,
    IExerciseMuscleGroupRepository exerciseMuscleGroupRepository,
    IMapper mapper) : IRequestHandler<CreateExerciseDefinition, ExerciseDefinition>
{
    public async Task<ExerciseDefinition> Handle(CreateExerciseDefinition request, CancellationToken cancellationToken)
    {
        var definition = mapper.Map<RepositoryModel.ExerciseDefinition>(request.Definition);
        var definitionResult = await exerciseDefinitionRepository.CreateDefinition(definition);

        var primaryMuscleGroups = request.Definition.PrimaryMuscleGroup;
        if (primaryMuscleGroups.Count != 0)
        {
            await exerciseMuscleGroupRepository.AddDefinitionMuscleGroups(
                definitionResult.Id,
                primaryMuscleGroups.Select(x => x.ToString())
            );
        }

        var createdDefinition = mapper.Map<ExerciseDefinition>(definitionResult);
        createdDefinition.PrimaryMuscleGroup = primaryMuscleGroups;
        return createdDefinition;
    }
}
