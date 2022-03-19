using MediatR;
using RobicServer.Data;
using RobicServer.Models;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace RobicServer.Command
{
    public class CreateExerciseDefinitionHandler : IRequestHandler<CreateExerciseDefinition, ExerciseDefinition>
    {
        private readonly IExerciseDefinitionRepository _definitionRepo;

        public CreateExerciseDefinitionHandler(IUnitOfWork unitOfWork)
        {
            _definitionRepo = unitOfWork.ExerciseDefinitionRepo;
        }

        public async Task<ExerciseDefinition> Handle(CreateExerciseDefinition request, CancellationToken cancellationToken)
        {
           return await _definitionRepo.CreateDefinition(request.UserId, request.Definition);
        }
    }
}
