"use client";

import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import useTotalContribution from "@/app/hooks/use-total-contribution";
import { formatEther, parseEther } from "viem";

const Contribution = ({
  action,
  minimumContribution,
  montantCollecte,
  montantCible,
}) => {
  const [contribution, setContribution] = useState("");
  const totalContribution = useTotalContribution();

  const handleClick = () => {
    if (action == "Contribuer") {
      handleContribution();
      setContribution("");
    }
  };
  function handleContribution() {
    totalContribution.write({
      value: contribution,
    });
  }
  return (
    <Flex direction='column'>
      {montantCollecte < montantCible && (
        <>
          <Text fontWeight='bold'>Montant de la contribution</Text>
          <Flex>
            <Input
              type='number'
              defaultValue={0}
              value={formatEther(contribution)}
              onChange={(e) => setContribution(parseEther(e.target.value))}
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
