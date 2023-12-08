require("@nomicfoundation/hardhat-toolbox");
require("dotenv/config");
require("hardhat-gas-reporter");
require('solidity-docgen');
require("@nomicfoundation/hardhat-verify");

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL || "";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 11155111,
      blockConfirmations: 6,
    },
    mumbai: {
      url: MUMBAI_RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 80001,
      blockConfirmations: 2,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
  },
  gasReporter: {
    enabled: true,
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  docgen: {},
  solidity: {
    compilers: [
      {
        version: "0.8.20",
      },
    ],
  },
};
