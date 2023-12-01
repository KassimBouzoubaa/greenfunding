import Image from "next/image";
import fond from "../../public/fond.png";
import woman from "../../public/woman.png";
import Header from "../Header/Header";
import { Box,Text , Heading } from "@chakra-ui/react";

const Acceuil = () => {
  return (
    <>
      <Header />
      <Box textAlign="left" p="4">
      <Heading as="h1" fontSize="4xl">
        PLANTEZ LES GRAINES{" "}
        <Text as="span" color="green.500">
          DE VOTRE SUCCÈS
        </Text>
      </Heading>
      <Text fontSize="lg" mt="4">
        La plateforme qui réconcilie vos ambitions et celles de la planète
      </Text>
    </Box>
    </>
  )
}

export default Acceuil;
