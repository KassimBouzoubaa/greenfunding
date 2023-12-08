"use client";
import Acceuil from "@/app/components/Accueil/Acceuil";
import Layout from "@/app/components/Accueil/Layout";
import Header from "@/app/components/Header/Header";
import useConnectedWallet from "./hooks/use-connected-wallet";


export default function Home() {
  const connectedWallet = useConnectedWallet();

  return (
    <>
    
      {connectedWallet?.isConnected ? <Layout /> : <Acceuil />}
    </>
  );
}
