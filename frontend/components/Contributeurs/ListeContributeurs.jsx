import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import Contributeur from "./Contributeur";

const ListeContributeurs = () => {
  return (
    <Flex p='2rem' direction='column' gap='1rem' justifyContent="flex-start">
      <Heading color='green' as='h3' size='md'>
        Tous les contributeurs
      </Heading>
      <Contributeur />
      <Contributeur />
      <Contributeur />
      <Contributeur />
    </Flex>
  );
};

export default ListeContributeurs;
