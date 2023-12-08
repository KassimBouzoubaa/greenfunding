import { CheckIcon } from "@chakra-ui/icons";
import {
  FormControl,
  Stack,
  InputRightElement,
  FormLabel,
  Input,
  InputGroup,
  Flex,
  InputLeftElement,
  Button,
  Textarea,
} from "@chakra-ui/react";
import InfoHeading from "../Text/InfoHeading";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { baseConfigFactory } from "@/constants/index";
import useNotification from "@/app/hooks/use-notification";
import { useState } from "react";
import { formatEther, parseEther } from "viem";

const Formulaire = () => {
  const notification = useNotification();
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [montant, setMontant] = useState("");
  const [minimum, setMinimum] = useState("");
  const [duree, setDuree] = useState("");

  const { config: createCampaignConfig } = usePrepareContractWrite({
    ...baseConfigFactory,
    functionName: "createCampaign",
    args: [montant, duree, minimum, titre, description],
  });

  const createCampaign = useContractWrite(createCampaignConfig);

  const createCampaignTransaction = useWaitForTransaction({
    hash: createCampaign.data?.hash,
    onError: () =>
      notification?.({
        title: "Erreur",
        description: "La création a échoué",
        status: "error",
      }),
    onSuccess: () =>
      notification?.({
        title: "Success",
        description: "La création a réussi",
        status: "success",
      }),
  });

  function writeContract() {
    if (
      description.length === 0 ||
      titre.length === 0 ||
      montant === 0 ||
      duree === 0 ||
      minimum === 0
    ) {
      return notification?.({
        title: "Erreur",
        description: "Veuillez remplir tout les champs",
        status: "error",
      });
    }
    setMontant("");
    setDescription("");
    setTitre("");
    setDuree("");
    setMinimum("");
    createCampaign.write();
  }
  console.log("Minimum", minimum);
  return (
    <Flex overflowY='auto' width='100%' height='100%' direction='column'>
      <Stack p='2rem' width='100%' spacing={3}>
        <InfoHeading title='Lancer une levée de fond' />
        <FormControl isRequired>
          <FormLabel>Titre</FormLabel>
          <Input
            placeholder='Titre'
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Montant cible (ETH)</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              color='gray.300'
              fontSize='0.8rem'
              children='ETH'
            />
            <Input
              placeholder='Entrez un montant'
              type='number'
              value={formatEther(montant)}
              onChange={(e) => setMontant(parseEther(e.target.value))}
            />
            <InputRightElement>
              <CheckIcon color='green.500' />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Minimum d'investissement requis (ETH)</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              color='gray.300'
              fontSize='0.8rem'
              children='ETH'
            />
            <Input
              placeholder='Entrez un montant'
              type='number'
              value={formatEther(minimum)}
              onChange={(e) => setMinimum(parseEther(e.target.value))}
            />
            <InputRightElement>
              <CheckIcon color='green.500' />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Durée (en jour)</FormLabel>
          <Input
            placeholder='Durée'
            value={duree}
            onChange={(e) => setDuree(e.target.value)}
            type='number'
          />
        </FormControl>
        <Button
          loadingText='Création en cour'
          colorScheme='green'
          onClick={() => writeContract()}
          isLoading={
            createCampaign.isLoading || createCampaignTransaction.isLoading
          }
        >
          DEMMARER
        </Button>
      </Stack>
    </Flex>
  );
};

export default Formulaire;
