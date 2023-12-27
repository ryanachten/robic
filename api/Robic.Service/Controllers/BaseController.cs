using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Robic.Service.Helpers;
using System.Security.Claims;

namespace Robic.Service.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
[Produces("application/json")]
[RequireUserClaims]
public partial class BaseController : ControllerBase
{
    public int UserId
    {
        get
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return int.Parse(userId!); // Won't be missing due to RequireUserClaims attribute above
        }
    }
}
