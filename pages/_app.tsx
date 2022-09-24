// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { AppProps } from "next/app";
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { WagmiConfig } from "wagmi";

import "@/styles/globals.css";
import "@/styles/piechart.css";

const queryClient = new QueryClient();

import useGlobalState from "../store";
import useGlobalStore from "../store";
import { chains, wagmiClient } from "../utils/wagmi";

function MyApp({ Component, pageProps }: AppProps): React.ReactNode {
  const setAccessToken = useGlobalState((state) => state.setAccessToken);
  const resetTxModal = useGlobalStore((s) => s.resetTxModal);

  useEffect(() => {
    // To reset the state of transaction modal.
    resetTxModal();
  }, [resetTxModal]);

  useEffect(() => {
    const matchedData = document.cookie.match(/(access_token=)\w*/g);
    if (matchedData) {
      setAccessToken(matchedData[0].replace("access_token=", ""));
    }

    // eslint-disable-next-line
  }, []);

  return (
    <WagmiConfig client={wagmiClient}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={chains}>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}

export default MyApp;
