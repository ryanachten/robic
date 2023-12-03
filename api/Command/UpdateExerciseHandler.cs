using AutoMapper;
using MediatR;
using RobicServer.Data;
using RobicServer.Models;
using System.Threading;
using System.Threading.Tasks;

namespace RobicServer.Command;

public class UpdateExerciseHandler(IUnitOfWork unitOfWork, IMapper mapper) : IRequestHandler<UpdateExercise, Exercise>
{
    public Task<Exercise> Handle(UpdateExercise request, CancellationToken cancellationToken)
    {
        var exercise = mapper.Map<Exercise>(request.Exercise);
        return unitOfWork.ExerciseRepo.UpdateExercise(exercise);
    }
}