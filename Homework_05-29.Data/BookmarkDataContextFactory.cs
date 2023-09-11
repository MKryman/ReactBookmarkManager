using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Homework_05_29.Data
{
    public class BookmarkDataContextFactory : IDesignTimeDbContextFactory<BookmarkDataContext>
    {
        public BookmarkDataContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}Homework_05-29.Web"))
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

            return new BookmarkDataContext(config.GetConnectionString("ConStr"));
        }
    }
}