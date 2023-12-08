import { useAppContext } from "../context/app-context";

const useWithdrawContributor = () => {
  const context = useAppContext();

  return context?.withdrawContributor;
};

export default useWithdrawContributor;