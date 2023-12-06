"use client";
import Acceuil from "@/components/Accueil/Acceuil";
import Layout from "@/components/Accueil/Layout";
import Header from "@/components/Header/Header";
import useConnectedWallet from "./hooks/use-connected-wallet";


export default function Home() {
  const connectedWallet = useConnectedWallet();

  return (
    <>
      <Header />
      {connectedWallet?.isConnected ? <Layout /> : <Acceuil />}
    </>
  );
}
