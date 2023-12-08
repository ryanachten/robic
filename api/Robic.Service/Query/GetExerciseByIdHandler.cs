using MediatR;
using RobicServer.Data;
using RobicServer.Models;
using System.Threading;
using System.Threading.Tasks;

namespace RobicServer.Query;

public class GetExerciseByIdHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetExerciseById, Exercise>
{
    public Task<Exercise> Handle(GetExerciseById request, CancellationToken cancellationToken)
    {
        return unitOfWork.ExerciseRepo.GetExerciseById(request.ExerciseId);
    }
}