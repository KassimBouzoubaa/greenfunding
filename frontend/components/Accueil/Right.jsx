import React from 'react';
import Formulaire from '../Formulaire/Formulaire';
import { Flex } from '@chakra-ui/react';
import ListeContributeurs from '../Contributeurs/ListeContributeurs';

const Right = () => {
  return (
    <Flex
      bg="white"
      color="black"
      width="30%"
      height="95%"
      mr="3rem"
      borderRadius="1rem"
      mt="1rem"
    >
      <Formulaire />
    </Flex>
  );
};

export default Right;
