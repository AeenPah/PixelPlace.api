namespace PixelPlace.Api.Entities;

public class Pixel
{
    public int X { get; set; }
    public int Y { get; set; }
    public string Color { get; set; } = default!;
    public DateTime UpdateAt { get; set; }
    public int UserId { get; set; }
    public User User { get; set; } = default!;
}