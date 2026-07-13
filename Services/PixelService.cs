using Microsoft.EntityFrameworkCore;
using PixelPlace.Api.Data;
using PixelPlace.Api.Entities;
using PixelPlace.Api.GraphQL.Input;

namespace PixelPlace.Api.Services;

public class PixelService
{
    private readonly AppDbContext _db;

    public PixelService(AppDbContext db)
    {
        _db = db;
    }


    public async Task<Pixel> PlacePixel(PlacePixelInput input)
    {
        Pixel? pixel = await _db.Pixels
            .FirstOrDefaultAsync(p =>
                p.X == input.X &&
                p.Y == input.Y);

        if (pixel is not null)
        {
            pixel.Color = input.Color;
            pixel.UpdateAt = DateTime.UtcNow;
            pixel.UserId = 1; // TODO: change this later
        }
        else
        {
            pixel = new Pixel
            {
                X = input.X,
                Y = input.Y,
                Color = input.Color,
                UpdateAt = DateTime.UtcNow,
                UserId = 1 // TODO: change this
            };

            _db.Pixels.Add(pixel);
        }

        await _db.SaveChangesAsync();

        return pixel;
    }

    public async Task<List<Pixel>> GetCanvas()
    {
        return await _db.Pixels.ToListAsync();
    }
}