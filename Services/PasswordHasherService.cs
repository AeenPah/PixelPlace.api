using Microsoft.AspNetCore.Identity;
using PixelPlace.Api.Entities;

namespace PixelPlace.Api.Services;

public class PasswordHasherService
{
    private readonly IPasswordHasher<User> _hasher = new PasswordHasher<User>();

    public string Hash(User user, string password)
    {
        return _hasher.HashPassword(user, password);
    }

    public bool Verify(User user, string password)
    {
        var result = _hasher.VerifyHashedPassword(
            user,
            user.PasswordHash,
            password
        );

        return result == PasswordVerificationResult.Success;
    }
}