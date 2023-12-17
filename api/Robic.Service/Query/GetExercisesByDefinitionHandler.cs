using AutoMapper;
using MediatR;
using Robic.Repository;
using Robic.Service.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Query;

public class GetExercisesByDefinitionHandler(IExerciseRepository exerciseRepository, IMapper mapper)
    : IRequestHandler<GetExercisesByDefinition, IEnumerable<Exercise>>
{
    public async Task<IEnumerable<Exercise>> Handle(GetExercisesByDefinition request, CancellationToken cancellationToken)
    {
        var repositoryExercises = await exerciseRepository.GetDefinitionExercises(request.DefinitionId, request.UserId);
        var exercises = mapper.Map<List<Exercise>>(repositoryExercises);
        return exercises;
    }
}