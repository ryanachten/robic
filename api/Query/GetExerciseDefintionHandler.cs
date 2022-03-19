using MediatR;
using RobicServer.Data;
using RobicServer.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace RobicServer.Query
{
    public class GetExerciseDefintionHandler : IRequestHandler<GetExerciseDefinitions, IEnumerable<ExerciseDefinition>>
    {
        private readonly IExerciseDefinitionRepository _exerciseRepo;

        public GetExerciseDefintionHandler(IUnitOfWork unitOfWork)
        {
            _exerciseRepo = unitOfWork.ExerciseDefinitionRepo;
        }

        public Task<IEnumerable<ExerciseDefinition>> Handle(GetExerciseDefinitions request, CancellationToken cancellationToken)
        {
            return _exerciseRepo.GetUserDefinitions(request.UserId);
        }
    }
}
