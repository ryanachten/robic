using MediatR;
using Robic.Service.Models;

namespace Robic.Service.Query;

public class GetAnalytics : IRequest<Analytics>
{
    public string UserId { get; set; }
}