import { useAppContext } from "../context/app-context";

const useWithdraw = () => {
  const context = useAppContext();

  return context?.withdraw;
};

export default useWithdraw;
