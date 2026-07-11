using PixelPlace.Api.Data;
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
        return PixelStore.Pixels;
    }
}