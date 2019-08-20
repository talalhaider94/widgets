using System;
using System.Collections.Generic;
using System.Text;

namespace Quantis.WorkFlow.Services.DTOs.OracleAPI
{
    public class OracleUserDTO
    {
        public int user_id { get; set; }
        public string user_name { get; set; }
        public string user_email { get; set; }
        public List<OracleUserGroupsDTO> groups { get; set; }
        
    }
    public class OracleUserGroupsDTO
    {
        public int? user_group_id { get; set; }
        public string user_group_name { get; set; }
    }
}
