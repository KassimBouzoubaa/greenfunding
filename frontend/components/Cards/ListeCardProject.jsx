import { Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CardProject from "./CardProject";
import useDeployedCampaigns from "@/app/hooks/use-deployed-campaigns";
import { useContractRead } from "wagmi";
import { readContract } from "@wagmi/core";
import { crowdfundingAbi, baseConfigFactory } from "@/constants/index";
import { ethers } from "ethers";

const ListeCardProject = () => {
  const [listeCampaigns, setListeCampaigns] = useState([]);
  const campaigns = useDeployedCampaigns();

  useEffect(() => {
    const fetchData = async () => {
      if (campaigns) {
        const promises = campaigns.map(async (campaignAddress) => {
          const data = await readContract({
            address: campaignAddress,
            abi: crowdfundingAbi,
            functionName: "campaign",
          });
          return data;
        });

        const dataArray = await Promise.all(promises);
        setListeCampaigns(dataArray);
      }
    };
    fetchData();
  }, [campaigns]);

  return (
    <Flex
      p='2rem'
      overflowY='auto'
      width='100%'
      height='100%'
      direction='column'
    >
      {listeCampaigns.length > 0 ? (
        <Heading mb='2rem'>
          Les <span style={{ color: "green" }}>projets</span> en cours, et ce
          n'est que le début !
        </Heading>
      ) : (
        <Heading mb='2rem'>
          Il n'y a actuellement aucun projet en cours.
        </Heading>
      )}

      <SimpleGrid columns={[1, 2]} spacing='30px'>
        {listeCampaigns.length > 0 ? (
          listeCampaigns.map((campagn, index) => (
            
              <CardProject key={index} campagn={campagn} />
            
          ))
        ) : (
          <></>
        )}
      </SimpleGrid>
    </Flex>
  );
};

export default ListeCardProject;
