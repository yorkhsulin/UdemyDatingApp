using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entites;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IMapper _mapper;
        
        private readonly IUserRespository _userRespository;
        public UsersController(IUserRespository userRespository , IMapper mapper)
        {
            _mapper = mapper;
            _userRespository = userRespository;            
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            
            var users = await _userRespository.GetMembersAsync();
            return Ok(users);
        }

        //aip/users/3
        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            return await _userRespository.GetMemberAsync(username);
        }
        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDTO memberUpdateDTO)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user =await  _userRespository.GetUserByUserNameAsync(username);
            _mapper.Map(memberUpdateDTO,user);
            _userRespository.Update(user);

            if (await _userRespository.SaveAllAsync()) return NoContent();
            return BadRequest("failed to update user");
        }

    }
}