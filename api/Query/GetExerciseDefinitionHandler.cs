using MediatR;
using RobicServer.Data;
using RobicServer.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace RobicServer.Query;

public class GetExerciseDefinitionHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetExerciseDefinitions, IEnumerable<ExerciseDefinition>>
{
    public Task<IEnumerable<ExerciseDefinition>> Handle(GetExerciseDefinitions request, CancellationToken cancellationToken)
    {
        return unitOfWork.ExerciseDefinitionRepo.GetUserDefinitions(request.UserId);
    }
}
