using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Authentication;
using System.Security.Claims;

namespace Robic.Service.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
[Produces("application/json")]
public partial class BaseController : ControllerBase
{
    protected int GetUserId()
    {
        var userId = User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        // TODO: this should really be an action filter
        if (userId == null)
        {
            throw new InvalidCredentialException("Missing user ID in claims");
        }
        return int.Parse(userId);
    }
}
