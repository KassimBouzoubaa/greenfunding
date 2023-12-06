"use client";

import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import useContributeurs from "@/app/hooks/use-contribution";
import useContribution from "@/app/hooks/use-contribution";
import { ethers } from "ethers";
import useMounted from "@/app/hooks/use-mounted";
import useDeployedCampaigns from "@/app/hooks/use-deployed-campaigns";
import { useContractRead } from "wagmi";
import { crowdfundingAbi } from "@/constants";
import useCheck from "@/app/hooks/use-check";

const Contribution = ({
  action,
  minimumContribution,
  montantCollecte,
  montantCible,
}) => {
  const [contribution, setContribution] = useState("");
  const contribute = useContribution();
  const check = useCheck();

  const handleClick = () => {
    if (action == "Contribuer") {
      handleContribution();
      setContribution("");
    }
  };
  function handleContribution() {
    contribute.write({
      value: ethers.parseEther(contribution),
    });
    check.write();
  }
  return (
    <Flex direction='column'>
      <Button onClick={() =>  check.write()}>WRITE</Button>
      {montantCollecte < montantCible && (
        <Text fontWeight='bold'>Montant de la contribution</Text>
      )}
      
      {montantCollecte < montantCible && (
        <>
        <Flex>
        <Input
          type='number'
          defaultValue={0}
          value={contribution}
          onChange={(e) => setContribution(e.target.value)}
        />
        <Button ml='1rem' colorScheme='green' onClick={() => handleClick()}>
          {action}
        </Button>
      </Flex>
      <Text color='red'>
      Note: La contribution minimum est de {minimumContribution} ETH
    </Text>
    </>
      )}
    </Flex>
  );
};

export default Contribution;
