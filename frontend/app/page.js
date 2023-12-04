"use client";
import Acceuil from "@/components/Accueil/Acceuil";
import Layout from "@/components/Accueil/Layout";
import CardProject from "@/components/Cards/CardProject";
import ListeContributeurs from "@/components/Contributeurs/ListeContributeurs";
import Formulaire from "@/components/Formulaire/Formulaire";
import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <>
      <Header />
      <Acceuil />
    </>
  );
}
