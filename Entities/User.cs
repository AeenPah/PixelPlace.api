using PixelPlace.Api.Models;

namespace PixelPlace.Api.Entities;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = default!;
    public DateTime CreatedAt { get; set; }
    public ICollection<Pixel> Pixels { get; set; } = new List<Pixel>();
}