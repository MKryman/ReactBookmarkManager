using System.Text.Json.Serialization;

namespace Homework_05_29.Data
{
    public class Bookmark
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Link { get; set; }
        public int UserId { get; set; }

        [JsonIgnore]
        public User BookmarksUser { get; set; }
    }
}