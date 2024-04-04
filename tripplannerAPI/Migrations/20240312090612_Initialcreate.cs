using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tripplannerAPI.Migrations
{
    public partial class Initialcreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Pays",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pays", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Utilisateurs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nom = table.Column<string>(type: "TEXT", nullable: false),
                    Prenom = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Utilisateurs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Villes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    IdPays = table.Column<int>(type: "INTEGER", nullable: false),
                    PaysId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Villes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Villes_Pays_PaysId",
                        column: x => x.PaysId,
                        principalTable: "Pays",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Sites",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CoorGPS = table.Column<string>(type: "TEXT", nullable: false),
                    DureeVisite = table.Column<double>(type: "REAL", nullable: false),
                    Type = table.Column<string>(type: "TEXT", nullable: false),
                    HoraireOuv = table.Column<double>(type: "REAL", nullable: false),
                    HoraireFer = table.Column<double>(type: "REAL", nullable: false),
                    IdVille = table.Column<int>(type: "INTEGER", nullable: false),
                    VilleId = table.Column<int>(type: "INTEGER", nullable: true),
                    VoyageId = table.Column<int>(type: "INTEGER", nullable: true),
                    VoyageId1 = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sites", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sites_Villes_VilleId",
                        column: x => x.VilleId,
                        principalTable: "Villes",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Voyages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DepartId = table.Column<int>(type: "INTEGER", nullable: false),
                    ArriveeId = table.Column<int>(type: "INTEGER", nullable: false),
                    IdUtilisateur = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Voyages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Voyages_Sites_ArriveeId",
                        column: x => x.ArriveeId,
                        principalTable: "Sites",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Voyages_Sites_DepartId",
                        column: x => x.DepartId,
                        principalTable: "Sites",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Sites_VilleId",
                table: "Sites",
                column: "VilleId");

            migrationBuilder.CreateIndex(
                name: "IX_Sites_VoyageId",
                table: "Sites",
                column: "VoyageId");

            migrationBuilder.CreateIndex(
                name: "IX_Sites_VoyageId1",
                table: "Sites",
                column: "VoyageId1");

            migrationBuilder.CreateIndex(
                name: "IX_Villes_PaysId",
                table: "Villes",
                column: "PaysId");

            migrationBuilder.CreateIndex(
                name: "IX_Voyages_ArriveeId",
                table: "Voyages",
                column: "ArriveeId");

            migrationBuilder.CreateIndex(
                name: "IX_Voyages_DepartId",
                table: "Voyages",
                column: "DepartId");

            migrationBuilder.AddForeignKey(
                name: "FK_Sites_Voyages_VoyageId",
                table: "Sites",
                column: "VoyageId",
                principalTable: "Voyages",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Sites_Voyages_VoyageId1",
                table: "Sites",
                column: "VoyageId1",
                principalTable: "Voyages",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sites_Villes_VilleId",
                table: "Sites");

            migrationBuilder.DropForeignKey(
                name: "FK_Sites_Voyages_VoyageId",
                table: "Sites");

            migrationBuilder.DropForeignKey(
                name: "FK_Sites_Voyages_VoyageId1",
                table: "Sites");

            migrationBuilder.DropTable(
                name: "Utilisateurs");

            migrationBuilder.DropTable(
                name: "Villes");

            migrationBuilder.DropTable(
                name: "Pays");

            migrationBuilder.DropTable(
                name: "Voyages");

            migrationBuilder.DropTable(
                name: "Sites");
        }
    }
}
