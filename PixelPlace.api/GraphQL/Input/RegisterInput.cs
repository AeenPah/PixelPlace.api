namespace PixelPlace.Api.GraphQL.Input;

public class RegisterInput
{
    public string Username { get; set; } = default!;
    public string Password { get; set; } = default!;
}