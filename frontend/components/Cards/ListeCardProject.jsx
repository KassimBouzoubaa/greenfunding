import { Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import CardProject from "./CardProject";

const ListeCardProject = () => {
  return (
    <Flex
      p='2rem'
      overflowY='auto'
      width="100%"
      height="100%"
      direction="column"
        >
            <Heading mb="2rem">Les <span style={{ color: "green" }}>projets</span> en cours, et ce n'est que le début !</Heading>
      <SimpleGrid columns={[1, 2,3]} spacing='30px'>
        <CardProject />
        <CardProject />
        <CardProject />
        <CardProject />
        <CardProject />
        <CardProject />
        <CardProject />
        <CardProject />
        <CardProject />
     
      </SimpleGrid>
    </Flex>
  );
};

export default ListeCardProject;
