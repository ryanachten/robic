using MediatR;
using RobicServer.Models;

namespace RobicServer.Query
{
    public class GetAnalytics : IRequest<Analytics>
    {
        public string UserId { get; set; }
    }
}