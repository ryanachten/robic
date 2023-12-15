using MediatR;
using Robic.Service.Data;
using Robic.Service.Models;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Query;

public class GetExerciseByIdHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetExerciseById, Exercise>
{
    public Task<Exercise> Handle(GetExerciseById request, CancellationToken cancellationToken)
    {
        return unitOfWork.ExerciseRepo.GetExerciseById(request.ExerciseId);
    }
}