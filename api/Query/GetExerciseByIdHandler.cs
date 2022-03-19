using System.Threading;
using System.Threading.Tasks;
using MediatR;
using RobicServer.Data;
using RobicServer.Models;

namespace RobicServer.Query
{
    public class GetExerciseByIdHandler : IRequestHandler<GetExerciseById, Exercise>
    {
        private readonly IExerciseRepository _exerciseRepo;

        public GetExerciseByIdHandler(IUnitOfWork unitOfWork)
        {
            _exerciseRepo = unitOfWork.ExerciseRepo;
        }
        public Task<Exercise> Handle(GetExerciseById request, CancellationToken cancellationToken)
        {
            return _exerciseRepo.GetExerciseById(request.ExerciseId);
        }
    }
}