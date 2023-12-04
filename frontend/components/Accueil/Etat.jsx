"use client";

import {
  Flex,
  Text,
  Button,
  Input,
  Heading,
  Progress,
  Tag,
  TagLeftIcon,
  TagLabel,
} from "@chakra-ui/react";
import Badge from "../Badge/Badge";
import Contribution from "../Contributeurs/Contribution";
import InfoText from "../Text/InfoText";
import Collecte from "../Contributeurs/Collecte";
import ProgressBar from "../ProgressBar/ProgressBar";
import InfoHeading from "../Text/InfoHeading";

const Etat = () => {
  return (
    <Flex p='2rem' width='100%' direction='column' gap='2rem'>
      <Flex width='100%' justifyContent='space-between' alignItems='center'>
        <Flex direction='column'>
          <InfoHeading title='Participer au financement du projet' />
          <Text>Titre du projet</Text>
        </Flex>
        <Badge title='Financement' />
      </Flex>
      <Flex justifyContent='space-between' alignItems='center'>
        <Flex direction='column' gap='1rem'>
          <InfoText title='Montant cible' content='10 ETH' />
          <InfoText title='Date limite' content='21/12/2023' />
        </Flex>
        <Flex direction='column' gap='1rem'>
          <InfoText title='Montant collecté' content='10 ETH' />
          <Contribution action='Contribuer' />
        </Flex>
      </Flex>
      <ProgressBar />
    </Flex>
  );
};

export default Etat;
