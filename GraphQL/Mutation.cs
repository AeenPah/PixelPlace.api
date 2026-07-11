using Microsoft.EntityFrameworkCore;
using PixelPlace.Api.Data;
using PixelPlace.Api.Entities;
using PixelPlace.Api.GraphQL.Input;

namespace PixelPlace.Api.GraphQL;

public class Mutation
{
    public async Task<Pixel> PlacePixel(PlacePixelInput input, AppDbContext db)
    {
        Pixel? existingPixel = await db.Pixels.FirstOrDefaultAsync(p =>
            p.X == input.X && p.Y == input.Y);

        if (existingPixel is not null)
        {
            existingPixel.Color = input.Color;
            existingPixel.UpdateAt = DateTime.UtcNow;
            existingPixel.UserId = 1; // TODO: change this

            await db.SaveChangesAsync();

            return existingPixel;
        }

        var pixel = new Pixel
        {
            X = input.X,
            Y = input.Y,
            Color = input.Color,
            UpdateAt = DateTime.UtcNow,
            UserId = 1 // TODO: change this
        };

        db.Pixels.Add(pixel);

        await db.SaveChangesAsync();

        return pixel;
    }
}