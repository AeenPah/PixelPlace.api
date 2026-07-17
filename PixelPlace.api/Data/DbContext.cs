using Microsoft.EntityFrameworkCore;
using PixelPlace.Api.Entities;

namespace PixelPlace.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Pixel> Pixels => Set<Pixel>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Pixel>()
            .HasKey(p => new { p.X, p.Y });

        base.OnModelCreating(modelBuilder);
    }
}