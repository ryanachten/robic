using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Security.Claims;

namespace Robic.Service.Helpers;

[AttributeUsage(AttributeTargets.Class)]
public class RequireUserClaimsAttribute : Attribute, IResourceFilter
{
    public void OnResourceExecuting(ResourceExecutingContext context)
    {
        var claim = context.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (claim == null)
        {
            context.Result = new StatusCodeResult(StatusCodes.Status401Unauthorized);
        }
    }

    public void OnResourceExecuted(ResourceExecutedContext context) { }
}