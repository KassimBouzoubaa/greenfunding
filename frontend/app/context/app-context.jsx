"use client";
import {
  baseConfigCrowdfunding,
  baseConfigFactory,
  baseConfigNft,
  crowdfundingAbi,
} from "@/constants/index";
import { useToast } from "@chakra-ui/react";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { useAccount, useContractEvent, useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";

const AppContext = createContext(null);

export function AppContextWrapper({ children }) {
  const wallet = useAccount();
  const notification = useToast();
  const [mounted, setMounted] = useState("");


  const addToMounted = (campagn) => {
    setMounted(campagn);
  };
  const removeFromMounted = () => {
    setMounted("");
  };
  const { data: deployedCampaigns } = useContractRead({
    ...baseConfigFactory,
    functionName: "getDeployedCampaigns",
    watch: true,
  });
  const adressContract = deployedCampaigns[parseInt(mounted[0])]

  const { data: campaign } = useContractRead({
    address: adressContract,
    abi: crowdfundingAbi,
		functionName: "campaign",
		watch: true,
	});

  const contribution = useContractWrite({
    address: adressContract,
    abi: crowdfundingAbi,
    functionName: 'contribute',
  })
  const check = useContractWrite({
    address: adressContract,
    abi: crowdfundingAbi,
    functionName: 'checkFundingCompleteOrExpire',
  })

  const contributionTransaction = useWaitForTransaction({
    hash: contribution.data?.hash,
    onSuccess: () =>
      notification?.({
        title: "Success",
        description: "Vous avez bien contribué",
        status: "success",
      }),
  });
  const checkTransaction = useWaitForTransaction({
    hash: check.data?.hash,
    onSuccess: () =>
      notification?.({
        title: "Success",
        description: "C'est check",
        status: "success",
      }),
    onError: () =>
      notification?.({
        title: "Success",
        description: "probleme",
        status: "success",
      }),
  });
  const value = {
    connectedWallet: wallet,
    notification,
    deployedCampaigns,
    addToMounted,
    removeFromMounted,
    mounted,
    contribution,
    campaign,
    check
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
