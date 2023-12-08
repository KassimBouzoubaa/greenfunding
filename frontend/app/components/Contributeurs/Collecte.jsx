"use client";

import useWithdraw from "@/app/hooks/use-withdraw";
import useWithdrawContributor from "@/app/hooks/use-withdraw-contributor";
import { Button, Flex } from "@chakra-ui/react";

const Collecte = ({ value }) => {
  const withdraw = useWithdraw();
  const withdrawContributor = useWithdrawContributor();
  const handleClick = () => {
    if (value === "Retirer") {
      withdraw.write();
    } else {
      withdrawContributor.write();
    }
  };
  return (
    <Flex>
      <Button ml='1rem' colorScheme='green' onClick={() => handleClick()}>
        {value}
      </Button>
    </Flex>
  );
};

export default Collecte;
