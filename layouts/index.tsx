import { Box } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

import useGetAuthenticatedUser from "@/hooks/useGetAuthenticatedUser";

import TransactionModal from "@/components/Modals/Transaction";
import Nav from "@/components/Nav";
import User from "@/components/User";

import { UserInfo } from "@/types";

export default function PageLayout(props: React.PropsWithChildren) {
  const { data: user } = useGetAuthenticatedUser();
  return (
    <Box style={{ minHeight: "100vh" }}>
      <Box position={"fixed"} bottom="3" left={"4"} zIndex="50">
        <User user={user as UserInfo} />
      </Box>
      <TransactionModal />
      <Head>
        <title>Git DAO</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Nav />

      {/* Main content section */}
      <Box maxWidth={"40rem"} pt="20" marginX={"auto"}>
        {props.children}
      </Box>
    </Box>
  );
}
