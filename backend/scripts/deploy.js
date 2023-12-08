const hre = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();

  // ::::::::::::: NFT CONTRIBUTOR ::::::::::::: //

  const baseUri = "ipfs://QmWKN6dbb6ffVCDbXnqPHNnyTaZyc9mo4S36TAGr3uGyXC/";
  const NFTContributor = await ethers.getContractFactory("NFTContributor");
  const nftcontributor = await NFTContributor.deploy(baseUri);
  await nftcontributor.waitForDeployment();


  // ::::::::::::: CROWDFUNDING FACTORY ::::::::::::: //

  const CrowdfundingFactory = await ethers.getContractFactory(
    "CrowdfundingFactory"
  );
  const crowdfundingFactory = await CrowdfundingFactory.deploy(nftcontributor);

  await crowdfundingFactory.waitForDeployment();

  // ::::::::::::: LOG ::::::::::::: //

  console.log(
    `nftcontributor deployed to ${nftcontributor.target},
    crowdfundingFactory deployed to ${crowdfundingFactory.target}, owner : ${owner.address}
    `
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});