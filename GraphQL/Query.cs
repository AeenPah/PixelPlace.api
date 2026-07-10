using PixelPlace.Api.Models;

namespace PixelPlace.Api.GraphQL;

public class Query
{
    public Pixel GetPixel(int x, int y)
    {
        return new Pixel
        {
            X = x,
            Y = y,
            Color = "#FF0000"
        };
    }

    public IEnumerable<Pixel> GetCanvas()
    {
        return new List<Pixel>
        {
            new () { Color="#000000", X=0, Y=2},
            new () { Color="#0000FF", X=50, Y=5},
            new () { Color="#00FFFF", X=0, Y=2}
        };
    }
}