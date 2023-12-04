import { Flex } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image"; // Importez Image depuis next/image
import logo from "../../public/logo.png";

const Header = () => (
  <Flex
    as='nav'
    align='center'
    justify='space-between'
    wrap='wrap'
    padding='1.5rem'
    color='white'
  >
    <Image src={logo} alt='Logo' style={{ width: '20%'}}/>
    <ConnectButton label="Connexion"/>
  </Flex>
);

export default Header;
