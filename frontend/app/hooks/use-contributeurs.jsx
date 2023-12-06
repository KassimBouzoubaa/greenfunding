import { useAppContext } from "../context/app-context";

const useContributeurs = () => {
  const context = useAppContext();

  return context?.contributeurs;
};

export default useContributeurs;
