import { useAppContext } from "../context/app-context";

const totalContribution = () => {
  const context = useAppContext();

  return context?.totalContribution;
};

export default totalContribution;
