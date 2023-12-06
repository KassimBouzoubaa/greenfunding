import { useAppContext } from "../context/app-context";

const useCheck = () => {
  const context = useAppContext();

  return context?.check;
};

export default useCheck;
