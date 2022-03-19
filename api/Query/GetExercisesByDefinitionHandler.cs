using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using RobicServer.Data;
using RobicServer.Models;

namespace RobicServer.Query
{
    public class GetExercisesByDefinitionHandler : IRequestHandler<GetExercisesByDefinition, IEnumerable<Exercise>>
    {
        private readonly IExerciseRepository _exerciseRepository;

        public GetExercisesByDefinitionHandler(IUnitOfWork unitOfWork)
        {
            _exerciseRepository = unitOfWork.ExerciseRepo;
        }
        public Task<IEnumerable<Exercise>> Handle(GetExercisesByDefinition request, CancellationToken cancellationToken)
        {
            return _exerciseRepository.GetDefinitionExercises(request.DefinitionId);
        }
    }
}