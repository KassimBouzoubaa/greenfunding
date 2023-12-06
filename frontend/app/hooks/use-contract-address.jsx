import { useAppContext } from "../context/app-context";

const useContractAddress = () => {
  const context = useAppContext();

  return context?.adressContract;
};

export default useContractAddress;
