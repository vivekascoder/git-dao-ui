import { Box } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

import useGetAuthenticatedUser from "@/hooks/useGetAuthenticatedUser";

import User from "@/components/User";

import Nav from "../components/Nav";

import { UserInfo } from "@/types";

export default function PageLayout(props: React.PropsWithChildren) {
  const { data: user } = useGetAuthenticatedUser();
  return (
    <Box style={{ minHeight: "100vh" }} px={4}>
      <Box position={"fixed"} bottom="3" left={"4"} zIndex="50">
        <User user={user} />
      </Box>
      <Head>
        <title>Git DAO</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Nav />
      <Box mb={20} />

      {/* Main content section */}
      <Box maxWidth={"40rem"} marginX={"auto"}>
        {props.children}
      </Box>
    </Box>
  );
}
