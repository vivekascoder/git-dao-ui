import axios from "axios";

import { filterData } from "@/helpers/filterData";

import { RepoType, UserInfo } from "@/types";

export const searchInUserRepos = async (
  q: string,
  user: UserInfo,
  accessToken: string
): Promise<RepoType[]> => {
  console.log("searching", user);
  const queryString = "q=" + encodeURIComponent(`user:${user.username} ${q}`);
  try {
    const { data } = await axios.get(
      `https://api.github.com/search/repositories?${queryString}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `token ${accessToken}`,
        },
      }
    );
    return filterData(data.items);
  } catch (e) {
    return [];
  }
};