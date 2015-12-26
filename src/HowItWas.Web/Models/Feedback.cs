namespace HowItWas.Web.Models
{
    using System.ComponentModel.DataAnnotations;

    public class Feedback
    {
        [Required, StringLength(36)]
        public string Id { get; set; } = Utils.NewID;

        public virtual Survey Survey { get; set; }

        [Required]
        public string Survey_Id { get; set; }

        [Required]
        public string Content { get; set; }
    }
}