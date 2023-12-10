import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Stack,
  Icon,
} from "@chakra-ui/react";
import Image from "next/image";
import { baseConfigFactory, baseConfigNft } from "../../../constants/index";
import { FaCheckCircle } from "react-icons/fa";
import nftImage from "../../../public/greenfunding_nft.png"; // Assure-toi d'avoir le chemin correct vers ton image
import {
  useAccount,
  useContractEvent,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import useNotification from "@/app/hooks/use-notification";

const Nft = () => {
  const notification = useNotification();
  const wallet = useAccount();

  const mint = useContractWrite({
    ...baseConfigFactory,
    functionName: "mintNft",
  });

  const mintTransaction = useWaitForTransaction({
    hash: mint.data?.hash,
    onError: () =>
      notification?.({
        title: "Error",
        description: "Vous ne pouvez pas mint ce nft",
        status: "error",
      }),
    onSuccess: () =>
      notification?.({
        title: "Success",
        description: "Vous avez obtenu un nft",
        status: "success",
      }),
  });

  const { data: gotNft } = useContractRead({
    ...baseConfigFactory,
    functionName: "gotNft",
    args: [wallet.address],
    watch: true,
  });

  const nftCondition =
    "Pour obtenir ce NFT, vous devez participer à au moins une levée de fonds.";

  const futureAdvantages = [
    "Réductions exclusives sur les futurs frais de plateforme",
    "Participation automatique à des événements exclusifs",
    "Accès prioritaire à de nouvelles fonctionnalités",
    "Airdrops réguliers de tokens ou de NFTs",
    "Accès à une communauté privée de détenteurs",
  ];

  return (
    <Flex justify='center' align='center' minH='100vh' bg={"green.300"}>
      <Box
        m='5rem'
        p='6'
        bg='white'
        color='black'
        borderRadius='xl'
        boxShadow='lg'
        maxW='xl'
        textAlign='center'
      >
        <Heading as='h1' mb='4' fontSize={{ base: "3xl", md: "4xl" }}>
          Green<span style={{ color: "green" }}>Funding </span>NFT
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} mb='6'>
          En détenant le NFT GreenFunding, vous pouvez bénéficier d'avantages
          futurs tels que des réductions sur les frais, des airdrops, etc.
        </Text>
        <Box
          boxShadow='xl'
          borderRadius='xl'
          overflow='hidden'
          maxW={{ base: "300px", md: "400px" }}
          mx='auto'
        >
          <Image
            src={nftImage}
            alt='Greenfunding NFT'
            layout='responsive'
            width={400}
            height={400}
          />
        </Box>
        <Text fontSize={{ base: "sm", md: "lg" }} mt='6'>
          {nftCondition}
        </Text>
        <Stack spacing='4' mt='6' align='flex-start'>
          {futureAdvantages.map((advantage, index) => (
            <Flex key={index} alignItems='center'>
              <Icon as={FaCheckCircle} color='green.500' boxSize={6} mr='2' />
              <Text fontSize={{ base: "sm", md: "lg" }}>{advantage}</Text>
            </Flex>
          ))}
        </Stack>
        {gotNft ? (
          <Flex mt={"2rem"} alignItems='center' justifyContent={"center"}>
            <Text fontSize={"xl"}>Vous possédez déjà un NFT</Text>
            <Icon as={FaCheckCircle} color='green.500' boxSize={6} ml='2rem' />
          </Flex>
        ) : (
          <Button
            colorScheme='green'
            onClick={() => mint.write()}
            fontSize={{ base: "sm", md: "lg" }}
            mt='8'
          >
            Mint ton NFT
          </Button>
        )}
      </Box>
    </Flex>
  );
};
export default Nft;
