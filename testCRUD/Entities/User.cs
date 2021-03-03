using System.Collections.Generic;

namespace testCRUD.Entities {
    public class User {
        public long Id { get; set; }
        public string Name { get; set; }
        
        public ICollection<UserRole> UserRoles { get; set; }
    }
}
