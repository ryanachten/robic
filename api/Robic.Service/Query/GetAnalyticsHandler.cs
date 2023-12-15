using MediatR;
using Robic.Service.Data;
using Robic.Service.Models;
using System.Threading;
using System.Threading.Tasks;

namespace Robic.Service.Query;

public class GetAnalyticsHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetAnalytics, Analytics>
{
    public Task<Analytics> Handle(GetAnalytics request, CancellationToken cancellationToken)
    {
        return Task.FromResult(unitOfWork.AnalyticsRepo.GetUserAnalytics(request.UserId));
    }
}