using Microsoft.EntityFrameworkCore;
using PixelPlace.Api.Data;
using PixelPlace.Api.GraphQL;
using PixelPlace.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<PixelService>();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("postgres")
    );
});

builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddTypeExtension<PixelResolver>()
    .AddSubscriptionType<Subscription>()
    // For local deployment
    .AddInMemorySubscriptions();

var app = builder.Build();

app.UseWebSockets();
app.MapGraphQL();

app.Run();
