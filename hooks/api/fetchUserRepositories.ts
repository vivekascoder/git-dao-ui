import axios from "axios";

import { filterData } from "@/helpers/filterData";

import { RepoType } from "@/types";


export const fetchUserRepositories = async (
  accessToken: string
): Promise<RepoType[]> => {
  const { data } = await axios.get(
    `https://api.github.com/user/repos?affiliation=owner`,
    {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    }
  );
  return filterData(data);
};
