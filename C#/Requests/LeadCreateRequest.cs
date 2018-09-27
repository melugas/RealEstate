using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests
{
    public class LeadCreateRequest
    {
        [Required]
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [MaxLength(20)]
        public string Phone { get; set; }
        [MaxLength(100)]
        public string Email { get; set; }
        public bool Buyer { get; set; }
        public bool Seller { get; set; }
        public bool Lease { get; set; }
        [MaxLength(100)]
        public string AddressLine1 { get; set; }
        [MaxLength(100)]
        public string AddressLine2 { get; set; }
        [MaxLength(50)]
        public string City { get; set; }
        [MaxLength(2)]
        public string State { get; set; }
        [MaxLength(10)]
        public string ZipCode { get; set; }
        [Required]
        public int ActivityTypeId { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public int StatusId { get; set; }
        [MaxLength(500)]
        public string Notes { get; set; }
    }
}
