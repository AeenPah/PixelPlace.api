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
    .AddTypeExtension<PixelResolver>();

var app = builder.Build();

app.MapGraphQL();

app.Run();
