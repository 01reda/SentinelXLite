using Microsoft.EntityFrameworkCore;
using SentinelX.Api.Data;

namespace SentinelX.Api.Endpoints;

public static class DashboardEndpoints
{
    public static void MapDashboardEndpoints(this IEndpointRouteBuilder routes)
    {
        routes.MapGet("/api/dashboard/stats", async (SentinelXDbContext db) =>
        {
            var totalAlerts = await db.Alerts.CountAsync();
            var criticalAlerts = await db.Alerts.CountAsync(a => a.Severity == "Critical");
            var highAlerts = await db.Alerts.CountAsync(a => a.Severity == "High");
            var mediumAlerts = await db.Alerts.CountAsync(a => a.Severity == "Medium");
            var lowAlerts = await db.Alerts.CountAsync(a => a.Severity == "Low");
            var activeIncidents = await db.Incidents.CountAsync(i => i.Status != "Resolved");
            var resolvedIncidents = await db.Incidents.CountAsync(i => i.Status == "Resolved");

            return Results.Ok(new
            {
                totalAlerts,
                criticalAlerts,
                highAlerts,
                mediumAlerts,
                lowAlerts,
                activeIncidents,
                resolvedIncidents
            });
        })
        .WithName("GetDashboardStats")
        .WithOpenApi();
    }
}