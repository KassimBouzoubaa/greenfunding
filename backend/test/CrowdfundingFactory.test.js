const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTContributor tests", function () {
  async function deployContract() {
    const [owner, adr1] = await ethers.getSigners();
    const baseUri = "ipfs://QmdWVnktgGkY8uUhUEngo3XC1zmJsHJ8KSr2vrPXDtDXaU/";
    /* NFT CONTRIBUTOR */

    const NFTContributor = await ethers.getContractFactory("NFTContributor");
    const nftcontributor = await NFTContributor.deploy(baseUri);
    /* CROWDFUNDINGFACTORY */

    const CrowdfundingFactory = await ethers.getContractFactory(
      "CrowdfundingFactory"
    );
    const crowdfundingFactory = await CrowdfundingFactory.deploy(
      nftcontributor
    );
    /* CROWDFUNDING */

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

    return {
      nftcontributor,
      owner,
      adr1,
      crowdfunding,
      crowdfundingFactory,
      baseUri,
    };
  }
  beforeEach(async function () {
    Object.assign(this, await loadFixture(deployContract));
  });

  // ::::::::::::: Contributed ::::::::::::: //
  describe("Contributed", function () {
    it("ContributedToContract & contributedStatus passent à true après une contribution.", async function () {
      await this.crowdfunding.contribute({ value: ethers.parseEther("2.0") });
      expect(
        await this.crowdfundingFactory.contributedToContract(
          this.owner.address,
          this.crowdfunding.target
        )
      ).to.be.true;
      expect(
        await this.crowdfundingFactory.contributedStatus(this.owner.address)
      ).to.be.true;
    });
  });
  // ::::::::::::: Create Campaign ::::::::::::: //

  describe("Create Campaign", function () {
    it("L'adresse de l'instance de la campagne est bien enregistré dans la variable deployedCampaigns", async function () {
      const beforeDeployedCampaigns =
        await this.crowdfundingFactory.getDeployedCampaigns();
      await this.crowdfundingFactory.createCampaign(10, 20, 1, "Title", "Desc");
      const afterDeployedCampaigns =
        await this.crowdfundingFactory.getDeployedCampaigns();

      expect(beforeDeployedCampaigns.length).to.equal(0);
      expect(afterDeployedCampaigns.length).to.equal(1);
    });
    it("L'evenement CampaignCreated a bien fonctionné.", async function () {
      await expect(
        this.crowdfundingFactory.createCampaign(10, 20, 1, "Title", "Desc")
      )
        .to.emit(this.crowdfundingFactory, "CampaignCreated")
        .withArgs(10, 20, 1, this.owner.address, "Title", "Desc");
    });
    it("La création est refué si la contribution minimum dépasse l'objectif", async function () {
      await expect(
        this.crowdfundingFactory.createCampaign(10, 20, 11, "Title", "Desc")
      ).to.be.revertedWith("La contribution minimum depasse l'objectif.");
    });
  });
  // ::::::::::::: Mint NFT ::::::::::::: //
  describe("MintNFT", function () {
    it("Le mint est refusé si le msg.sender n'a pas contribué", async function () {
      await expect(this.crowdfundingFactory.mintNft()).to.be.revertedWith(
        "you haven't contributed yet"
      );
    });
    it("Le mint est refusé si le msg.sender a déjà mint", async function () {
      await this.nftcontributor.setCrowdFundingFactory(
        this.crowdfundingFactory
      );
      await this.crowdfunding.contribute({ value: ethers.parseEther("2.0") });
      await this.crowdfundingFactory.mintNft();

      await expect(this.crowdfundingFactory.mintNft()).to.be.revertedWith(
        "You have already mint"
      );
    });
    it("Le mint est refusé si le msg.sender a déjà mint", async function () {
      await this.nftcontributor.setCrowdFundingFactory(
        this.crowdfundingFactory
      );
      await this.crowdfunding.contribute({ value: ethers.parseEther("2.0") });
      await this.crowdfundingFactory.mintNft();

      expect(await this.crowdfundingFactory.gotNft(this.owner.address)).to.be
        .true;
    });
  });
});
