using PixelPlace.Api.Entities;
using PixelPlace.Api.Services;

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

    public Task<List<Pixel>> GetCanvas(PixelService service)
    {
        return service.GetCanvas();
    }
}