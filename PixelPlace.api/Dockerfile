FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["PixelPlace.api.csproj", "./"]
RUN dotnet restore "PixelPlace.api.csproj"

COPY . ./
RUN dotnet publish "PixelPlace.api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

COPY --from=build /app/publish ./
ENTRYPOINT ["dotnet", "PixelPlace.api.dll"]
