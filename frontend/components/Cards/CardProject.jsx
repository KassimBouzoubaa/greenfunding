import {
  Box,
  Card,
  CardBody,
  Heading,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/react";
import Image from "next/image";
import arbreImage from "../../public/arbre.jpg"; // Assurez-vous que le chemin vers votre image est correct
import plante from "../../public/plante.png"; // Assurez-vous que le chemin vers votre image est correct

const CardProject = ({ title, description, goal, raisedAmount, endTime }) => {
  return (
    <Card maxW='sm'>
      <CardBody>
        <Box borderRadius='lg' overflow='hidden'>
          <Image
            src={arbreImage}
            alt='Photo environnement'
            width={500}
            height={300}
          />
        </Box>
        <Stack mt='6' spacing='3'>
          <Heading size='md'>Titre du projet</Heading>
          <Text>
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces, earthy toned spaces and for people who love a chic design
            with a sprinkle of vintage design.
          </Text>
          <Flex justifyContent='space-between' alignItems='center'>
            <Flex  alignItems='center' >
              <Image src={plante} alt='plante' width={20} height={10} />
              <Text pl='1rem' color='grey' fontSize='sm'>
                3/10 ETH
              </Text>
            </Flex>

            <Text color='grey' fontSize='sm'>J-9</Text>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default CardProject;
