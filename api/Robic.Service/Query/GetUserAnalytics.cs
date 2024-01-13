using MediatR;
using Robic.Service.Models;

namespace Robic.Service.Query;

public class GetUserAnalytics : IRequest<UserAnalytics>
{
    public required int UserId { get; set; }
    public required int MaxResults { get; set; }
}