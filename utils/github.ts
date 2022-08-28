// Mainly github api satuff.
import axios from "axios";

export type UserInfo = {
  id: number;
  username: string;
  avatar: string;
};
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
  };
};
