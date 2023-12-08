using AutoMapper;
using MediatR;
using RobicServer.Data;
using RobicServer.Models;
using System.Threading;
using System.Threading.Tasks;

namespace RobicServer.Command;

public class CreateExerciseHandler(IUnitOfWork unitOfWork, IMapper mapper) : IRequestHandler<CreateExercise, Exercise>
{
    public Task<Exercise> Handle(CreateExercise request, CancellationToken cancellationToken)
    {
        var exercise = mapper.Map<Exercise>(request.Exercise);
        return unitOfWork.ExerciseRepo.CreateExercise(exercise, request.Definition);
    }
}