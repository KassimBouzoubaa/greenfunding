import { useAppContext } from "../context/app-context";

const useCampaign = () => {
  const context = useAppContext();

  return context?.campaign;
};

export default useCampaign;
