using System.Threading;
using System.Threading.Tasks;
using MediatR;
using RobicServer.Data;
using RobicServer.Models;

namespace RobicServer.Query
{
    public class GetAnalyticsHandler : IRequestHandler<GetAnalytics, Analytics>
    {
        private readonly IAnalyticsRepository _analyticsRepo;

        public GetAnalyticsHandler(IUnitOfWork unitOfWork)
        {
            _analyticsRepo = unitOfWork.AnalyticsRepo;
        }
        public Task<Analytics> Handle(GetAnalytics request, CancellationToken cancellationToken)
        {
            return Task.FromResult(_analyticsRepo.GetUserAnalytics(request.UserId));
        }
    }
}