const hre = require("hardhat");

async function main() {
  const baseUri = "ipfs://QmdWVnktgGkY8uUhUEngo3XC1zmJsHJ8KSr2vrPXDtDXaU/";
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
