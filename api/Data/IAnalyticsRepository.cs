using RobicServer.Models;

namespace RobicServer.Data;

public interface IAnalyticsRepository
{
    Analytics GetUserAnalytics(string userId);
}