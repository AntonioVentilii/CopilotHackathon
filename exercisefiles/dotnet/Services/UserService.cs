// implement the interface in the service class

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnet.Abstractions;
using dotnet.Models;

namespace dotnet.Services
{
    public class UserService : IUserService
    {
        // create a private static list of users
        private static List<User> users = new List<User>();

        // create a method that returns a list of users
        public List<User> Get()
        {
            return users;
        }

        // create a method that returns a single user
        public User Get(int id)
        {
            return users[id];
        }

        // create a method that creates a user
        public User Create(User user)
        {
            users.Add(user);
            return user;
        }

        // create a method that updates a user
        public User Update(int id, User user)
        {
            users[id] = user;
            return user;
        }

        // create a method that deletes a user
        public void Delete(int id)
        {
            users.RemoveAt(id);
        }
    }
}
