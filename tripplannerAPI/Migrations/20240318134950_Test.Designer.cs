﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace tripplannerAPI.Migrations
{
    [DbContext(typeof(APIContext))]
    [Migration("20240318134950_Test")]
    partial class Test
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.0");

            modelBuilder.Entity("Pays", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Nom")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Pays");
                });

            modelBuilder.Entity("Site", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("CoorGPS")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<double>("DureeVisite")
                        .HasColumnType("REAL");

                    b.Property<double>("HoraireFer")
                        .HasColumnType("REAL");

                    b.Property<double>("HoraireOuv")
                        .HasColumnType("REAL");

                    b.Property<int>("IdVille")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Nom")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int?>("VilleId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("VoyageId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("VoyageId1")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("VilleId");

                    b.HasIndex("VoyageId");

                    b.HasIndex("VoyageId1");

                    b.ToTable("Sites");
                });

            modelBuilder.Entity("Utilisateur", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Nom")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Prenom")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Utilisateurs");
                });

            modelBuilder.Entity("Ville", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("IdPays")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Nom")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int?>("PaysId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("PaysId");

                    b.ToTable("Villes");
                });

            modelBuilder.Entity("Voyage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("ArriveeId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("DepartId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("IdUtilisateur")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("ArriveeId");

                    b.HasIndex("DepartId");

                    b.ToTable("Voyages");
                });

            modelBuilder.Entity("Site", b =>
                {
                    b.HasOne("Ville", null)
                        .WithMany("ListeSites")
                        .HasForeignKey("VilleId");

                    b.HasOne("Voyage", null)
                        .WithMany("SitesVisites")
                        .HasForeignKey("VoyageId");

                    b.HasOne("Voyage", null)
                        .WithMany("Trajet")
                        .HasForeignKey("VoyageId1");
                });

            modelBuilder.Entity("Ville", b =>
                {
                    b.HasOne("Pays", null)
                        .WithMany("ListeVilles")
                        .HasForeignKey("PaysId");
                });

            modelBuilder.Entity("Voyage", b =>
                {
                    b.HasOne("Site", "Arrivee")
                        .WithMany()
                        .HasForeignKey("ArriveeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Site", "Depart")
                        .WithMany()
                        .HasForeignKey("DepartId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Arrivee");

                    b.Navigation("Depart");
                });

            modelBuilder.Entity("Pays", b =>
                {
                    b.Navigation("ListeVilles");
                });

            modelBuilder.Entity("Ville", b =>
                {
                    b.Navigation("ListeSites");
                });

            modelBuilder.Entity("Voyage", b =>
                {
                    b.Navigation("SitesVisites");

                    b.Navigation("Trajet");
                });
#pragma warning restore 612, 618
        }
    }
}
