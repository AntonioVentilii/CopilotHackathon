// inherits from ControllerBase and generate a controller class
//  Add ApiController and Route attributes to the class.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnet.Models;

namespace dotnet.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        // create a private static list of users
        private static List<User> users = new List<User>();

        // create a method that returns a list of users
        [HttpGet]
        public List<User> Get()
        {
            return users;
        }

        // create a method that returns a single user
        [HttpGet("{id}")]
        public User Get(int id)
        {
            return users[id];
        }

        // create a method that creates a user
        [HttpPost]
        public User Post(User user)
        {
            users.Add(user);
            return user;
        }

        // create a method that updates a user
        [HttpPut("{id}")]
        public User Put(int id, User user)
        {
            users[id] = user;
            return user;
        }

        // create a method that deletes a user
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            users.RemoveAt(id);
        }
    }
}

