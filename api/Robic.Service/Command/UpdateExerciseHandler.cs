using AutoMapper;
using MediatR;
using Robic.Service.Data;
using Robic.Service.Models;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Command;

public class UpdateExerciseHandler(IUnitOfWork unitOfWork, IMapper mapper) : IRequestHandler<UpdateExercise, Exercise>
{
    public Task<Exercise> Handle(UpdateExercise request, CancellationToken cancellationToken)
    {
        var exercise = mapper.Map<Exercise>(request.Exercise);
        return unitOfWork.ExerciseRepo.UpdateExercise(exercise);
    }
}