using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Homework_05_29.Data
{
    public class UserRepository
    {
        private readonly string _connectionString;

        public UserRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        
        public User GetUserByEmail(string email)
        {
            var context = new BookmarkDataContext(_connectionString);
            return context.Users.FirstOrDefault(u => u.Email == email);
        }

        public void AddUser(User user, string password)
        {
            var context = new BookmarkDataContext(_connectionString);

            var hash = BCrypt.Net.BCrypt.HashPassword(password);
            user.PasswordHash = hash;

            context.Users.Add(user);
            context.SaveChanges();
        }

        public User LoginUser(string email, string password)
        {
            var user = GetUserByEmail(email);
            if(user == null)
            {
                return null;
            }

            var isValidLogin = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            if (!isValidLogin)
            {
                return null;
            }

            return user;

        }

        
    }
}
