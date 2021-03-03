using Microsoft.EntityFrameworkCore;
using testCRUD.Dal.EntityConfigurations;
using testCRUD.Entities;

namespace testCRUD.Dal {
    public class TestCRUDDbContext : DbContext
    {
        public TestCRUDDbContext(DbContextOptions<TestCRUDDbContext> options) : base(options)
        {

        }
        public DbSet<Role> Role { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<UserRole> UserRole { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder
                .ApplyConfiguration(new RoleConfiguration())
                .ApplyConfiguration(new UserRoleConfiguration())
                .ApplyConfiguration(new UserConfiguration());
       
        }
    }
}
