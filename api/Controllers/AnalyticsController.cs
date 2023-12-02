using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RobicServer.Query;
using System.Security.Claims;
using System.Threading.Tasks;

namespace RobicServer.Controllers;


[Authorize]
[Route("api/[controller]")]
[ApiController]
public class AnalyticsController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

        var analytics = await mediator.Send(new GetAnalytics
        {
            UserId = userId
        });

        return Ok(analytics);
    }
}