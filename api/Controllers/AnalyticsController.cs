using MediatR;
using Microsoft.AspNetCore.Mvc;
using RobicServer.Query;
using System.Threading.Tasks;

namespace RobicServer.Controllers;

public class AnalyticsController(IMediator mediator) : BaseController
{
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var analytics = await mediator.Send(new GetAnalytics
        {
            UserId = _userId
        });

        return Ok(analytics);
    }
}