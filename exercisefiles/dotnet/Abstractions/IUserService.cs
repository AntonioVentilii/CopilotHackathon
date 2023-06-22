// generate an interface for the service

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnet.Models;

namespace dotnet.Abstractions
{
    public interface IUserService
    {
        // create a method that returns a list of users
        List<User> Get();

        // create a method that returns a single user
        User Get(int id);

        // create a method that creates a user
        User Create(User user);

        // create a method that updates a user
        User Update(int id, User user);

        // create a method that deletes a user
        void Delete(int id);
    }
}

