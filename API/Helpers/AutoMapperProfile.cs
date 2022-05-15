using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entites;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<AppUser,MemberDto>()
            .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => 
              src.Photos.FirstOrDefault(x => x.IsMain).Url))
            .ForMember(dest=>dest.Age , opt=> opt.MapFrom(src=>
              src.DateOfBirth.CalculatAge()));

            CreateMap<Photo,PhotoDto>();
        }
    }
}