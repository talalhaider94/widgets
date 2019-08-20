using Quantis.WorkFlow.Services.DTOs.API;
using Quantis.WorkFlow.Services.DTOs.OracleAPI;
using System;
using System.Collections.Generic;
using System.Text;

namespace Quantis.WorkFlow.Services.API
{
    public interface IOracleDataService
    {
        List<OracleCustomerDTO> GetCustomer(int id, string name);
        List<OracleFormDTO> GetForm(int id, int userid);
        List<OracleGroupDTO> GetGroup(int id, string name);
        List<OracleSlaDTO> GetSla(int id, string name);
        List<OracleRuleDTO> GetRule(int id, string name);
        List<OracleUserDTO> GetUser(int id, string name);
        //List<PslDTO> GetPsl(string period, string sla_name, string rule_name, string tracking_period);
        List<PslDTO> GetPsl(string period, int global_rule_id, string tracking_period);
        Tuple<int, int> GetUserIdLocaleIdByUserName(string username);
        List<OracleBookletDTO> GetBooklets();
    }
}
