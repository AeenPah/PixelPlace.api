using PixelPlace.Api.Entities;
using PixelPlace.Api.GraphQL.Input;
using PixelPlace.Api.Services;

namespace PixelPlace.Api.GraphQL;

public class Mutation
{
    public Task<Pixel> PlacePixel(PlacePixelInput input, PixelService service)
    {
        return service.PlacePixel(input);
    }
}