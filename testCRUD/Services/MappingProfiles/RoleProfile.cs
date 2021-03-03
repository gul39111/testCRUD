using AutoMapper;
using testCRUD.Entities;
using testCRUD.Models;

namespace testCRUD.Services.MappingProfiles {
    public class RoleProfile : Profile {
        public RoleProfile() {
            CreateMap<Role, RoleModel>();
            CreateMap<RoleModel, Role>()
                .ForMember(dest => dest.UserRoles, opt => opt.Ignore());
        }
    }
}
