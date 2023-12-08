"use client";
import { baseConfigFactory, crowdfundingAbi } from "@/constants/index";
import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useState } from "react";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

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
  const adressContract = deployedCampaigns?.[parseInt(mounted[0])];

  const { data: campaign } = useContractRead({
    address: adressContract,
    abi: crowdfundingAbi,
    functionName: "campaign",
    watch: true,
  });
  const { data: contribution } = useContractRead({
    address: adressContract,
    abi: crowdfundingAbi,
    functionName: "contributions",
    args: [wallet.address],
    watch: true,
  });

  const totalContribution = useContractWrite({
    address: adressContract,
    abi: crowdfundingAbi,
    functionName: "contribute",
  });
  const withdraw = useContractWrite({
    address: adressContract,
    abi: crowdfundingAbi,
    functionName: "withdrawFunds",
  });
  const withdrawContributor = useContractWrite({
    address: adressContract,
    abi: crowdfundingAbi,
    functionName: "withdrawContributor",
  });

  const totalContributionTransaction = useWaitForTransaction({
    hash: totalContribution.data?.hash,
    onSuccess: () =>
      notification?.({
        title: "Success",
        description: "Vous avez bien contribué au projet",
        status: "success",
      }),
  });
  const withdrawTransaction = useWaitForTransaction({
    hash: withdraw.data?.hash,
    onSuccess: () =>
      notification?.({
        title: "Success",
        description: "Vous avez bien récupér les fonds",
        status: "success",
      }),
  });
  const withdrawContributorTransaction = useWaitForTransaction({
    hash: withdrawContributor.data?.hash,
    onSuccess: () =>
      notification?.({
        title: "Success",
        description: "Vous avez bien récupér vos fonds",
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
    totalContribution,
    campaign,
    withdraw,
    contribution,
    withdrawContributor,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
