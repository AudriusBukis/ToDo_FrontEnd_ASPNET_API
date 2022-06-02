namespace WebASPNET_API.Models
{
    public class User
    {
        public int Id { get; private set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

        public User(string name, string lastName, string email)
        {
            Id = generateId();
            Name = name;
            LastName = lastName;
            Email = email;
        }
        private static int id = 0;
        static int generateId()
        {
            return id++;
        }
    }
}
