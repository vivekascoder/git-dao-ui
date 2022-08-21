import Nav from "../components/Nav";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

export default function layout(props: React.PropsWithChildren) {
  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "white" }}>
      <Head>
        <title>Git DAO</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Nav />

      {/* Main content section */}
      <Box maxWidth={"40rem"} marginX={"auto"}>
        {props.children}
      </Box>
    </div>
  );
}
