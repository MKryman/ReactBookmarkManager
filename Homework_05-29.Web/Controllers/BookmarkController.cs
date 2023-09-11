using Homework_05_29.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography.Xml;

namespace Homework_05_29.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarkController : ControllerBase
    {
        private readonly string _connectionString;

        public BookmarkController(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("loadhomepage")]
        public List<object> GetTop5MostPopular()
        {
            var repo = new BookmarkRepository(_connectionString);
            return repo.GetBookmarksWithHighestCounts();
        }

        [HttpGet]
        [Route("getmybookmarks")]
        [Authorize]
        public List<Bookmark> GetMyBookmarks()
        {
            var repo = new BookmarkRepository(_connectionString);
            return repo.GetBookmarksForUser(User.Identity.Name);
        }

        [HttpPost]
        [Route("addbookmark")]
        [Authorize]
        public void AddBookmark(Bookmark bkmk)
        {
            var repo = new BookmarkRepository(_connectionString);
            var userRepo = new UserRepository(_connectionString);
            var userId = userRepo.GetUserByEmail(User.Identity.Name).Id;
            bkmk.UserId = userId;
            repo.AddBookmark(bkmk);
        }

        [HttpPost]
        [Route("update")]
        [Authorize]
        public void Update(Bookmark bookmark)
        {
            var repo = new BookmarkRepository(_connectionString);
            repo.UpdateBookmark(bookmark);
        }

        [HttpPost]
        [Route("delete")]
        [Authorize]
        public void Delete(Bookmark bookmark)
        {
            var repo = new BookmarkRepository(_connectionString);
            repo.DeleteBookmark(bookmark.Id);
        }
    }
}
