using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using WebASPNET_API.Models;
using WebASPNET_API.Repository;

namespace WebASPNET_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("GetAllUsers")]
        public IEnumerable<User> GetAllUsers()
        {
            return _userRepository.GetAllUsers();
        }
        [HttpPost("AddNewUser")]
        public IEnumerable<User> AddNewUser([FromBody] User user)
        {
            return _userRepository.AddNewUser(user);
        }
        [HttpPut("UpdateUser/{id}")]
        public IEnumerable<User> UpdateUser([FromBody] User user, int id)
        {
            return _userRepository.UpdateUser(user, id);
        }
        [HttpDelete("DelateUser/{id}")]
        public IEnumerable<User> DelateUser([FromRoute] int id)
        {
            return _userRepository.DeleteUser(id);
        }
    }
}
