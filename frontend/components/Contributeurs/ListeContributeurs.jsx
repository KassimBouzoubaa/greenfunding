import { Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Contributeur from "./Contributeur";
import useMounted from "@/app/hooks/use-mounted";
import useContributeurs from "@/app/hooks/use-contributeurs";
import useContractAddress from "@/app/hooks/use-contract-address";
import { usePublicClient } from "wagmi";
import { parseAbiItem } from "viem";

const ListeContributeurs = () => {
  const [listeContributeur, setListeContributeur] = useState([]);
  const contributeurs = useContributeurs();
  const contractAddress = useContractAddress();
  const client = usePublicClient();

  const { mounted, addCampagnToMounted, removeCampagnFromMounted } =
    useMounted();

  useEffect(() => {
    const fetchContributeurs = async () => {
      try {
        const contributeursEvent = await client.getLogs({
          address: contractAddress,
          event: parseAbiItem(
            "event ContributionMade(address contributor, uint amount, uint date)"
          ),
          fromBlock: 0n,
          toBlock: "latest",
        });

        setListeContributeur(
          contributeursEvent.map((log) => ({
            contributeur: log.args.contributor,
            montant: log.args.amount,
            date: log.args.date,
          }))
        );
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des contributeurs :",
          error
        );
      }
    };
    fetchContributeurs();
    const interval = setInterval(fetchContributeurs, 3000);

    return () => clearInterval(interval);
  }, [mounted]);
  return (
    <Flex
      p='2rem'
      direction='column'
      gap='1rem'
      justifyContent='flex-start'
      overflowY='auto'
      width="100%"
    >
      <Heading color='green' as='h3' size='md'>
        Tous les contributeurs
      </Heading>
      {listeContributeur.length > 0 ? (
        listeContributeur.map((contributeur, index) => (
          <Contributeur key={index} contributeur={contributeur} />
        ))
      ) : (
        <Text>Il n'y a actuellement aucun contributeur.</Text>
      )}
    </Flex>
  );
};

export default ListeContributeurs;
