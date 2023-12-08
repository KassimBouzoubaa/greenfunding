const hre = require("hardhat");

async function main() {
  const baseUri = "ipfs://QmWKN6dbb6ffVCDbXnqPHNnyTaZyc9mo4S36TAGr3uGyXC/";
  const NFTContributor = await ethers.getContractFactory("NFTContributor");
  const nftcontributor = await NFTContributor.deploy(baseUri);

  const owner = await nftcontributor.owner();

  console.log(
    `nftcontributor deployed to ${nftcontributor.target}, sender ${owner}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
