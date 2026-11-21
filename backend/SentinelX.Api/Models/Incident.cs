namespace SentinelX.Api.Models;

public class Incident
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Status { get; set; } = "New"; // New, In Progress, Resolved
    public string Severity { get; set; } = "Medium";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}