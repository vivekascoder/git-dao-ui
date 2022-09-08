import { Box } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

import User from "@/components/User";

import useGlobalStore from "@/store";

import Nav from "../components/Nav";

export default function PageLayout(props: React.PropsWithChildren) {
  const user = useGlobalStore((s) => s.user);
  return (
    <Box style={{ minHeight: "100vh" }}>
      <Box position={"absolute"} bottom="3" left={"4"}>
        <User user={user} />
      </Box>
      <Head>
        <title>Git DAO</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Nav />

      {/* Main content section */}
      <Box maxWidth={"40rem"} marginX={"auto"}>
        {props.children}
      </Box>
    </Box>
  );
}
