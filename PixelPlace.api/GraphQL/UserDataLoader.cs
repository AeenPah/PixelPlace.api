// using Microsoft.EntityFrameworkCore;
// using PixelPlace.Api.Data;
// using PixelPlace.Api.Entities;

// namespace PixelPlace.Api.GraphQL;

// internal static class UserDataLoaders
// {
//     [DataLoader]
//     public static async Task<Dictionary<int, User>> GetUserByIdAsync(
//         IReadOnlyList<int> ids,
//         AppDbContext db,
//         CancellationToken cancellationToken)
//     {
//         return await db.Users
//            .Where(u => ids.Contains(u.Id))
//            .ToDictionaryAsync(u => u.Id, cancellationToken);
//     }
// }