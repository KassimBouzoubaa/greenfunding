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


  // ::::::::::::: CROWDFUNDING ::::::::::::: //

  const Crowdfunding = await ethers.getContractFactory("Crowdfunding");
  const crowdfunding = await Crowdfunding.deploy(
    0,
    10,
    20,
    1,
    owner,
    "Title",
    "Desc",
    crowdfundingFactory
  );
  await crowdfunding.waitForDeployment();

  // ::::::::::::: LOG ::::::::::::: //

  console.log(
    `nftcontributor deployed to ${nftcontributor.target},
    crowdfundingFactory deployed to ${crowdfundingFactory.target},
    crowdfunding deployed to ${crowdfunding.target}, 
    `
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});