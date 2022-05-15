using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    public class ApiException
    {
        public ApiException(int status, string message = null, string detail = null)
        {
            Status = status;
            Message = message;
            Detail = detail;
        }

        public int Status { get; set; }
        public string Message { get; set; }
        public string Detail { get; set; }
    }
}