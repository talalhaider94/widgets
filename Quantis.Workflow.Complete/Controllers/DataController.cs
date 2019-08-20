﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Quantis.WorkFlow.Services;
using Quantis.WorkFlow.Services.API;
using Quantis.WorkFlow.Services.DTOs.API;
using Quantis.WorkFlow.Services.Framework;

namespace Quantis.WorkFlow.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class DataController : ControllerBase
    {
        private IDataService _dataAPI { get; set; }
        private IInformationService _informationAPI { get; set; }
        public DataController(IDataService dataAPI,IInformationService informationAPI)
        {
            _dataAPI = dataAPI;
            _informationAPI = informationAPI;
        }
        [HttpGet("CronJobsScheduler")]
        public bool CronJobsScheduler()
        {
            return _dataAPI.CronJobsScheduler();
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpGet("GetAllWidgets")]
        public List<WidgetDTO> GetAllWidgets()
        {
            return _dataAPI.GetAllWidgets();
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpGet("RemoveAttachment/{id}")]
        public bool RemoveAttachment(int id)
        {
            return _dataAPI.RemoveAttachment(id);
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpGet("GetEmailHistory")]
        public List<NotifierLogDTO> GetEmailHistory()
        {
            return _dataAPI.GetEmailHistory();
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpGet("GetWidgetById/{id}")]
        public WidgetDTO GetWidgetById(int id)
        {
            return _dataAPI.GetWidgetById(id);
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpPost("AddUpdateWidget")]
        public bool AddUpdateWidget([FromBody]WidgetDTO dto)
        {
            return _dataAPI.AddUpdateWidget(dto);
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpPost("GetAllPagedUsers")]
        public PagedList<UserDTO> GetAllPagedUsers([FromBody]UserFilterDTO filter)
        {
            return _dataAPI.GetAllPagedUsers(filter);
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpGet("GetAllUsers")]
        public List<UserDTO> GetAllUsers()
        {
            return _dataAPI.GetAllUsers();
        }
        [Authorize(WorkFlowPermissions.VIEW_CONFIGURATION_USER_ROLES)]
        [HttpGet("GetUsersByRoleId")]
        public List<UserDTO> GetUsersByRoleId(int roleId)
        {
            return _dataAPI.GetUsersByRoleId(roleId);
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpGet("GetUserById")]
        public UserDTO GetUserById(string UserId)
        {
            return _dataAPI.GetUserById(UserId);
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpPost("AddUpdateUser")]
        public bool AddUpdateUser([FromBody]UserDTO dto)
        {
            return _dataAPI.AddUpdateUser(dto);
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpGet("GetAllPages")]
        public List<PageDTO> GetAllPages()
        {
            return _dataAPI.GetAllPages();
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpGet("GetPageById/{id}")]
        public PageDTO GetPageById(int id)
        {
            return _dataAPI.GetPageById(id);
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpPost("AddUpdatePage")]
        public bool AddUpdatePage([FromBody]PageDTO dto)
        {
            return _dataAPI.AddUpdatePage(dto);
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpGet("GetAllGroups")]
        public List<GroupDTO> GetAllGroups()
        {
            return _dataAPI.GetAllGroups();
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpGet("GetGroupById/{id}")]
        public GroupDTO GetGroupById(int id)
        {
            return _dataAPI.GetGroupById(id);
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpPost("AddUpdateGroup")]
        public bool AddUpdateGroup([FromBody]GroupDTO dto)
        {
            return _dataAPI.AddUpdateGroup(dto);
        }
        [Authorize(WorkFlowPermissions.VIEW_CATALOG_KPI)]
        [HttpGet("GetAllKpis")]
        public List<CatalogKpiDTO> GetAllKpis()
        {
            return _dataAPI.GetAllKpis();
        }
        [Authorize(WorkFlowPermissions.VIEW_CATALOG_KPI)]
        [HttpGet("GetKpiById/{id}")]
        public CatalogKpiDTO GetKpiById(int id)
        {
            return _dataAPI.GetKpiById(id);
        }
        [Authorize(WorkFlowPermissions.VIEW_CATALOG_KPI)]
        [HttpPost("AddUpdateKpi")]
        public bool AddUpdateKpi([FromBody]CatalogKpiDTO dto)
        {
            return _dataAPI.AddUpdateKpi(dto);
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpGet("GetKpiByFormId/{id}")]
        public List<KPIOnlyContractDTO> GetKpiByFormId(int id)
        {
            return _dataAPI.GetKpiByFormId(id);
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpGet("GetFormRuleByFormId/{id}")]
        public FormRuleDTO GetFormRuleByFormId(int id)
        {
            return _dataAPI.GetFormRuleByFormId(id);
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpPost("AddUpdateFormRule")]
        public bool AddUpdateFormRule([FromBody]FormRuleDTO dto)
        {
            return _dataAPI.AddUpdateFormRule(dto);
        }
        [HttpGet("Login")]
        public IActionResult Login(string username, string password)
        {
            var data = _dataAPI.Login(username, password);
            if (data != null) {
                return Ok(data);
            }
            var json = new { error = "Errore durente il Login", description = "Username o Password errati." };
            return StatusCode(StatusCodes.Status403Forbidden, json);
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpGet("Logout")]
        public void Logout()
        {
            var usr = (HttpContext.User) as AuthUser;
            if (usr != null)
            {
                _dataAPI.Logout(usr.SessionToken);
            }            
        }
        [HttpGet("ResetPassword")]
        public bool ResetPassword(string username, string email)
        {
            return _dataAPI.ResetPassword(username, email);
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpPost("SubmitForm")]
        [DisableRequestSizeLimit]
        public bool SubmitForm([FromBody]SubmitFormDTO dto)
        {
            return _dataAPI.SumbitForm(dto);
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpPost("SubmitAttachment")]
        [DisableRequestSizeLimit]
        public bool SubmitAttachment([FromBody]List<FormAttachmentDTO> dto)
        {
            return _dataAPI.SubmitAttachment(dto);
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpGet("GetAttachmentsByFormId")]
        public List<FormAttachmentDTO> GetAttachmentsByFormId(int formId)
        {
            return _dataAPI.GetAttachmentsByFormId(formId);
        }
        [Authorize(WorkFlowPermissions.VIEW_CATALOG_UTENTI)]
        [HttpGet("GetAllTUsers")]
        public List<TUserDTO> GetAllTUsers()
        {
            return _dataAPI.GetAllTUsers();
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpPost("ArchiveKPIs")]
        public int ArchiveKPIs([FromBody]ArchiveKPIDTO dto)
        {
            return _dataAPI.ArchiveKPIs(dto);
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpGet("GetAllForms")]
        public List<FormLVDTO> GetAllForms()
        {
            return _dataAPI.GetAllForms();
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpGet("GetAllAPIs")]
        public List<ApiDetailsDTO> GetAllAPIs()
        {
            return _dataAPI.GetAllAPIs();
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpGet("GetAllArchivedKPIs")]
        public List<ARulesDTO> GetAllArchivedKPIs(string month, string year, string id_kpi)
        {
            var user = HttpContext.User as AuthUser;
            var globalrules=_informationAPI.GetGlobalRulesByUserId(user.UserId);
            return _dataAPI.GetAllArchivedKPIs(month, year, id_kpi, globalrules);
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpGet("GetAllKpisByUserId")]
        public List<CatalogKpiDTO> GetAllKpisByUserId()
        {
            var user = HttpContext.User as AuthUser;
            var globalrules = _informationAPI.GetGlobalRulesByUserId(user.UserId);
            return _dataAPI.GetAllKpisByUserId(globalrules);
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpGet("GetRawDataByKpiID")]
        public List<ATDtDeDTO> GetRawDataByKpiID(string id_kpi, string month, string year)
        {
            return _dataAPI.GetRawDataByKpiID(id_kpi, month, year);
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpGet("GetArchivedRawDataByKpiID")]
        public List<ATDtDeDTO> GetArchivedRawDataByKpiID(string id_kpi, string month, string year)
        {
            return _dataAPI.GetArchivedRawDataByKpiID(id_kpi, month, year);
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
/*      [HttpGet("GetDetailsArchivedKPI")]
        public List<ATDtDeDTO> GetDetailsArchivedKPIs(int idkpi, string month, string year)
        {
            return _dataAPI.GetDetailsArchiveKPI(idkpi, month, year);
        }*/
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpGet("GetAllCustomersKP")]
        public List<KeyValuePair<int, string>> GetAllCustomersKP()
        {
            return _dataAPI.GetAllCustomersKP();
        }
        [Authorize(WorkFlowPermissions.BASIC_LOGIN)]
        [HttpGet("GetAllTRules")]
        public List<TRuleDTO> GetAllTRules()
        {
            return _dataAPI.GetAllTRules();
        }
        [Authorize(WorkFlowPermissions.VIEW_NOTIFIER_EMAILS)]
        [HttpGet("GetEmailNotifiers")]
        public List<EmailNotifierDTO> GetEmailNotifiers(string period)
        {
            return _dataAPI.GetEmailNotifiers(period);
        }
 /*       [HttpGet("GetRawIdsFromRulePeriod")]
        public List<int> GetRawIdsFromRulePeriod(int ruleId, string period)
        {
            return _dataAPI.GetRawIdsFromRulePeriod(ruleId, period);
        }*/
        [HttpGet("AddArchiveRawData")]
        public bool AddArchiveRawData(int global_rule_id, string period, string tracking_period)
        {
            return _dataAPI.AddArchiveRawData(global_rule_id, period, tracking_period);
        }
    }
}