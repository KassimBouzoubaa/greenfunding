"use client";
import { Flex, Text } from "@chakra-ui/react";

const Contributeur = () => {
  return (
    <Flex direction='column' width='100%'>
      <Text color='black' fontWeight='bold' fontSize='xl'>
        0xf39Fd6e51aad8...
      </Text>
      <Flex justifyContent='space-between' alignItems='center'>
        <Text color='grey' fontSize='s'>
          3 ETH
        </Text>
        <Text color='grey' fontSize='xs'>
          2 hours ago
        </Text>
      </Flex>
    </Flex>
  );
};

export default Contributeur;
