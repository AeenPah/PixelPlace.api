namespace PixelPlace.Api.GraphQL.Input;

public class PlacePixelInput
{
    public int X { get; set; }
    public int Y { get; set; }
    public string Color { get; set; } = default!;
}