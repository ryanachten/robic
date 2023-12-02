using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace RobicServer.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public partial class BaseController : ControllerBase
{
    protected readonly string? _userId;

    public BaseController()
    {
        _userId = User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    }
}
