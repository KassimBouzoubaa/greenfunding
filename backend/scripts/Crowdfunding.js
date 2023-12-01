const hre = require("hardhat");

async function main() {
  const NFTContributor = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const CrowdfundingFactory = "0x0165878A594ca255338adfa4d48449f69242Eb8F";
  const Crowdfunding = await ethers.getContractFactory("Crowdfunding");
  const crowdfunding = await Crowdfunding.deploy(
    0,
    10,
    20,
    1,
    owner,
    "Title",
    "Desc",
    CrowdfundingFactory
  );

  await crowdfunding.waitForDeployment();

  console.log(`Crowdfunding deployed to ${crowdfunding.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
