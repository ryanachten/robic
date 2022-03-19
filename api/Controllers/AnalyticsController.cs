using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Threading.Tasks;
using MediatR;
using RobicServer.Query;

namespace RobicServer.Controllers
{

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AnalyticsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AnalyticsController(
            IMediator mediator
        )
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var analytics = await _mediator.Send(new GetAnalytics
            {
                UserId = userId
            });
            return Ok(analytics);
        }
    }
}