using System.Collections.Generic;
using System.Threading.Tasks;
using testCRUD.Models;

namespace testCRUD.Services.Interfaces
{
    public interface IRoleService
    {
        Task<RoleModel> CreateRoleAsync(RoleModel model);
        Task<RoleModel> UpdateRoleAsync(RoleModel model);
        Task<long> DeleteRoleAsync(long id);

        Task<RoleModel> GetRoleAsync(long id);
        Task<List<RoleModel>> GetAllRolesAsync();

    }
}
