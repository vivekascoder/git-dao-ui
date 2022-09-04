import axios from "axios";

export const REDIRECT_URI = `http://localhost:3000/api/authenticate`;
export const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;

export const fetchTokenInfo = async (code: string) => {
  try {
    const res = await axios.post(
      `https://github.com/login/oauth/access_token`,
      {
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: code,
        redirect_uri: `http://localhost:3000/api/authenticate`,
      }
    );
    const data: string = res.data;
    return { status: true, data: data };
  } catch (e) {
    return { status: false, data: (e as Error).message };
  }
};

export const encodeData = (o: object): string => {
  return btoa(JSON.stringify(o));
};

export const decodeData = (s: string): object => {
  return JSON.parse(atob(s));
};
