using System.Collections.Generic;
using MediatR;
using RobicServer.Models;

namespace RobicServer.Query
{
    public class GetExercisesByDefinition : IRequest<IEnumerable<Exercise>>
    {
        public string DefinitionId { get; set; }
    }
}