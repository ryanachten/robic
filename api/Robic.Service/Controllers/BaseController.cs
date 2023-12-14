using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Authentication;
using System.Security.Claims;

namespace Robic.Service.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public partial class BaseController : ControllerBase
{
    [Obsolete("Use int version as part of refactor")]
    protected string? UserId
    {
        get => User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    }

    protected int GetUserId()
    {
        var userId = User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
        {
            throw new InvalidCredentialException("Missing user ID in claims");
        }
        return int.Parse(userId);
    }
}
