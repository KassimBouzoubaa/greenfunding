"use client";
import { Flex, Progress, Text } from "@chakra-ui/react";
import React from "react";

const ProgressBar = ({ montantCollecte, montantCible }) => {
  const pourcentage = Math.ceil((montantCollecte / montantCible) * 100);

  return (
    <Flex direction='column'>
      <Progress value={pourcentage} colorScheme='green' size='md' />
      <Flex direction='column' alignItems='center'>
        <Text fontSize='l' fontWeight='bold'>
          {pourcentage}%
        </Text>
      </Flex>
    </Flex>
  );
};

export default ProgressBar;
