using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using testCRUD.Entities;

namespace testCRUD.Dal.EntityConfigurations {
    public class RoleConfiguration : IEntityTypeConfiguration<Role> {
        public void Configure(EntityTypeBuilder<Role> builder) {
            builder.ToTable("roles");
            builder
                .HasKey(x => x.Id);
            builder
                .HasMany(x => x.UserRoles)
                .WithOne(x => x.Role)
                .HasForeignKey(x => x.RoleId);
        }
    }
}
