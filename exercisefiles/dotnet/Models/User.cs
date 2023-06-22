// create a class called User

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnet.Models
{
    public class User
    {
        // create a property called Id
        public int Id { get; set; }

        // create a property called Name
        public string? Name { get; set; }

        // create a property called Email
        public string? Email { get; set; }

        // create a property called Password
        public string? Password { get; set; }
    }
}
