using MediatR;
using RobicServer.Data;
using RobicServer.Models;
using System.Threading;
using System.Threading.Tasks;

namespace RobicServer.Query;

public class GetAnalyticsHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetAnalytics, Analytics>
{
    public Task<Analytics> Handle(GetAnalytics request, CancellationToken cancellationToken)
    {
        return Task.FromResult(unitOfWork.AnalyticsRepo.GetUserAnalytics(request.UserId));
    }
}