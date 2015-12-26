namespace HowItWas.Web.Models
{
    using Microsoft.AspNet.Identity.EntityFramework;
    using Microsoft.Data.Entity;

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);

            builder.Entity<ApplicationUser>()
                .Property(u => u.Id)
                .HasMaxLength(36)
                .IsRequired();

            builder.Entity<Survey>()
                .HasOne(s => s.Owner)
                .WithMany()
                .HasForeignKey(s => s.Owner_Id);

            builder.Entity<Participation>()
                .HasOne(p => p.Survey)
                .WithMany(s => s.Participations)
                .HasForeignKey(p => p.Survey_Id);

            builder.Entity<Participation>()
                .HasOne(p => p.User)
                .WithMany()
                .HasForeignKey(p => p.User_Id);

            builder.Entity<Feedback>()
                .HasOne(f => f.Survey)
                .WithMany(s => s.Feedbacks)
                .HasForeignKey(f => f.Survey_Id);
        }

        public DbSet<Survey> Surveys { get; set; }

        public DbSet<Participation> Participators { get; set; }

        public DbSet<Feedback> Feedbacks { get; set; }
    }
}