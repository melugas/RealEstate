using System;
using System.Collections.Generic;
using System.Linq;
using Web;
using Web.Http;
using Services;
using Net;
using Net.Http;
using Models.Domain;
using Models.Requests;
using Models.Responses;
using Services.Security;
using Net.Http.Headers;
using Text;

namespace Web.Controllers
{
    [RoutePrefix("ROUTE PREFIX REMOVED")]
    public class LeadController : ApiController
    {
        readonly LeadService leadService;
        readonly IAuthenticationService authenticationService;
      

        public LeadController(LeadService leadService, IAuthenticationService authenticationService)
        {
            this.leadService = leadService;
            this.authenticationService = authenticationService;
        }


        [Route("search"), HttpGet, Authorize(Roles = "Agent")]
        public HttpResponseMessage LeadSearchBar(string q, int pageIndex = 0, int pageSize = 10, DateTime? dateCreated = null, DateTime? startDate = null, DateTime? endDate = null, int? statusId = null)
        {
            int UserId = User.Identity.GetId().Value;

            PagedItemResponse<Lead> leads = leadService.LeadSearchBar(q, pageIndex, pageSize, UserId, dateCreated, startDate, endDate, statusId);
            
            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<PagedItemResponse<Lead>>
            {
                Item = leads
            });

  


    }
}