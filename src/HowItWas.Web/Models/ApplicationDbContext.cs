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

            builder.Entity<Survey>()
                .HasOne(s => s.Owner)
                .WithMany()
                .HasForeignKey(s => s.Owner_Id);
        }

        public DbSet<Survey> Survers { get; set; }
    }
}