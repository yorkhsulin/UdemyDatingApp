using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using API.Errors;

namespace API.Middleware
{
    public class ExceprionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceprionMiddleware> _logger;
        private readonly IHostEnvironment _evn;
        public ExceprionMiddleware(RequestDelegate next , ILogger<ExceprionMiddleware> logger ,IHostEnvironment evn)
        {
            _evn = evn;
            _logger = logger;
            _next = next;

        }
        public async Task InvokeAsync(HttpContext context)                          
        {
            try{
                await _next(context);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex,ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;

                var resopnse = _evn.IsDevelopment()?
                new ApiException (context.Response.StatusCode ,ex.Message ,ex.StackTrace?.ToString())
                : new ApiException(context.Response.StatusCode , "Internal Server Error");

                var option = new JsonSerializerOptions {PropertyNamingPolicy= JsonNamingPolicy.CamelCase};
                var json = JsonSerializer.Serialize(resopnse,option);

                await context.Response.WriteAsync(json);           

            }
        }
    }
}