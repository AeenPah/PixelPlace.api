using Microsoft.EntityFrameworkCore;
using PixelPlace.Api.Data;
using PixelPlace.Api.Entities;

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

    public async Task<IEnumerable<Pixel>> GetCanvas(AppDbContext db)
    {
        return await db.Pixels.ToListAsync();
    }
}