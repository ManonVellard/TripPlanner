using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tripplannerAPI.Migrations
{
    public partial class ModificationSite : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IdVille",
                table: "Sites",
                newName: "IdPays");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IdPays",
                table: "Sites",
                newName: "IdVille");
        }
    }
}
