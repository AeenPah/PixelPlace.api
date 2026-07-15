using HotChocolate.Subscriptions;
using PixelPlace.Api.Entities;
using PixelPlace.Api.GraphQL.Input;
using PixelPlace.Api.Services;

namespace PixelPlace.Api.GraphQL;

public class Mutation
{
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