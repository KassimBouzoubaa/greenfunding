import Image from "next/image";
import fond from "../../../public/Fond_.png";
import { Box, Heading, Flex } from "@chakra-ui/react";

const Acceuil = () => {
  return (
    <Flex
      bg='black'
      width='100vm'
      height='90vh'
      position='relative'
      color='white'
      justifyContent='center'
      flexDirection='column'
    >
      <Image alt='Fond' src={fond} layout='fill' objectFit='cover' />
      <Box ml='3rem' position='absolute' width='50%'>
        <Heading size='2xl' mb='4'>
          PLANTEZ LES GRAINES
          <br /> <span style={{ color: "green" }}>DE VOTRE SUCCÈS</span>
        </Heading>
        <Heading size='xl'>
          La plateforme qui réconcilie vos
          <br /> ambitions et celles de la planète
        </Heading>
      </Box>
    </Flex>
  );
};

export default Acceuil;
