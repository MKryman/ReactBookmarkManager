using Homework_05_29.Data;
using Homework_05_29.Web.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Homework_05_29.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly string _connectionString;

        public AccountController(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("ConStr");
        }

        [HttpGet][Route("getcurrentuser")]
        public User GetCurrentUser()
        {
            var repo = new UserRepository(_connectionString);

            if (!User.Identity.IsAuthenticated)
            {
                return null;
            }

            return repo.GetUserByEmail(User.Identity.Name);
        }

        [HttpPost]
        [Route("signup")]
        public void Signup(SignupViewModel user)
        {
            var repo = new UserRepository(_connectionString);
            repo.AddUser(user, user.Password);
        }

        [HttpPost][Route("login")]
        public User Login(LoginViewModel login)
        {
            var repo = new UserRepository(_connectionString);
            var user = repo.LoginUser(login.Email, login.Password);

            if(user == null)
            {
                return null;
            }

            var claims = new List<Claim>
            {
                new Claim("user", login.Email)
            };

            HttpContext.SignInAsync(new ClaimsPrincipal(
                new ClaimsIdentity(claims, "Cookies", "user", "role"))).Wait();

            return user;
        }

        [HttpPost][Route("logout")]
        public void Logout()
        {
            HttpContext.SignOutAsync().Wait();
        }

    }
}
