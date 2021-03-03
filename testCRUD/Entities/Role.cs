using System.Collections.Generic;

namespace testCRUD.Entities {
    public class Role {
        public long Id { get; set; }
        public string Name { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
    }
}
