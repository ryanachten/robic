using Robic.Service.Models;

namespace Robic.Service.Data;

public interface IAnalyticsRepository
{
    Analytics GetUserAnalytics(string userId);
}