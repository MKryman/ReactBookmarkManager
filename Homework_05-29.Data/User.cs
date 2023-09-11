using System.Text.Json.Serialization;

namespace Homework_05_29.Data
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        
        [JsonIgnore]
        public string PasswordHash { get; set; }
        public List<Bookmark> MyBookmarks { get; set; }
    }
}