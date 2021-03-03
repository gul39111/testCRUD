using AutoMapper;
using System.Linq;
using testCRUD.Entities;
using testCRUD.Models;

namespace testCRUD.Services.MappingProfiles {
    public class UserProfile : Profile {
        public UserProfile() {
            CreateMap<User, UserModel>()
                .ForMember(dest => dest.RoleIds, opt => opt.MapFrom(src => src.UserRoles.Select(y => y.RoleId)));
            CreateMap<UserModel, User>()
                .ForMember(dest => dest.UserRoles, opt => opt.Ignore());

            CreateMap<User, UserViewModel>()
                .ForMember(dest => dest.RolesNames,
                    opt => opt.MapFrom(src => src.UserRoles.Select(x => x.Role.Name)));
            CreateMap<UserViewModel, User>()
                .ForMember(dest => dest.UserRoles, opt => opt.Ignore());
        }
    }
}
