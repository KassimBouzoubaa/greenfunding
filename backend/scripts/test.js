const hre = require("hardhat");

async function main() {
  const NFTContributor = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const CrowdfundingFactory = await ethers.getContractFactory(
    "CrowdfundingFactory"
  );
  const crowdfundingFactory = await CrowdfundingFactory.deploy(NFTContributor);

  await crowdfundingFactory.waitForDeployment();

  await crowdfundingFactory.createCampaign(
    ethers.parseEther("10.0") ,
    20,
    ethers.parseEther("1.0") ,
    "Title",
    "Desc",
  );

  const deployedCampaigns = await crowdfundingFactory.getDeployedCampaigns()
  
  console.log(`${deployedCampaigns}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});