import axios from "axios";

import CONFIG from "@/config";

export const fetchTokenInfo = async (code: string) => {
  try {
    const res = await axios.post(CONFIG.ACCESS_TOKEN_URL, {
      client_id: CONFIG.CLIENT_ID,
      client_secret: CONFIG.CLIENT_SECRET,
      code: code,
      redirect_uri: CONFIG.REDIRECT_URI,
    });
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
