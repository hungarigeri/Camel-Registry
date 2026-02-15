using Microsoft.EntityFrameworkCore;

namespace CamelRegistry;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Camel> Camels => Set<Camel>();
}