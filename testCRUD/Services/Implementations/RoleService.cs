using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using testCRUD.Dal;
using testCRUD.Entities;
using testCRUD.Models;
using testCRUD.Services.Interfaces;

namespace testCRUD.Services.Implementations
{
    public class RoleService : IRoleService
    {
        protected readonly TestCRUDDbContext dbContext;
        protected readonly IMapper mapper;

        public RoleService(IServiceProvider serviceProvider)
        {
            dbContext = serviceProvider.GetRequiredService<TestCRUDDbContext>();
            mapper = serviceProvider.GetRequiredService<IMapper>();
        }
        public async Task<RoleModel> CreateRoleAsync(RoleModel model)
        {
            var entity = mapper.Map<RoleModel, Role>(model);
            await dbContext.Role.AddAsync(entity);
            await dbContext.SaveChangesAsync();
            return mapper.Map<Role, RoleModel>(entity);
        }

        public async Task<long> DeleteRoleAsync(long id)
        {
            if (await dbContext.UserRole.AnyAsync(x => x.RoleId == id))
            {
                throw new Exception("User with this role exist");
            }
            var entity = await dbContext.Role.FindAsync(id);
            dbContext.Role.Remove(entity);
            await dbContext.SaveChangesAsync();
            return id;
        }

        public async Task<List<RoleModel>> GetAllRolesAsync()
        {
            var entities = await dbContext.Role.ToListAsync();
            return mapper.Map<List<Role>, List<RoleModel>>(entities);
        }

        public async Task<RoleModel> GetRoleAsync(long id)
        {
            var entity = await dbContext.Role.FindAsync(id);
            return mapper.Map<Role, RoleModel>(entity);
        }

        public async Task<RoleModel> UpdateRoleAsync(RoleModel model)
        {
            var entity = mapper.Map<RoleModel, Role>(model);
            dbContext.Entry(entity).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
            return mapper.Map<Role, RoleModel>(entity);
        }
    }
}
