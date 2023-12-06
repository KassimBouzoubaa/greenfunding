import { useAppContext } from "../context/app-context";

const useContribution = () => {
  const context = useAppContext();

  return context?.contribution;
};

export default useContribution;
