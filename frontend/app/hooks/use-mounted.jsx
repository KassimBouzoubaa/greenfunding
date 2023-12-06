import { useAppContext } from "../context/app-context";

const useMounted = () => {
  const { mounted, addToMounted, removeFromMounted } = useAppContext();

  const addCampagnToMounted = (campagn) => {
    addToMounted(campagn);
  };

  const removeCampagnFromMounted = () => {
    removeFromMounted();
  };

  return {
    mounted,
    addCampagnToMounted,
    removeCampagnFromMounted,
  };
};

export default useMounted;
