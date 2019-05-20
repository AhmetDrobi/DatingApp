using System;
using System.Security.Claims;
using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
namespace DatingApp.API.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            // waiting for the request to process
            var resultContext = await next();
            // Getting the id from the token in the http request context
            var userId = int.Parse(resultContext.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            // Getting an instance of the repo from the service context
            var repo = resultContext.HttpContext.RequestServices.GetService<IDatingRepository>();
            // Getting the user
            var user = await repo.GetUser(userId);
            // Updating the last active field
            user.LastActive = DateTime.Now;
            // Updating DB
            await repo.SaveAll();
        }
    }
}