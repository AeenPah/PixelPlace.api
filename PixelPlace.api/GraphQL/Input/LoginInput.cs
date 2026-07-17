namespace PixelPlace.Api.GraphQL.Input;

public class LoginInput
{
    public string Username { get; set; } = default!;
    public string Password { get; set; } = default!;
}