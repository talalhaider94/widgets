﻿using Quantis.WorkFlow.APIBase.Framework;
using Quantis.WorkFlow.Models.Dashboard;
using Quantis.WorkFlow.Services.DTOs.Dashboard;
using System;
using System.Collections.Generic;
using System.Text;

namespace Quantis.WorkFlow.APIBase.Mappers.Dashboard
{
    public class DashboardMapper : MappingService<DashboardDTO, DB_Dashboard>
    {
        public override DashboardDTO GetDTO(DB_Dashboard e)
        {
            return new DashboardDTO()
            {
                CreatedOn = e.CreatedOn,
                Id = e.Id,
                Name = e.Name,
                Owner=e.User.user_name
            };
        }

        public override DB_Dashboard GetEntity(DashboardDTO o, DB_Dashboard e)
        {
            e.Name = o.Name;
            return e;
        }
    }
}
