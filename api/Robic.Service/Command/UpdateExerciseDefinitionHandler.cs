using AutoMapper;
using MediatR;
using Robic.Repository;
using Robic.Service.Models;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Command;

public class UpdateExerciseDefinitionHandler(
    IExerciseDefinitionRepository exerciseDefinitionRepository,
    IExerciseMuscleGroupRepository exerciseMuscleGroupRepository,
    IMapper mapper) : IRequestHandler<UpdateExerciseDefinition, ExerciseDefinition?>
{
    public async Task<ExerciseDefinition?> Handle(UpdateExerciseDefinition request, CancellationToken cancellationToken)
    {
        await exerciseDefinitionRepository.UpdateDefinition(new()
        {
            Id = request.DefinitionId,
            Title = request.UpdatedDefinition.Title,
            Unit = request.UpdatedDefinition.Unit,
        });

        await exerciseMuscleGroupRepository.DeleteDefinitionMuscleGroups(request.DefinitionId);
        var updatedMuscleGroups = request.UpdatedDefinition.PrimaryMuscleGroup;
        await exerciseMuscleGroupRepository.AddDefinitionMuscleGroups(
            request.DefinitionId,
            updatedMuscleGroups.Select(mg => mg.ToString())
        );

        var definitionResult = await exerciseDefinitionRepository.GetDefinitionById(request.DefinitionId);

        var definition = mapper.Map<ExerciseDefinition>(definitionResult);
        definition.PrimaryMuscleGroup = updatedMuscleGroups;

        return definition;
    }
}