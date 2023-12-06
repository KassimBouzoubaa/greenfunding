"use client";

import { Flex, Text, CloseButton } from "@chakra-ui/react";
import Badge from "../Badge/Badge";
import Contribution from "../Contributeurs/Contribution";
import InfoText from "../Text/InfoText";
import Collecte from "../Contributeurs/Collecte";
import ProgressBar from "../ProgressBar/ProgressBar";
import InfoHeading from "../Text/InfoHeading";
import useMounted from "@/app/hooks/use-mounted";
import { calculateDifferenceInDays } from "@/app/utils/calculateDifferenceInDays";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import useCampaign from "@/app/hooks/use-campaign";

const Etat = () => {
  const { address } = useAccount();

  const { mounted, removeCampagnFromMounted } = useMounted();
  const campaign = useCampaign();
  const state = ["Financement", "Expiré", "Terminé"];
  const differenceDays = calculateDifferenceInDays(
    parseInt(campaign[4]),
    new Date().getTime() / 1000
  );
  const handleRemoveClick = () => {
    removeCampagnFromMounted();
  };
  const montantCollecte = ethers.formatEther(campaign[2]);
  const montantCible = ethers.formatEther(campaign[1]);
console.log(campaign)
  return (
    <Flex p='2rem' width='100%' direction='column' gap='2rem'>
      <Flex width='100%' justifyContent='space-between' alignItems='center'>
        <Flex direction='column'>
          <InfoHeading title='Participer au financement du projet' />
          <Text fontSize='xl'>{campaign[7]}</Text>
        </Flex>
        <Flex mb='1rem'>
          <Badge title={state[campaign[9]]} />
          <CloseButton
            ml='1rem'
            onClick={handleRemoveClick}
            alignSelf='flex-end'
          />
        </Flex>
      </Flex>
      <Flex justifyContent='space-between'>
        <Flex direction='column' gap='1rem' mb='2rem'>
          <InfoText title='Montant cible' content={`${montantCible} ETH`} />
          <InfoText title='Date limite' content={`J - ${differenceDays}`} />
        </Flex>
        <Flex direction='column' gap='1rem'>
          <InfoText
            title='Montant collecté'
            content={`${montantCollecte} ETH`}
          />
          {address == campaign[6] ? (
            <>
              {montantCollecte >= montantCible && (
                <Contribution
                  minimumContribution={ethers.formatEther(campaign[5])}
                  action='Withdraw'
                  montantCollecte={montantCollecte}
                  montantCible={montantCible}
                />
              )}
            </>
          ) : (
            <Contribution
              minimumContribution={ethers.formatEther(campaign[5])}
              action='Contribuer'
              montantCollecte={montantCollecte}
              montantCible={montantCible}
            />
          )}
        </Flex>
      </Flex>
      <ProgressBar
        montantCollecte={montantCollecte}
        montantCible={montantCible}
      />
    </Flex>
  );
};

export default Etat;
