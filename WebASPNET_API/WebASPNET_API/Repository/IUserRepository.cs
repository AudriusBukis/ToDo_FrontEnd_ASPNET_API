using System.Collections.Generic;
using WebASPNET_API.Models;

namespace WebASPNET_API.Repository
{
    public interface IUserRepository 
    {
        public IEnumerable<User> GetAllUsers();
        public IEnumerable<User> AddNewUser(User user);
        public IEnumerable<User> UpdateUser(User user, int id);
        public IEnumerable<User> DeleteUser(int id);
    }
}
