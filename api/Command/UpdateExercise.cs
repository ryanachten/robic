using MediatR;
using RobicServer.Models;

namespace RobicServer.Command
{
    public class UpdateExercise : IRequest<Exercise>
    {
        public Exercise Exercise { get; set; }
    }
}