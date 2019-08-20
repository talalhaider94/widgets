﻿using Quantis.WorkFlow.Services.DTOs.Information;
using System;
using System.Collections.Generic;
using System.Text;

namespace Quantis.WorkFlow.Services.DTOs.API
{
    public class LoginResultDTO
    {
        public int UserID { get; set; }
        public int LocaleID { get; set; }
        public string Token { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsSuperAdmin { get; set; }
        public string UserEmail { get; set; }
        public string UserName { get; set; }
        public List<string> Permissions { get; set; }
    }
}
