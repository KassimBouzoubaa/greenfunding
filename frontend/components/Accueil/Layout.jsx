import React from "react";
import Right from "./Right";
import Left from "./Left";
import { Flex } from "@chakra-ui/react";
import ListeCardProject from "../Cards/ListeCardProject";

const Layout = () => {
  return (
    <Flex
      width='100vw'
      height='88vh'
      justifyContent='space-between'
      alignItems='center'
      bg='rgba(0, 0, 0, 0.8)'
      color='white'
      overflow='auto'
    >
      <Flex height="100%" width="70%" p="1rem">

      <ListeCardProject />
      </Flex>

      <Right />
    </Flex>
  );
};

export default Layout;
