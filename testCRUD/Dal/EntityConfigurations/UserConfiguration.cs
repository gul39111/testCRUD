using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using testCRUD.Entities;

namespace testCRUD.Dal.EntityConfigurations {
    public class UserConfiguration : IEntityTypeConfiguration<User> {
        public void Configure(EntityTypeBuilder<User> builder) {
            builder.ToTable("users");

            builder
                .HasMany(x => x.UserRoles)
                .WithOne(x => x.User)
                .HasForeignKey(x => x.UserId);
        }
    }
}
