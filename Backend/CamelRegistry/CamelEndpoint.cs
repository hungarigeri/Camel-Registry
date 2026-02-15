using CamelRegistry;
using Microsoft.EntityFrameworkCore;

namespace CamelRegistry;

public static class CamelEndpoint
{
    public static void MapCamelEndpoint(this IEndpointRouteBuilder app)
    {
        // 1. new camel creation (POST)
        app.MapPost("/api/camels", async (Camel camel, AppDbContext db) =>
        {
            db.Camels.Add(camel);
            await db.SaveChangesAsync();
            return Results.Created($"/api/camels/{camel.Id}", camel);
        });

        // 2. camel list (GET)
        app.MapGet("/api/camels", async (AppDbContext db) =>
        {
            return await db.Camels.ToListAsync();
        });

        // 3. get a specific camel (GET /{id})
        app.MapGet("/api/camels/{id}", async (int id, AppDbContext db) =>
        {
            var camel = await db.Camels.FindAsync(id);
            return camel == null ? Results.NotFound() : Results.Ok(camel);
        });

        // 4. update a specific camel (PUT /{id})
        app.MapPut("/api/camels/{id}", async (int id, Camel inputCamel, AppDbContext db) =>
{
            var existingCamel = await db.Camels.FindAsync(id);
            if (existingCamel == null) return Results.NotFound();

            inputCamel.Id = id; 
            db.Entry(existingCamel).CurrentValues.SetValues(inputCamel);
            await db.SaveChangesAsync();
            return Results.NoContent(); 
});

        // 5. camel delete (DELETE /{id})
        app.MapDelete("/api/camels/{id}", async (int id, AppDbContext db) =>
        {
            var camel = await db.Camels.FindAsync(id);
            if (camel == null) return Results.NotFound();

            db.Camels.Remove(camel);
            await db.SaveChangesAsync();
            return Results.NoContent();
        });
    }
}