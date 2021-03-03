using System.Collections.Generic;

namespace testCRUD.Models {
    public class UserModel {
        public long? Id { get; set; }
        public string Name { get; set; }

        public List<long> RoleIds { get; set; }
    }
}
