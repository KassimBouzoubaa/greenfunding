import { useAppContext } from "../context/app-context";

const useDeployedCampaigns = () => {
  const context = useAppContext();

  return context?.deployedCampaigns;
};

export default useDeployedCampaigns;
