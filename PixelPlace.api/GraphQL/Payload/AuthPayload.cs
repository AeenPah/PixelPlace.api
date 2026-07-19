namespace PixelPlace.Api.GraphQL.Payload;

public class AuthPayload
{
    public string Token { get; set; } = default!;
    public string Username { get; set; } = default!;
}