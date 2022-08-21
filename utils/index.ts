import axios from "axios";

export const REDIRECT_URI = `https://git-dao-ui.vercel.app/authorize`;
export const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
export const fetchTokenInfo = async (code: string) => {
  const { data } = await axios.post(
    `https://github.com/login/oauth/access_token`,
    {
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      code: code,
      redirect_uri: `https://git-dao-ui.vercel.app/create`,
    }
  );
  console.log(data);
};
