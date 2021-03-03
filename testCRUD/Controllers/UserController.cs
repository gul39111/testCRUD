using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;
using testCRUD.Models;
using testCRUD.Services.Interfaces;

namespace testCRUD.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IServiceProvider serviceProvider)
        {
            _userService = serviceProvider.GetRequiredService<IUserService>();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GeUserAsync(long id)
        {
            return Ok(await _userService.GetUserAsync(id));
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsersAsync()
        {
            return Ok(await _userService.GetAllUsersAsync());
        }

        [HttpPost]
        public async Task<IActionResult> CreateUserAsync(UserModel model)
        {
            return Ok(await _userService.CreateUserAsync(model));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUserAsync(UserModel model)
        {
            return Ok(await _userService.UpdateUserAsync(model));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserAsync(long id)
        {
            return Ok(await _userService.DeleteUserAsync(id));
        }
    }
}
