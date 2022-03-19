using MediatR;
using RobicServer.Models;

namespace RobicServer.Query
{
    public class GetExerciseById : IRequest<Exercise>
    {
        public string ExerciseId { get; set; }
    }
}