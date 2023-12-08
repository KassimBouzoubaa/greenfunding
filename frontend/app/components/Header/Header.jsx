"use client";
import { Button, Flex, Text } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import logo from "../../../public/logo.png";
import Link from "next/link";

const Header = () => (
  <Flex
    as='nav'
    align='center'
    justify='space-between'
    wrap='wrap'
    padding='1.5rem'
    color='white'
  >
    <Image src={logo} alt='Logo' style={{ width: "20%" }} />
    <Flex gap={"2rem"} mr={"11rem"}>
      <Link
        style={{ color: "black", textDecoration: "none", fontSize: "18px" }}
        href='/'
      >
        Acceuil
      </Link>
      <Link
        style={{ color: "black", textDecoration: "none", fontSize: "18px" }}
        href='/nft'
      >
        NFT
      </Link>
      <Link
        style={{ color: "black", textDecoration: "none", fontSize: "18px" }}
        href='/whitepaper'
      >
        Whitepaper
      </Link>
      <Link
        style={{ color: "black", textDecoration: "none", fontSize: "18px" }}
        href='/litepaper'
      >
        Litepaper
      </Link>

    </Flex>
    <ConnectButton label='Connexion' />
  </Flex>
);

export default Header;
