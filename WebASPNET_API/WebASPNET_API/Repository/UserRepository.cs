using System.Collections.Generic;
using System.Linq;
using WebASPNET_API.Models;

namespace WebASPNET_API.Repository
{
    public class UserRepository : IUserRepository
    {
        private static readonly List<User> Users = new();
        public IEnumerable<User> GetAllUsers()
        {
            return Users;
        }
        public IEnumerable<User> AddNewUser(User user)
        {
            Users.Add(user);
            return Users;
        }
        public IEnumerable<User> UpdateUser(User user, int id)
        {
            var userToUpdate = Users.First(x => x.Id == id);
            userToUpdate.Name = user.Name;
            userToUpdate.LastName = user.LastName;
            userToUpdate.Email = user.Email;
            return Users;
        }
        public IEnumerable<User> DeleteUser(int id)
        {
            var userToDelate = Users.First(x => x.Id == id);
            Users.Remove(userToDelate);
            return Users;
        }
    }
}
