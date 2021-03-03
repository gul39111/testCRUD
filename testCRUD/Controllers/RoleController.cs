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
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;
        public RoleController(IServiceProvider serviceProvider)
        {
            _roleService = serviceProvider.GetRequiredService<IRoleService>();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoleAsync(long id)
        {
            return Ok(await _roleService.GetRoleAsync(id));
        }

        [HttpGet]
        public async Task<IActionResult> GetAllRolesAsync()
        {
            return Ok(await _roleService.GetAllRolesAsync());
        }

        [HttpPost]
        public async Task<IActionResult> CreateRoleAsync(RoleModel model)
        {
            return Ok(await _roleService.CreateRoleAsync(model));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateRoleAsync(RoleModel model)
        {
            return Ok(await _roleService.UpdateRoleAsync(model));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoleAsync(long id)
        {
            return Ok(await _roleService.DeleteRoleAsync(id));
        }
    }
}
