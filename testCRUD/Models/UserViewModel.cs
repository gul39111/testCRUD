using System.Collections.Generic;

namespace testCRUD.Models {
    public class UserViewModel {
        public long Id { get; set; }
        public string Name { get; set; }

        public List<string> RolesNames { get; set; }
    }
}
