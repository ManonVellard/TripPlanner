using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tripplannerAPI.Migrations
{
    public partial class ModificationVoyage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Voyages_Sites_ArriveeId",
                table: "Voyages");

            migrationBuilder.DropForeignKey(
                name: "FK_Voyages_Sites_DepartId",
                table: "Voyages");

            migrationBuilder.DropIndex(
                name: "IX_Voyages_ArriveeId",
                table: "Voyages");

            migrationBuilder.DropIndex(
                name: "IX_Voyages_DepartId",
                table: "Voyages");

            migrationBuilder.DropColumn(
                name: "ArriveeId",
                table: "Voyages");

            migrationBuilder.DropColumn(
                name: "DepartId",
                table: "Voyages");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ArriveeId",
                table: "Voyages",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "DepartId",
                table: "Voyages",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Voyages_ArriveeId",
                table: "Voyages",
                column: "ArriveeId");

            migrationBuilder.CreateIndex(
                name: "IX_Voyages_DepartId",
                table: "Voyages",
                column: "DepartId");

            migrationBuilder.AddForeignKey(
                name: "FK_Voyages_Sites_ArriveeId",
                table: "Voyages",
                column: "ArriveeId",
                principalTable: "Sites",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Voyages_Sites_DepartId",
                table: "Voyages",
                column: "DepartId",
                principalTable: "Sites",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
