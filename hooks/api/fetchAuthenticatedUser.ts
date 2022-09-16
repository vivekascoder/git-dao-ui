import axios from "axios";

import { UserInfo } from "../../types";

export const fetchAuthenticatedUser = async (
  accessToken: string
): Promise<UserInfo> => {
  const { data } = await axios.get(`https://api.github.com/user`, {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
  return {
    username: data.login,
    id: data.id,
    avatar: data.avatar_url,
    name: data.name,
  };
};
