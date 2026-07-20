using HotChocolate.Execution;

namespace PixelPlace.Api.Errors;

public class GraphQLErrorFilter : IErrorFilter
{
    public IError OnError(IError error)
    {
        if (error.Code == "AUTH_NOT_AUTHENTICATED")
        {
            return error
                .WithMessage("You must be logged in to perform this action.")
                .WithCode("UNAUTHORIZED");
        }

        if (error.Exception is not null)
        {
            return error
                .WithMessage("Something went wrong.")
                .WithCode("INTERNAL_SERVER_ERROR");
        }

        return error;
    }
}