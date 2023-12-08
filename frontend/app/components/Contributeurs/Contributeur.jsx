"use client";
import { differenceEnTemps } from "@/app/utils/differenceEnTemps";
import { Flex, Text } from "@chakra-ui/react";
import { formatEther } from "viem";

const Contributeur = ({ contributeur }) => {
  const debut = contributeur.contributeur.substring(0, 8);
  const fin = contributeur.contributeur.substring(
    contributeur.contributeur.length - 8
  );

  const adresseModifiee = `${debut}...${fin}`;
  const date = differenceEnTemps(Number(contributeur.date));

  return (
    <Flex direction='column' width='100%'>
      <Text color='black' fontWeight='bold' fontSize='md'>
        {adresseModifiee}
      </Text>
      <Flex justifyContent='space-between' alignItems='center'>
        <Text color='grey' fontSize='s'>
          {formatEther(contributeur.montant)} ETH
        </Text>
        <Text color='grey' fontSize='xs'>
          {date}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Contributeur;
