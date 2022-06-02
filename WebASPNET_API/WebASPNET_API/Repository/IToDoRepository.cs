using System.Collections.Generic;
using WebASPNET_API.Models;

namespace WebASPNET_API.Repository
{
    public interface IToDoRepository
    {
        public IEnumerable<ToDo> GetAllToDoCards();
        public IEnumerable<ToDo> AddNewToDoCard(ToDo toDo);
        public IEnumerable<ToDo> UpdateToDoCard(ToDo toDo, int id);
        public IEnumerable<ToDo> DeleteToDoCard(int id);

    }
}
