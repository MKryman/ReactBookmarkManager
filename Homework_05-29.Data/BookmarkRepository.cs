using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Homework_05_29.Data
{
    public class BookmarkRepository
    {
        private readonly string _connectionString;

        public BookmarkRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddBookmark(Bookmark bkmk)
        {
            using var context = new BookmarkDataContext(_connectionString);
            context.Add(bkmk);
            context.SaveChanges();
        }

        public List<Bookmark> GetBookmarksForUser(string email)
        {
            using var context = new BookmarkDataContext(_connectionString);
            UserRepository repo = new(_connectionString);
            var user = repo.GetUserByEmail(email);
            user.MyBookmarks = context.Bookmarks.Where(b => b.UserId == user.Id).ToList();
            return user.MyBookmarks;
        }

        public List<object> GetBookmarksWithHighestCounts()
        {
            using var context = new BookmarkDataContext(_connectionString);
            var query = context.Bookmarks
                         .GroupBy(b => b.Link)
                         .Select(g => new { Link = g.Key, Count = g.Count() })
                         .OrderByDescending(g => g.Count)
                         .Take(5).ToList();

            return query.Cast<object>().ToList();
        }

        public void UpdateBookmark(Bookmark bkmk)
        {
            using var context = new BookmarkDataContext(_connectionString);
            //context.Database.ExecuteSqlInterpolated($"UPDATE Bookmarks SET Title = {bkmk.Title} WHERE Id = {bkmk.Id}");
            context.Update(bkmk);
            context.SaveChanges();
        }

        public void DeleteBookmark(int bookmarkId)
        {
            using var context = new BookmarkDataContext(_connectionString);
            var bookmarkRemove = context.Bookmarks.FirstOrDefault(b => b.Id == bookmarkId);
            context.Bookmarks.Remove(bookmarkRemove);
            context.SaveChanges();
        }
    }
}
