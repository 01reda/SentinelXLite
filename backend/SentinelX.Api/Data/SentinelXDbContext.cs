using Microsoft.EntityFrameworkCore;
using SentinelX.Api.Models;

namespace SentinelX.Api.Data;

public class SentinelXDbContext : DbContext
{
    public SentinelXDbContext(DbContextOptions<SentinelXDbContext> options) : base(options)
    {
    }

    public DbSet<Alert> Alerts => Set<Alert>();
    public DbSet<Incident> Incidents => Set<Incident>();
}