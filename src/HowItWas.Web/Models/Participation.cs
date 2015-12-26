namespace HowItWas.Web.Models
{
    using System.ComponentModel.DataAnnotations;

    public class Participation
    {
        [Required, StringLength(36)]
        public string Id { get; set; } = Utils.NewID;

        public virtual ApplicationUser User { get; set; }

        [Required]
        public string User_Id { get; set; }

        public virtual Survey Survey { get; set; }

        [Required]
        public string Survey_Id { get; set; }

        public bool Complete { get; set; }
    }
}