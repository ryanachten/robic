using MediatR;
using Microsoft.AspNetCore.Mvc;
using Robic.Service.Query;
using System.Threading.Tasks;

namespace Robic.Service.Controllers;

public class AnalyticsController(IMediator mediator) : BaseController
{
    // TODO: analytics isn't really a restful resource - reconsider this as an endpoint
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var analytics = await mediator.Send(new GetAnalytics
        {
            UserId = GetUserId()
        });

        return Ok(analytics);
    }
}