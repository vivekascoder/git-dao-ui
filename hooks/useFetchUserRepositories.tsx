import { useQuery } from "react-query";

import { fetchUserRepositories } from "./api/fetchUserRepositories";
import useGlobalStore from "../store";

const useFetchUserRepositories = () => {
  const accessToken = useGlobalStore((s) => s.accessToken);

  return useQuery(
    ["fetchRepositories", accessToken],
    async () => {
      if (!accessToken) {
        return new Error("User not logged in");
      }
      return await fetchUserRepositories(accessToken);
    },
    {
      enabled: !!accessToken,
    }
  );
};

export default useFetchUserRepositories;
