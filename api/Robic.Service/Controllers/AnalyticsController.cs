using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Robic.Service.Models;
using Robic.Service.Query;
using System.Threading.Tasks;

namespace Robic.Service.Controllers;

public class AnalyticsController(IMediator mediator) : BaseController
{
    // TODO: analytics isn't really a restful resource - reconsider this as an endpoint
    /// <summary>
    /// Returns exercise analytics for a given user
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(Analytics), StatusCodes.Status200OK)]
    public async Task<IActionResult> Get()
    {
        var analytics = await mediator.Send(new GetAnalytics
        {
            UserId = GetUserId()
        });

        return Ok(analytics);
    }
}