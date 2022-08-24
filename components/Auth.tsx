import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { fetchTokenInfo } from "../utils";
import { useRouter } from "next/router";

export default function Auth() {
  const router = useRouter();
  // useEffect(() => {
  //   fetchTokenInfo(router.query["code"] as string);
  // }, []);
  return <Box>Done...</Box>;
}
