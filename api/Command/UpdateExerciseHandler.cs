using System.Threading;
using System.Threading.Tasks;
using MediatR;
using RobicServer.Data;
using RobicServer.Models;

namespace RobicServer.Command
{
    public class UpdateExerciseHandler : IRequestHandler<UpdateExercise, Exercise>
    {
        private readonly IExerciseRepository _exerciseRepo;

        public UpdateExerciseHandler(IUnitOfWork unitOfWork)
        {
            _exerciseRepo = unitOfWork.ExerciseRepo;
        }
        public Task<Exercise> Handle(UpdateExercise request, CancellationToken cancellationToken)
        {
            return _exerciseRepo.UpdateExercise(request.Exercise);
        }
    }
}