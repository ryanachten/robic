using System.Threading;
using System.Threading.Tasks;
using MediatR;
using RobicServer.Data;
using RobicServer.Models;

namespace RobicServer.Command
{
    public class CreateExerciseHandler : IRequestHandler<CreateExercise, Exercise>
    {
        private readonly IExerciseRepository _exerciseRepo;

        public CreateExerciseHandler(IUnitOfWork unitOfWork)
        {
            _exerciseRepo = unitOfWork.ExerciseRepo;
        }
        public Task<Exercise> Handle(CreateExercise request, CancellationToken cancellationToken)
        {
            return _exerciseRepo.CreateExercise(request.Exercise, request.Definition);
        }
    }
}