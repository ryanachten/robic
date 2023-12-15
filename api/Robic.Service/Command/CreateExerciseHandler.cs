using AutoMapper;
using MediatR;
using Robic.Service.Data;
using Robic.Service.Models;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Command;

public class CreateExerciseHandler(IUnitOfWork unitOfWork, IMapper mapper) : IRequestHandler<CreateExercise, Exercise>
{
    public Task<Exercise> Handle(CreateExercise request, CancellationToken cancellationToken)
    {
        var exercise = mapper.Map<Exercise>(request.Exercise);
        return unitOfWork.ExerciseRepo.CreateExercise(exercise, request.Definition);
    }
}