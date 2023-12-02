using MediatR;
using RobicServer.Data;
using RobicServer.Models;
using System.Threading;
using System.Threading.Tasks;

namespace RobicServer.Command;

public class CreateExerciseHandler(IUnitOfWork unitOfWork) : IRequestHandler<CreateExercise, Exercise>
{
    public Task<Exercise> Handle(CreateExercise request, CancellationToken cancellationToken)
    {
        return unitOfWork.ExerciseRepo.CreateExercise(request.Exercise, request.Definition);
    }
}