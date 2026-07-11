using PixelPlace.Api.Data;
using PixelPlace.Api.GraphQL.Input;
using PixelPlace.Api.Models;

namespace PixelPlace.Api.GraphQL;

public class Mutation
{
    public Pixel PlacePixel(PlacePixelInput input)
    {
        Pixel? existing = PixelStore.Pixels.FirstOrDefault(p =>
            p.X == input.X && p.Y == input.Y);

        if (existing is not null)
        {
            existing.Color = input.Color;
            return existing;
        }

        var pixel = new Pixel
        {
            X = input.X,
            Y = input.Y,
            Color = input.Color
        };

        PixelStore.Pixels.Add(pixel);

        return pixel;
    }
}