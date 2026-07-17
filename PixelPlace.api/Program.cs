using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PixelPlace.Api.Data;
using PixelPlace.Api.GraphQL;
using PixelPlace.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<PixelService>();
builder.Services.AddScoped<UserService>();

builder.Services.AddSingleton<TokenService>();
builder.Services.AddSingleton<PasswordHasherService>();

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new()
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],

            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)
            )
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("postgres")
    );
});

builder.Services
    .AddGraphQLServer()
    .AddAuthorization()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddTypeExtension<PixelResolver>()
    .AddSubscriptionType<Subscription>()
    // For local deployment
    .AddInMemorySubscriptions();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();
app.UseWebSockets();

app.MapGraphQL();

app.Run();
