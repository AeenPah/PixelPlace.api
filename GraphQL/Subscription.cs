using PixelPlace.Api.Entities;

namespace PixelPlace.Api.GraphQL;

public class Subscription
{
    [Subscribe]
    [Topic(Topics.PixelPlaced)]
    public Pixel PixelPlaced([EventMessage] Pixel pixel)
    {
        return pixel;
    }
}