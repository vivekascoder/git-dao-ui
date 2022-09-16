import { useQuery } from "react-query";

import { fetchAuthenticatedUser } from "./api/fetchAuthenticatedUser";
import useGlobalStore from "../store";

const useGetAuthenticatedUser = () => {
  const accessToken = useGlobalStore((s) => s.accessToken);

  return useQuery(
    ["fetchUser", accessToken],
    async () => {
      if (!accessToken) {
        return new Error("User not logged in");
      }
      return await fetchAuthenticatedUser(accessToken);
    },
    {
      enabled: !!accessToken,
    }
  );
};

export default useGetAuthenticatedUser;
