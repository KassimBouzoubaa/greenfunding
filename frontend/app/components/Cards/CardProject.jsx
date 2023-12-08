import {
  Box,
  Card,
  CardBody,
  Heading,
  Stack,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import Image from "next/image";
import arbreImage from "../../../public/arbre.jpg";
import plante from "../../../public/plante.png";
import { ethers } from "ethers";
import { calculateDifferenceInDays } from "@/app/utils/calculateDifferenceInDays";
import useMounted from "@/app/hooks/use-mounted";

const CardProject = ({ campagn }) => {
  const { addCampagnToMounted } = useMounted();

  const handleLearnMoreClick = () => {
    addCampagnToMounted(campagn);
  };

  const differenceDays = calculateDifferenceInDays(
    parseInt(campagn[4]),
    new Date().getTime() / 1000
  );

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
          <Heading size='md'>{campagn[7]}</Heading>
          <Text>{campagn[8]}</Text>
          <Flex justifyContent='space-between' alignItems='center'>
            <Flex alignItems='center'>
              <Image src={plante} alt='plante' width={20} height={10} />
              <Text pl='1rem' color='grey' fontSize='sm'>
                {ethers.formatEther(campagn[2])}/
                {ethers.formatEther(campagn[1])} ETH
              </Text>
            </Flex>

            <Text color='grey' fontSize='sm'>
              J-{differenceDays}
            </Text>
          </Flex>
          <Button colorScheme='green' onClick={handleLearnMoreClick}>
            En savoir plus
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default CardProject;
