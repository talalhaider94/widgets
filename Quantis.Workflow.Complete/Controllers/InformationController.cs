﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Quantis.WorkFlow.Services;
using Quantis.WorkFlow.Services.API;
using Quantis.WorkFlow.Services.DTOs.BusinessLogic;
using Quantis.WorkFlow.Services.DTOs.Information;
using Quantis.WorkFlow.Services.Framework;

namespace Quantis.WorkFlow.Complete.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class InformationController : ControllerBase
    {
        private IInformationService _infomationAPI { get; set; }
        public InformationController(IInformationService infomationAPI)
        {
            _infomationAPI = infomationAPI;
        }
        [Authorize(WorkFlowPermissions.VIEW_CONFIGURAION_GENERAL)]
        [HttpGet("GetAllBasicConfigurations")]
        public List<ConfigurationDTO> GetAllBasicConfigurations()
        {
            return _infomationAPI.GetAllBasicConfigurations();
        }
        [Authorize(WorkFlowPermissions.VIEW_CONFIGURATION_ADVANCED)]
        [HttpGet("GetAllAdvancedConfigurations")]
        public List<ConfigurationDTO> GetAllAdvancedConfigurations()
        {
            return _infomationAPI.GetAllAdvancedConfigurations();
        }
        [Authorize(WorkFlowPermissions.VIEW_CONFIGURAION_GENERAL)]
        [HttpGet("DeleteBasicConfiguration")]
        public void DeleteBasicConfiguration(string owner, string key)
        {
            _infomationAPI.DeleteConfiguration(owner, key);
        }
        [Authorize(WorkFlowPermissions.VIEW_CONFIGURATION_ADVANCED)]
        [HttpGet("DeleteAdvancedConfiguration")]
        public void DeleteAdvancedConfiguration(string owner, string key)
        {
            _infomationAPI.DeleteConfiguration(owner, key);
        }
        [Authorize(WorkFlowPermissions.VIEW_CONFIGURAION_GENERAL)]
        [HttpPost("AddUpdateBasicConfiguration")]
        public void AddUpdateBasicConfiguration([FromBody]ConfigurationDTO dto)
        {
            _infomationAPI.AddUpdateBasicConfiguration(dto);
        }
        [Authorize(WorkFlowPermissions.VIEW_CONFIGURATION_ADVANCED)]
        [HttpPost("AddUpdateAdvancedConfiguration")]
        public void AddUpdateAdvancedConfiguration([FromBody]ConfigurationDTO dto)
        {
            _infomationAPI.AddUpdateAdvancedConfiguration(dto);
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpGet("GetAllRoles")]
        public List<BaseNameCodeDTO> GetAllRoles()
        {
            return _infomationAPI.GetAllRoles();
        }
        [Authorize(WorkFlowPermissions.VIEW_CONFIGURATION_USER_ROLES)]
        [HttpPost("AddUpdateRole")]
        public void AddUpdateRole([FromBody]BaseNameCodeDTO dto)
        {
            _infomationAPI.AddUpdateRole(dto);
        }
        [Authorize(WorkFlowPermissions.VIEW_CONFIGURATION_ROLES)]
        [HttpGet("DeleteRole")]
        public void DeleteRole(int roleId)
        {
            _infomationAPI.DeleteRole(roleId);
        }
        [Authorize(WorkFlowPermissions.VIEW_CONFIGURATION_USER_ROLES)]
        [HttpGet("GetAllPermissions")]
        public List<PermissionDTO> GetAllPermissions()
        {
            return _infomationAPI.GetAllPermissions();
        }
        [Authorize(WorkFlowPermissions.VIEW_CONFIGURATION_USER_ROLES)]
        [HttpGet("GetRolesByUserId")]
        public List<BaseNameCodeDTO> GetRolesByUserId(int userid)
        {
            return _infomationAPI.GetRolesByUserId(userid);
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpGet("GetPermissionsByUserId")]
        public List<PermissionDTO> GetPermissionsByUserId(int userid)
        {
            return _infomationAPI.GetPermissionsByUserId(userid);
        }
        [Authorize(WorkFlowPermissions.VIEW_CONFIGURATION_USER_ROLES)]
        [HttpGet("GetPermissionsByRoleID")]
        public List<PermissionDTO> GetPermissionsByRoleID(int roleId)
        {
            return _infomationAPI.GetPermissionsByRoleID(roleId);
        }
        [Authorize(WorkFlowPermissions.VIEW_CONFIGURATION_ROLES)]
        [HttpPost("AssignRolesToUser")]
        public void AssignRolesToUser([FromBody]MultipleRecordsDTO dto)
        {
            _infomationAPI.AssignRolesToUser(dto);
        }
        [Authorize(WorkFlowPermissions.VIEW_CONFIGURATION_USER_ROLES)]
        [HttpPost("AssignPermissionsToRoles")]
        public void AssignPermissionsToRoles([FromBody]MultipleRecordsDTO dto)
        {
            _infomationAPI.AssignPermissionsToRoles(dto);
        }
        [Authorize(WorkFlowPermissions.VIEW_CONFIGURATION_SDM_TICKET_STATUS)]
        [HttpGet("GetAllSDMStatusConfigurations")]
        public List<SDMStatusDTO> GetAllSDMStatusConfigurations()
        {
            return _infomationAPI.GetAllSDMStatusConfigurations();
        }
        [Authorize(WorkFlowPermissions.VIEW_CONFIGURATION_SDM_GROUP)]
        [HttpGet("GetAllSDMGroupConfigurations")]
        public List<SDMGroupDTO> GetAllSDMGroupConfigurations()
        {
            return _infomationAPI.GetAllSDMGroupConfigurations();
        }
        [Authorize(WorkFlowPermissions.VIEW_CONFIGURATION_SDM_GROUP)]
        [HttpGet("DeleteSDMGroupConfiguration/{id}")]
        public void DeleteSDMGroupConfiguration(int id)
        {
            _infomationAPI.DeleteSDMGroupConfiguration(id);
        }
        [Authorize(WorkFlowPermissions.VIEW_CONFIGURATION_SDM_TICKET_STATUS)]
        [HttpGet("DeleteSDMStatusConfiguration/{id}")]
        public void DeleteSDMStatusConfiguration(int id)
        {
            _infomationAPI.DeleteSDMStatusConfiguration(id);
        }
        [Authorize(WorkFlowPermissions.VIEW_CONFIGURATION_SDM_TICKET_STATUS)]
        [HttpPost("AddUpdateSDMStatusConfiguration")]
        public void AddUpdateSDMStatusConfiguration([FromBody]SDMStatusDTO dto)
        {
            _infomationAPI.AddUpdateSDMStatusConfiguration(dto);
        }
        [Authorize(WorkFlowPermissions.VIEW_CONFIGURATION_SDM_GROUP)]
        [HttpPost("AddUpdateSDMGroupConfiguration")]
        public void AddUpdateSDMGroupConfiguration([FromBody]SDMGroupDTO dto)
        {
            _infomationAPI.AddUpdateSDMGroupConfiguration(dto);
        }
        [Authorize(WorkFlowPermissions.VIEW_CONFIGURATION_USER_PROFILING)]
        [HttpGet("GetAllContractPariesByUserId")]
        public List<BaseNameCodeDTO> GetAllContractPariesByUserId(int userId)
        {
            return _infomationAPI.GetAllContractPariesByUserId(userId);
        }
        [Authorize(WorkFlowPermissions.VIEW_CONFIGURATION_USER_PROFILING)]
        [HttpGet("GetAllContractsByUserId")]
        public List<BaseNameCodeDTO> GetAllContractsByUserId(int userId, int contractpartyId)
        {
            return _infomationAPI.GetAllContractsByUserId(userId, contractpartyId);
        }
        [Authorize(WorkFlowPermissions.VIEW_CONFIGURATION_USER_PROFILING)]
        [HttpGet("GetAllKpisByUserId")]
        public List<BaseNameCodeDTO> GetAllKpisByUserId(int userId, int contractId)
        {
            return _infomationAPI.GetAllKpisByUserId(userId,contractId);
        }
        [Authorize(WorkFlowPermissions.VIEW_CONFIGURATION_USER_PROFILING)]
        [HttpGet("AssignKpisToUserByContractParty")]
        public void AssignKpisToUserByContractParty(int userId, int contractpartyId, bool assign)
        {
            _infomationAPI.AssignKpisToUserByContractParty(userId,contractpartyId,assign);
        }
        [Authorize(WorkFlowPermissions.VIEW_CONFIGURATION_USER_PROFILING)]
        [HttpGet("AssignKpisToUserByContract")]
        public void AssignKpisToUserByContract(int userId, int contractId, bool assign)
        {
            _infomationAPI.AssignKpisToUserByContract(userId,contractId,assign);
        }
        [Authorize(WorkFlowPermissions.VIEW_CONFIGURATION_USER_PROFILING)]
        [HttpPost("AssignKpisToUserByKpis")]
        public void AssignKpisToUserByKpis(AssignKPIDTO dto)
        {
            _infomationAPI.AssignKpisToUserByKpis(dto.userId, dto.contractId, dto.kpiIds);
        }
        [Authorize(WorkFlowPermissions.VIEW_CONFIGURATION_USER_PROFILING)]
        [HttpGet("GetGlobalRulesByUserId")]
        public List<int> GetGlobalRulesByUserId(int userId)
        {
            return _infomationAPI.GetGlobalRulesByUserId(userId);
        }
        [Authorize(WorkFlowPermissions.VIEW_CONFIGURATION_USER_PROFILING)]
        [HttpPost("AssignGlobalRulesToUserId")]
        public void AssignGlobalRulesToUserId([FromBody]MultipleRecordsDTO dto)
        {
            _infomationAPI.AssignGlobalRulesToUserId(dto);
        }
        [HttpGet("GetVersion")]
        public IActionResult GetVersion()
        {
            var json = new { API = "v. 1.3.3", UI = "v. 1.3.3b" };
            return Ok(json);
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpGet("CheckLogin")]
        public IActionResult CheckLogin()
        {
            var json = new { ACTIVE = true };
            return Ok(json);
        }
        [Authorize(WorkFlowPermissions.VIEW_BSI_LINK)]
        [HttpGet("GetBSILink")]
        public string GetBSILink()
        {
            var conf=_infomationAPI.GetConfiguration("bsi_server", "bsi_webserver");
            return (conf==null)?null:conf.Value;
        }

    }
}