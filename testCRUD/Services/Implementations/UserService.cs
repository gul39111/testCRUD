using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using testCRUD.Dal;
using testCRUD.Entities;
using testCRUD.Models;
using testCRUD.Services.Interfaces;

namespace testCRUD.Services.Implementations
{
    public class UserService : IUserService
    {
        protected readonly TestCRUDDbContext dbContext;
        protected readonly IMapper mapper;

        public UserService(IServiceProvider serviceProvider)
        {
            dbContext = serviceProvider.GetRequiredService<TestCRUDDbContext>();
            mapper = serviceProvider.GetRequiredService<IMapper>();
        }
        public async Task<UserViewModel> CreateUserAsync(UserModel model)
        {
            var entity = mapper.Map<UserModel, User>(model);
            var user = await dbContext.User.AddAsync(entity);
            await dbContext.SaveChangesAsync();
            if (model.RoleIds != null && model.RoleIds.Count > 0)
            {
                var userRoles = new List<UserRole>();
                foreach (var roleId in model.RoleIds)
                {
                        userRoles.Add(new UserRole { 
                            UserId = user.Entity.Id,
                            RoleId = roleId
                        });

                }
                dbContext.UserRole.AddRange(userRoles);
            }
            await dbContext.SaveChangesAsync();
            return mapper.Map<User, UserViewModel>(entity);
        }

        public async Task<long> DeleteUserAsync(long id)
        {
            var entity = await dbContext.User.FindAsync(id);
            dbContext.User.Remove(entity);
            await dbContext.SaveChangesAsync();
            return id;
        }

        public async Task<List<UserViewModel>> GetAllUsersAsync()
        {
            var entities = await dbContext.User.Include(x => x.UserRoles).ToListAsync();
            foreach (var entity in entities)
            {
                foreach (var userRole in entity.UserRoles)
                {
                    userRole.Role = dbContext.Role.Find(userRole.RoleId);
                }
            }
            var models = mapper.Map<List<User>, List<UserViewModel>>(entities);
            return models;
        }

        public async Task<UserModel> GetUserAsync(long id)
        {
            var entity = await dbContext.User.Include(x => x.UserRoles).Where(y => y.Id == id).ToListAsync();
            return mapper.Map<User, UserModel>(entity.FirstOrDefault());
        }

        public async Task<UserViewModel> UpdateUserAsync(UserModel model)
        {
            var entity = mapper.Map<UserModel, User>(model);
            dbContext.User.Update(entity);
            var userRoles = await dbContext.UserRole.Where(x => x.UserId == model.Id).ToListAsync();
            var createRolesIds = new List<long>();
            var createRoles = new List<UserRole>();
            var deleteRoles = new List<UserRole>();
            if (userRoles != null && userRoles.Count > 0 && model.RoleIds != null && model.RoleIds.Count > 0)
            {
                deleteRoles.AddRange(userRoles.Where(x => model.RoleIds.All(y => y != x.RoleId)));
                createRolesIds.AddRange(model.RoleIds?.Where(x => userRoles.All(y => y.RoleId != x)));
            }
            else if (userRoles == null)
            {
                createRolesIds.AddRange(model.RoleIds);
            }
            else if (model.RoleIds == null)
            {
                deleteRoles.AddRange(userRoles);
            }
            if (createRolesIds.Count > 0)
            {
                foreach (var roleId in createRolesIds)
                {
                    createRoles.Add(new UserRole
                    {
                        RoleId = roleId,
                        UserId = model.Id.Value
                    });
                }
            }
            if (createRoles.Count > 0)
            {
                dbContext.UserRole.AddRange(createRoles);
            }
            if (deleteRoles.Count > 0)
            {
                dbContext.UserRole.RemoveRange(deleteRoles);
            }
            
            await dbContext.SaveChangesAsync();
            return mapper.Map<User, UserViewModel>(entity);
        }
    }
}
