using MediatR;
using RobicServer.Data;
using RobicServer.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace RobicServer.Query;

public class GetExercisesByDefinitionHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetExercisesByDefinition, IEnumerable<Exercise>>
{
    public Task<IEnumerable<Exercise>> Handle(GetExercisesByDefinition request, CancellationToken cancellationToken)
    {
        return unitOfWork.ExerciseRepo.GetDefinitionExercises(request.DefinitionId);
    }
}