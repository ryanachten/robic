using AutoMapper;
using MediatR;
using Robic.Repository;
using Robic.Service.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Query;

public class GetExercisesByDefinitionHandler(
    IExerciseRepository exerciseRepository,
    IExerciseSetRepository exerciseSetRepository,
    IMapper mapper) : IRequestHandler<GetExercisesByDefinition, IEnumerable<Exercise>>
{
    public async Task<IEnumerable<Exercise>> Handle(GetExercisesByDefinition request, CancellationToken cancellationToken)
    {
        var repositoryExercises = await exerciseRepository.GetDefinitionExercises(request.UserId, request.DefinitionId);
        var repositorySets = await exerciseSetRepository.GetExerciseSets(repositoryExercises.Select(e => e.Id));

        var exercises = mapper.Map<List<Exercise>>(repositoryExercises);
        // TODO: consider doing this join in a query
        return exercises.Select(e =>
        {
            var sets = repositorySets.Where(s => s.ExerciseId == e.Id).OrderBy(s => s.SetOrder);
            e.Sets = mapper.Map<List<Set>>(sets);
            return e;
        });
    }
}