using AutoMapper;
using testCRUD.Entities;
using testCRUD.Models;

namespace testCRUD.Services.MappingProfiles {
    public class UserRoleProfile : Profile {
        public UserRoleProfile() {
            CreateMap<UserRole, UserRoleModel>();
            CreateMap<UserRoleModel, UserRole>()
                .ForMember(dest => dest.User, opt => opt.Ignore())
                .ForMember(dest => dest.Role, opt => opt.Ignore());
        }
    }
}
