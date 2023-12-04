import { CheckIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  Stack,
  InputRightElement,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Button,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import InfoHeading from "../Text/InfoHeading";

const Formulaire = () => {
  return (
    <Stack p='2rem' width="100%"  spacing={3}>
        <InfoHeading title="Lancer une levée de fond" />
      <FormControl isRequired>
        <FormLabel>Titre</FormLabel>
        <Input placeholder='Titre' />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Description</FormLabel>
        <Input placeholder='Description' />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Montant cible (ETH)</FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents='none'
            color='gray.300'
            fontSize='0.8rem'
            children='ETH'
          />
          <Input placeholder='Enter amount' />
          <InputRightElement>
            <CheckIcon color='green.500' />
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Minimum d'investissement requis (ETH)</FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents='none'
            color='gray.300'
            fontSize='0.8rem'
            children='ETH'
          />
          <Input placeholder='Enter amount' />
          <InputRightElement>
            <CheckIcon color='green.500' />
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Durée (en jour)</FormLabel>
        <Input placeholder='Durée' />
      </FormControl>
      <Button colorScheme='green'>DEMMARER</Button>
    </Stack>
  );
};

export default Formulaire;
