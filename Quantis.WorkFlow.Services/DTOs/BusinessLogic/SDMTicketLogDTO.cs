﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Quantis.WorkFlow.Services.DTOs.BusinessLogic
{
    public class SDMTicketLogDTO
    {
        public string LogId { get; set; }
        public string TicketHandler { get; set; }
        public string TicketStatus { get; set; }
        public string MsgBody { get; set; }
        public string TimeStamp { get; set; }
        public string ActionDescription { get; set; }
        public string Description { get; set; }
    }
}
