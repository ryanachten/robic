using MediatR;
using Robic.Service.Data;
using Robic.Service.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Query;

public class GetExerciseDefinitionHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetExerciseDefinitions, IEnumerable<ExerciseDefinition>>
{
    public Task<IEnumerable<ExerciseDefinition>> Handle(GetExerciseDefinitions request, CancellationToken cancellationToken)
    {
        return unitOfWork.ExerciseDefinitionRepo.GetUserDefinitions(request.UserId);
    }
}
