using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PixelPlace.Api.Data;
using PixelPlace.Api.Errors;
using PixelPlace.Api.GraphQL;
using PixelPlace.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<PixelService>();
builder.Services.AddScoped<UserService>();

builder.Services.AddSingleton<TokenService>();
builder.Services.AddSingleton<PasswordHasherService>();

/* -------------------------------------------------------------------------- */
/*                                    CORS                                    */
/* -------------------------------------------------------------------------- */

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

/* -------------------------------------------------------------------------- */
/*                               Authentication                               */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                                  Database                                  */
/* -------------------------------------------------------------------------- */

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("postgres")
    );
});

/* -------------------------------------------------------------------------- */
/*                                   GraphQL                                  */
/* -------------------------------------------------------------------------- */

builder.Services
    .AddGraphQLServer()
    .AddErrorFilter<GraphQLErrorFilter>()
    .AddAuthorization()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddTypeExtension<PixelResolver>()
    .AddSubscriptionType<Subscription>()
    // For local deployment
    .AddInMemorySubscriptions();

/* -------------------------------------------------------------------------- */
/*                                     App                                    */
/* -------------------------------------------------------------------------- */

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();
app.UseWebSockets();

app.MapGraphQL();

app.Run();
