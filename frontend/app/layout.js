"use client";
import { ChakraProvider } from "@chakra-ui/react";

import "@rainbow-me/rainbowkit/styles.css";
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { hardhat, sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { AppContextWrapper } from "./context/app-context";
import Header from "./components/Header/Header";

const { chains, publicClient } = configureChains([sepolia], [publicProvider()]);
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
          <RainbowKitProvider
            chains={chains}
            theme={darkTheme({ accentColor: "green" })}
          >
            <AppContextWrapper>
              <ChakraProvider>
                <Header />
                {children}
              </ChakraProvider>
            </AppContextWrapper>
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
