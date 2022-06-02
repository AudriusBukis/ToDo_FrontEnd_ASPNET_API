using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using WebASPNET_API.Models;
using WebASPNET_API.Repository;

namespace WebASPNET_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ToDoCardsController : ControllerBase
    {
        private readonly IToDoRepository _toDoRepository;
        public ToDoCardsController(IToDoRepository toDoRepository)
        {
            _toDoRepository = toDoRepository;
        }
        [HttpGet("GetAllToDoCards")]
        public IEnumerable<ToDo> GetAllToDoCards()
        {
            return _toDoRepository.GetAllToDoCards();
        }
        [HttpPost("AddNewToDoCard")]
        public IEnumerable<ToDo> AddNewToDoCard([FromBody] ToDo toDo)
        {
            return _toDoRepository.AddNewToDoCard(toDo);
        }
        [HttpPut("UpdateToDoCard/{id}")]
        public IEnumerable<ToDo> UpdateToDoCard([FromBody] ToDo toDo, int id)
        {
            return _toDoRepository.UpdateToDoCard(toDo, id);
        }
        [HttpDelete("DelateToDoCard/{id}")]
        public IEnumerable<ToDo> DelateToDoCard([FromRoute] int id)
        {
            return _toDoRepository.DeleteToDoCard(id);
        }
    }
}
