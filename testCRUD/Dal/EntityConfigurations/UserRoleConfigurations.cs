using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using testCRUD.Entities;

namespace testCRUD.Dal.EntityConfigurations {
    public class UserRoleConfiguration : IEntityTypeConfiguration<UserRole> {
        public void Configure(EntityTypeBuilder<UserRole> builder) {
            builder.ToTable("userroles");
        }
    }
}
