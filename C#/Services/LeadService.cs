using Data.Providers;
using Models.Requests;
using Data;
using Models.Domain;
using Models.Responses;
using System;
using Data;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services //namespace removed
{
    public class LeadService
    {
        readonly IDataProvider dataProvider;


        public LeadService(IDataProvider dataProvider)
        {

            this.dataProvider = dataProvider;
        }

        public PagedItemResponse<Lead> LeadSearchBar(string q, int? pageIndex, int? pageSize, int userId, DateTime? dateCreated, DateTime? startDate, DateTime? endDate, int? statusId)
        {
            PagedItemResponse<Lead> pagedItemResponse = new PagedItemResponse<Lead>();
            List<Lead> leadList = new List<Lead>();

            dataProvider.ExecuteCmd(
                "Lead_SearchBar",
                (parameters) =>
                {
                    parameters.AddWithValue("@searchString", q == null ? DBNull.Value : (object)q);
                    parameters.AddWithValue("@pageIndex", pageIndex == null ? DBNull.Value : (object)pageIndex);
                    parameters.AddWithValue("@pageSize", pageSize == null ? DBNull.Value : (object)pageSize);
                    parameters.AddWithValue("@userId", userId);
                    parameters.AddWithValue("@dateCreated", dateCreated == null ? DBNull.Value : (object)dateCreated);
                    parameters.AddWithValue("@startDate", startDate == null ? DBNull.Value : (object)startDate);
                    parameters.AddWithValue("@endDate", endDate == null ? DBNull.Value : (object)endDate);
                    parameters.AddWithValue("@statusId", statusId == null ? DBNull.Value : (object)statusId);

                },
                (reader, resultsSetIndex) =>
                {
                    Lead lead = new Lead()
                    {
                        Id = (int)reader["Id"],
                        FirstName = (string)reader["FirstName"],
                        LastName = reader.GetSafeString("LastName"),
                        Phone = reader.GetSafeString("Phone"),
                        Email = reader.GetSafeString("Email"),
                        Buyer = (bool)reader["Buyer"],
                        Seller = (bool)reader["Seller"],
                        Lease = (bool)reader["Lease"],
                        City = reader.GetSafeString("City"),
                        State = reader.GetSafeString("State"),
                        ZipCode = reader.GetSafeString("ZipCode"),
                        ActivityTypeId = (int)reader["ActivityTypeId"],
                        StatusId = (int)reader["StatusId"],
                        UserId = (int)reader["UserId"],
                       // Notes = reader.GetSafeString("Notes"),
                        DateCreated = (DateTime)reader["DateCreated"]

                    };

                    pagedItemResponse.TotalCount = (int)reader["TotalRows"];

                    leadList.Add(lead);
                });

            pagedItemResponse.PagedItems = leadList;

            return pagedItemResponse;
        }



        public PagedItemResponse<Lead> SelectAll(int userId, int pageIndex, int pageSize)
        {
            PagedItemResponse<Lead> pagedItemResponse = new PagedItemResponse<Lead>();
            List<Lead> listOfLeads = new List<Lead>();

            dataProvider.ExecuteCmd(
                "Lead_SelectAll",
                (parameters) =>
                {

                    parameters.AddWithValue("@userId", userId);
                    parameters.AddWithValue("@pageIndex", pageIndex);
                    parameters.AddWithValue("@pageSize", pageSize);

                },
                (reader, resultSetIndex) =>
                {
                    Lead lead = new Lead
                    {
                        Id = (int)reader["Id"],
                        FirstName = (string)reader["FirstName"],
                        LastName = (string)reader["LastName"],
                        Phone = (string)reader["Phone"],
                        Email = (string)reader["Email"],
                        Buyer = (bool)reader["Buyer"],
                        Seller = (bool)reader["Seller"],
                        Lease = (bool)reader["Lease"],
                        AddressLine1 = reader.GetSafeString("AddressLine1"),
                        AddressLine2 = reader.GetSafeString("AddressLine2"),
                        City = reader.GetSafeString("City"),
                        State = reader.GetSafeString("State"),
                        ZipCode = reader.GetSafeString("ZipCode"),
                        ActivityTypeId = (int)reader["ActivityTypeId"],
                        UserId = (int)reader["UserId"],
                        StatusId = (int)reader["StatusId"],
                        Notes = reader.GetSafeString("Notes"),
                        DateCreated = (DateTime)reader["DateCreated"],
                        DateModified = (DateTime)reader["DateModified"],

                    };

                    pagedItemResponse.TotalCount = (int)reader["TotalRows"];

                    listOfLeads.Add(lead);
                });

            pagedItemResponse.PagedItems = listOfLeads;

            return pagedItemResponse;
        }


        public void Update(LeadUpdateRequest req)
        {
            dataProvider.ExecuteNonQuery(
             "Lead_Update",
             (parameters) =>
             {
                 parameters.AddWithValue("@Id", req.Id);
                 parameters.AddWithValue("@FirstName", req.FirstName);
                 parameters.AddWithValue("@LastName", req.LastName);
                 parameters.AddWithValue("@Buyer", req.Buyer);
                 parameters.AddWithValue("@Seller", req.Seller);
                 parameters.AddWithValue("@Lease", req.Lease);
                 parameters.AddWithValue("@Email", req.Email);
                 parameters.AddWithValue("@Phone", req.Phone);
                 parameters.AddWithValue("@AddressLine1", req.AddressLine1);
                 parameters.AddWithValue("@AddressLine2", req.AddressLine2);
                 parameters.AddWithValue("@City", req.City);
                 parameters.AddWithValue("@State", req.State);
                 parameters.AddWithValue("@ZipCode", req.ZipCode);
                 parameters.AddWithValue("@ActivityTypeId", req.ActivityTypeId);
                 parameters.AddWithValue("@UserId", req.UserId);
                 parameters.AddWithValue("@StatusId", req.StatusId);
                 parameters.AddWithValue("@Notes", req.Notes);
             });
        }


        public int Create(LeadCreateRequest req)
        {
            int newId = 0;

            dataProvider.ExecuteNonQuery(
                "Lead_Insert",
                (parameters) =>
                {
                    parameters.AddWithValue("@FirstName", req.FirstName);
                    parameters.AddWithValue("@LastName", req.LastName);
                    parameters.AddWithValue("@Buyer", req.Buyer);
                    parameters.AddWithValue("@Seller", req.Seller);
                    parameters.AddWithValue("@Lease", req.Lease);
                    parameters.AddWithValue("@Email", req.Email);
                    parameters.AddWithValue("@Phone", req.Phone);
                    parameters.AddWithValue("@AddressLine1", req.AddressLine1);
                    parameters.AddWithValue("@AddressLine2", req.AddressLine2);
                    parameters.AddWithValue("@City", req.City);
                    parameters.AddWithValue("@State", req.State);
                    parameters.AddWithValue("@ZipCode", req.ZipCode);
                    parameters.AddWithValue("@ActivityTypeId", req.ActivityTypeId);
                    parameters.AddWithValue("@UserId", req.UserId);
                    parameters.AddWithValue("@StatusId", req.StatusId);
                    parameters.AddWithValue("@Notes", req.Notes);

                    parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;
                },
                (parameters) =>
                {
                    newId = (int)parameters["@Id"].Value;
                });

            return newId;
        }
        
        public Lead SelectById(int userId, int id)
        {
            Lead lead = null;
            dataProvider.ExecuteCmd(
                "Lead_SelectById",
                (parameters) =>
                {
                    parameters.AddWithValue("@userId", userId);
                    parameters.AddWithValue("@Id", id);
                   
                },
                   (reader, resultSetIndex) =>
                   {
                       lead = new Lead

                       {
                           Id = (int)reader["Id"],
                           FirstName = (string)reader["FirstName"],
                           LastName = (string)reader["LastName"],
                           Phone = (string)reader["Phone"],
                           Email = (string)reader["Email"],
                           Buyer = (bool)reader["Buyer"],
                           Seller = (bool)reader["Seller"],
                           Lease = (bool)reader["Lease"],
                           AddressLine1 = reader.GetSafeString("AddressLine1"),
                           AddressLine2 = reader.GetSafeString("AddressLine2"),
                           City = reader.GetSafeString("City"),
                           State = reader.GetSafeString("State"),
                           ZipCode = reader.GetSafeString("ZipCode"),
                           ActivityTypeId = (int)reader["ActivityTypeId"],
                           UserId = (int)reader["UserId"],
                           StatusId = (int)reader["StatusId"],
                           Notes = reader.GetSafeString("Notes"),
                           DateCreated = (DateTime)reader["DateCreated"],
                           DateModified = (DateTime)reader["DateModified"],
                       };
                   });

            return lead;
        }

        public void Delete(int id)
        {
            dataProvider.ExecuteNonQuery(
                "Lead_Delete",
                (parameters) =>
                {
                    parameters.AddWithValue("@Id", id);
                });
        }

        string PrepareCsvString(object o)
        {

            return "\"" + o.ToString().Replace("\"", "\"\"") + "\""; 
        }   

        public string ExportCsv(int userId)
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("Id,First Name,Last Name,Phone,Email,Buyer,Seller,Lease,AddressLine1,AddressLine2,City,State,ZipCode,ActivityTypeId,User Id,Status Id, Notes,Date Created, Date Modified");

            dataProvider.ExecuteCmd(
            "Lead_ExportCsvData", (parameters) =>
            {
                parameters.AddWithValue("@UserId", userId);
            },
          
             (reader, resultSetIndex) =>
                {
    
                    sb.Append(PrepareCsvString(reader["Id"]));
                    sb.Append(",");
                    sb.Append(PrepareCsvString(reader["FirstName"]));
                    sb.Append(",");
                    sb.Append(PrepareCsvString(reader["LastName"]));
                    sb.Append(",");
                    sb.Append(PrepareCsvString(reader["Phone"]));
                    sb.Append(",");
                    sb.Append(PrepareCsvString(reader["Email"]));
                    sb.Append(",");
                    sb.Append(PrepareCsvString(reader["Buyer"]));
                    sb.Append(",");
                    sb.Append(PrepareCsvString(reader["Seller"]));
                    sb.Append(",");
                    sb.Append(PrepareCsvString(reader["Lease"]));
                    sb.Append(",");
                    sb.Append(PrepareCsvString(reader["AddressLine1"]));
                    sb.Append(",");
                    sb.Append(PrepareCsvString(reader["AddressLine2"]));
                    sb.Append(",");
                    sb.Append(PrepareCsvString(reader["City"]));
                    sb.Append(",");
                    sb.Append(PrepareCsvString(reader["State"]));
                    sb.Append(",");
                    sb.Append(PrepareCsvString(reader["ZipCode"]));
                    sb.Append(",");
                    sb.Append(PrepareCsvString(reader["ActivityTypeId"]));
                    sb.Append(",");
                    sb.Append(PrepareCsvString(reader["UserId"]));
                    sb.Append(",");
                    sb.Append(PrepareCsvString(reader["StatusId"]));
                    sb.Append(",");
                    sb.Append(PrepareCsvString(reader["Notes"]));
                    sb.Append(",");
                    sb.Append(PrepareCsvString(reader["DateCreated"]));
                    sb.Append(",");
                    sb.Append(PrepareCsvString(reader["DateModified"]));                    
                    sb.Append(Environment.NewLine);                              
                }
               );

            return sb.ToString();    
        }

    }
}
