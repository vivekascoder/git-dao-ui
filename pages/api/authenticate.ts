import { NextApiRequest, NextApiResponse } from "next";
import { fetchTokenInfo } from "../../utils";
import { serialize } from "cookie";

/**
 * # What is the purpose ?
 * + This will get the token.
 * + And fetch the info about the user.
 * + and send back to the page.
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(400).json({ error: "Only GET requests are supported." });
  }
  const code = req.query.code as string;
  if (!code) {
    res.status(400).json({ error: "Can't fetch the code." });
  }
  const { status, data } = await fetchTokenInfo(code);
  if (!status) {
    res.status(400).json({ error: data });
  } else {
    const token = (data.match(/(?<=access_token=)\w+/g) as string[])[0];
    console.log(`> Data: ${data}`);
    res.setHeader(
      "Set-Cookie",
      serialize("access_token", token, { path: "/" })
    );
    // Redirecting to the correct page.
    res.redirect(307, "/create");
  }
}
