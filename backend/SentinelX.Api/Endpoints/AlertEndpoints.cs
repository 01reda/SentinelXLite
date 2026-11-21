using Microsoft.EntityFrameworkCore;
using SentinelX.Api.Data;
using SentinelX.Api.Models;

namespace SentinelX.Api.Endpoints;

public static class AlertEndpoints
{
    public static void MapAlertEndpoints(this IEndpointRouteBuilder routes)
    {
        routes.MapGet("/api/alerts", async (SentinelXDbContext db) =>
        {
            var alerts = await db.Alerts.ToListAsync();
            return Results.Ok(alerts);
        })
        .WithName("GetAlerts")
        .WithOpenApi();

        routes.MapPost("/api/alerts", async (Alert alert, SentinelXDbContext db) =>
        {
            db.Alerts.Add(alert);
            await db.SaveChangesAsync();
            return Results.Created($"/api/alerts/{alert.Id}", alert);
        })
        .WithName("CreateAlert")
        .WithOpenApi();
    }
}