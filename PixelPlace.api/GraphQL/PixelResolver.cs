using Microsoft.EntityFrameworkCore;
using PixelPlace.Api.Data;
using PixelPlace.Api.Entities;

namespace PixelPlace.Api.GraphQL;

[ExtendObjectType<Pixel>]
public class PixelResolver
{
    public async Task<User> GetUser([Parent] Pixel pixel, AppDbContext db)
    {
        return await db.Users.FirstAsync(u => u.Id == pixel.UserId);
    }
}