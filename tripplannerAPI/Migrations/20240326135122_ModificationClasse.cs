using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tripplannerAPI.Migrations
{
    public partial class ModificationClasse : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sites_Voyages_VoyageId1",
                table: "Sites");

            migrationBuilder.DropIndex(
                name: "IX_Sites_VoyageId1",
                table: "Sites");

            migrationBuilder.DropColumn(
                name: "VoyageId1",
                table: "Sites");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "VoyageId1",
                table: "Sites",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Sites_VoyageId1",
                table: "Sites",
                column: "VoyageId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Sites_Voyages_VoyageId1",
                table: "Sites",
                column: "VoyageId1",
                principalTable: "Voyages",
                principalColumn: "Id");
        }
    }
}
