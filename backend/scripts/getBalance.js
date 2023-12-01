const { ethers} = require("hardhat");

async function main() {
    let provider = ethers.getDefaultProvider();

    const [deployer] = await ethers.getSigners();
    const balanceInWei = await provider.getBalance(deployer.address);

    console.log("Deploying contracts with the account:", ethers.formatEther(balanceInWei.toString()) );

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });