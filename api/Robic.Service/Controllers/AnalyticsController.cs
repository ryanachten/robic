using MediatR;
using Microsoft.AspNetCore.Mvc;
using Robic.Service.Query;
using System.Threading.Tasks;

namespace Robic.Service.Controllers;

public class AnalyticsController(IMediator mediator) : BaseController
{
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        if (UserId == null) return Unauthorized();

        var analytics = await mediator.Send(new GetAnalytics
        {
            UserId = UserId
        });

        return Ok(analytics);
    }
}