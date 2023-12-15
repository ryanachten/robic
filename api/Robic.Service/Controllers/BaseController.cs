using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Robic.Service.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public partial class BaseController : ControllerBase
{
    protected string? UserId
    {
        get => User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    }
}
