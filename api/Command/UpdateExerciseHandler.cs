using MediatR;
using RobicServer.Data;
using RobicServer.Models;
using System.Threading;
using System.Threading.Tasks;

namespace RobicServer.Command;

public class UpdateExerciseHandler(IUnitOfWork unitOfWork) : IRequestHandler<UpdateExercise, Exercise>
{
    public Task<Exercise> Handle(UpdateExercise request, CancellationToken cancellationToken)
    {
        return unitOfWork.ExerciseRepo.UpdateExercise(request.Exercise);
    }
}