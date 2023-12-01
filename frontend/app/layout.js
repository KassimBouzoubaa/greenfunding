"use client";
import { ChakraProvider } from "@chakra-ui/react";

import "@rainbow-me/rainbowkit/styles.css";
import { darkTheme, getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { hardhat } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains([hardhat], [publicProvider()]);
const { connectors } = getDefaultWallets({
  appName: "Greenfunding",
  projectId: process.env.WALLET_CONNECT_API_KEY,
  chains,
});
const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
});

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains} theme={darkTheme({accentColor: "green"})} >
            <ChakraProvider>{children}</ChakraProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}