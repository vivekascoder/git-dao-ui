import { NextApiRequest } from "next";

const TOKEN_NAME = "access_token"
export const getAccessToken = (req: NextApiRequest) => {
  return !!req.cookies[TOKEN_NAME];
}