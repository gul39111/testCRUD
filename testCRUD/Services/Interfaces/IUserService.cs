using System.Collections.Generic;
using System.Threading.Tasks;
using testCRUD.Models;

namespace testCRUD.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserViewModel> CreateUserAsync(UserModel model);
        Task<UserViewModel> UpdateUserAsync(UserModel model);
        Task<long> DeleteUserAsync(long id);

        Task<UserModel> GetUserAsync(long id);
        Task<List<UserViewModel>> GetAllUsersAsync();

    }
}
