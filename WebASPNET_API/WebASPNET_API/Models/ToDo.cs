namespace WebASPNET_API.Models
{
    public class ToDo
    {
        public int Id { get; private set; }
        public string NameLastName { get; set; }
        public string ToDoType { get; set; }
        public string ToDoContext { get; set; }
        public string EndDateToDo { get; set; }
        public string ToDoDone { get; set; }

        public ToDo(string nameLastName, string toDoType, string toDoContext, string endDateToDo, string toDoDone)
        {
            Id = generateToDoId();
            NameLastName = nameLastName;
            ToDoType = toDoType;
            ToDoContext = toDoContext;
            EndDateToDo = endDateToDo;
            ToDoDone = toDoDone;
        }

        private static int toDoId = 0;
        static int generateToDoId()
        {
            return toDoId++ ;
        }
    }
}
