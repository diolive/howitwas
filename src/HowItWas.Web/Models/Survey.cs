namespace HowItWas.Web.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class Survey
    {
        [Required, StringLength(36)]
        public string Id { get; set; } = Utils.NewID;

        [Required]
        public string Description { get; set; }

        public bool Closed { get; set; }

        public ApplicationUser Owner { get; set; }

        [Required]
        public string Owner_Id { get; set; }

        public virtual ICollection<Participation> Participations { get; set; } = new HashSet<Participation>();

        public virtual ICollection<Feedback> Feedbacks { get; set; } = new HashSet<Feedback>();
    }
}