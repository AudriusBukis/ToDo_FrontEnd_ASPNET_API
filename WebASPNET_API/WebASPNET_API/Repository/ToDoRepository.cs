using System.Collections.Generic;
using System.Linq;
using WebASPNET_API.Models;

namespace WebASPNET_API.Repository
{

    public class ToDoRepository : IToDoRepository
    {
        public static List<ToDo> ToDoCards = new();
        public IEnumerable<ToDo> GetAllToDoCards()
        {
            return ToDoCards;
        }
        public IEnumerable<ToDo> AddNewToDoCard(ToDo toDo)
        {
            ToDoCards.Add(toDo);
            return ToDoCards;
        }
        public IEnumerable<ToDo> UpdateToDoCard( ToDo toDo, int id)
        {
            var toDoCardToUpdate = ToDoCards.First(x => x.Id == id);
            toDoCardToUpdate.NameLastName = toDo.NameLastName;
            toDoCardToUpdate.ToDoType = toDo.ToDoType;
            toDoCardToUpdate.ToDoContext = toDo.ToDoContext;
            toDoCardToUpdate.EndDateToDo = toDo.EndDateToDo;
            toDoCardToUpdate.ToDoDone = toDo.ToDoDone;
            return ToDoCards;
        }
        public IEnumerable<ToDo> DeleteToDoCard( int id)
        {
            var toDoCardToDelate = ToDoCards.First(x => x.Id == id);
            ToDoCards.Remove(toDoCardToDelate);
            return ToDoCards;
        }
    }
}
