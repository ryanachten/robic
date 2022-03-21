using MediatR;
using RobicServer.Data;

namespace RobicServer.Command
{
    public class DeleteExerciseHandler : RequestHandler<DeleteExercise>
    {
        private readonly IExerciseRepository _exerciseRepo;

        public DeleteExerciseHandler(IUnitOfWork unitOfWork)
        {
            _exerciseRepo = unitOfWork.ExerciseRepo;
        }
        protected override async void Handle(DeleteExercise request)
        {
            await _exerciseRepo.DeleteExercise(request.ExerciseId, request.Definition);
        }
    }
}