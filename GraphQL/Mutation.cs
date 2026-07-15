using HotChocolate.Subscriptions;
using PixelPlace.Api.Entities;
using PixelPlace.Api.GraphQL.Input;
using PixelPlace.Api.GraphQL.Payload;
using PixelPlace.Api.Services;

namespace PixelPlace.Api.GraphQL;

public class Mutation
{
    public Task<AuthPayload> Register(
        RegisterInput input,
        UserService service)
    {
        return service.Register(input);
    }

    public Task<AuthPayload> Login(
        LoginInput input,
        UserService service)
    {
        return service.Login(input);
    }

    public async Task<Pixel> PlacePixel(
        PlacePixelInput input,
        PixelService service,
        ITopicEventSender sender)
    {
        Pixel? pixel = await service.PlacePixel(input);

        await sender.SendAsync(Topics.PixelPlaced, pixel);

        return pixel;
    }
}