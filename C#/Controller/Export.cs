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


        [Route("file"), HttpGet]
        public HttpResponseMessage ExportCsvData()
        {
            int UserId = User.Identity.GetId().Value;
            string leadCsv = leadService.ExportCsv(UserId);
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(leadCsv, Encoding.UTF8, "text/csv");
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment") { FileName = "leads.csv" };
            return response;
        }



    }
}