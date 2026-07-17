using Microsoft.EntityFrameworkCore;
using PixelPlace.Api.Data;
using PixelPlace.Api.Entities;
using PixelPlace.Api.GraphQL.Input;
using PixelPlace.Api.GraphQL.Payload;

namespace PixelPlace.Api.Services;

public class UserService(
    AppDbContext db,
    PasswordHasherService hasherService,
    TokenService tokenService
)
{
    public async Task<AuthPayload> Register(RegisterInput input)
    {
        var exist = await db.Users.AnyAsync(u => u.Username == input.Username);

        if (exist)
        {
            throw new Exception("User already exist!");
        }

        var user = new User
        {
            Username = input.Username,
            CreatedAt = DateTime.UtcNow
        };

        user.PasswordHash = hasherService.Hash(user, input.Password);

        db.Users.Add(user);

        await db.SaveChangesAsync();

        return new AuthPayload
        {
            Token = tokenService.Create(user)
        };
    }

    public async Task<AuthPayload> Login(LoginInput input)
    {
        var user = await db.Users.FirstOrDefaultAsync(u => u.Username == input.Username);

        if (user is null)
        {
            throw new Exception("Invalid Username!");
        }

        if (!hasherService.Verify(user, input.Password))
        {
            throw new Exception("Invalid Password!");
        }

        return new AuthPayload
        {
            Token = tokenService.Create(user)
        };
    }
}