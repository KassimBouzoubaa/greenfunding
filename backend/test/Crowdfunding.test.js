const {
  loadFixture,
  mine,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTContributor tests", function () {
  async function deployContract() {
    const [owner, adr1] = await ethers.getSigners();
    const baseUri = "ipfs://QmWKN6dbb6ffVCDbXnqPHNnyTaZyc9mo4S36TAGr3uGyXC/";
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
      ethers.parseEther("10.0") ,
      20,
      ethers.parseEther("1.0") ,
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

  // ::::::::::::: onlyOwner ::::::::::::: //
  describe("onlyOwner", function () {
    it("Seulement l'owner du projet peux effectué l'action", async function () {
      await expect(
        this.crowdfunding.connect(this.adr1).withdrawFunds()
      ).to.be.revertedWith("Only the campaign owner can perform this action");
    });
  });
  // ::::::::::::: validateExpiry ::::::::::::: //
  describe("validateExpiry", function () {
    it("Ne peux pas effectué le withdrawContributor si le state actuel n'est pas Expired", async function () {
      await expect(
        this.crowdfunding.withdrawContributor()
      ).to.be.revertedWith("Invalid state");
    });
    it("Ne peux pas effectué le withdrawFunds si le state actuel n'est pas Successful", async function () {
      await expect(
        this.crowdfunding.withdrawFunds()
      ).to.be.revertedWith("Invalid state");
    });
    it("Ne peux pas effectué le contribute si le state actuel n'est pas Fundraising", async function () {
        await this.crowdfunding.contribute({ value: ethers.parseEther("11.0") })
      await expect(
        this.crowdfunding.contribute({ value: ethers.parseEther("1.0") })
      ).to.be.revertedWith("Invalid state");
    });
  });
  // ::::::::::::: Contribute ::::::::::::: //
  describe("Contribute", function () {
    it("Le montant de la contribution est bien enregistré", async function () {
      await this.nftcontributor.setCrowdFundingFactory(
        this.crowdfundingFactory
      );
      await this.crowdfunding.contribute({ value: ethers.parseEther("2.0") });
      expect(
        await this.crowdfunding.contributions(this.owner.address)
      ).to.equal(ethers.parseEther("2.0"));
    });
    it("Le montant de la contribution est bien ajouté au raisedAmount de la campagne", async function () {
      await this.nftcontributor.setCrowdFundingFactory(
        this.crowdfundingFactory
      );
      await this.crowdfunding.contribute({ value: ethers.parseEther("2.0") });
      const campaign = await this.crowdfunding.campaign();
      expect(campaign.raisedAmount).to.equal(ethers.parseEther("2.0"));
    });
    it("L'évenement ContributionMade a bien fonctionné.", async function () {
      await this.nftcontributor.setCrowdFundingFactory(
        this.crowdfundingFactory
      );
      const blockTimeStamp = (await ethers.provider.getBlock("latest"))
      .timestamp;
      await expect(
        this.crowdfunding.contribute({ value: ethers.parseEther("2.0")})
      )
        .to.emit(this.crowdfunding, "ContributionMade")
        .withArgs(this.owner.address, ethers.parseEther("2.0"), blockTimeStamp +1);
    });
  });
  // ::::::::::::: checkFundingCompleteOrExpire ::::::::::::: //
  describe("onlyOwner", function () {
    beforeEach(async function () {
      await this.nftcontributor.setCrowdFundingFactory(
        this.crowdfundingFactory
      );
    });
    it("Change de state de la campagne si la condition est remplie", async function () {
      await this.crowdfunding.contribute({ value: ethers.parseEther("11.0") });
      await this.crowdfunding.checkFundingCompleteOrExpire();
      const campaigne = await this.crowdfunding.campaign();
      expect(campaigne.state).to.equal(
        2,
        "Le State devrait être Successful (valeur 2)"
      );
    });
    it("Change la date de fin de la campagne si la condition est remplie", async function () {
      await this.crowdfunding.contribute({ value: ethers.parseEther("11.0") });
      await this.crowdfunding.checkFundingCompleteOrExpire();
      const campaigne = await this.crowdfunding.campaign();
      const blockTimestampBefore = (await ethers.provider.getBlock("latest"))
        .timestamp;
      expect(campaigne.completeAt).to.equal(blockTimestampBefore);
    });
    it("L'évenement GoalReached a bien fonctionné", async function () {
      await this.crowdfunding.contribute({ value: ethers.parseEther("11.0") });
      const campaigne = await this.crowdfunding.campaign();
      await this.crowdfunding.checkFundingCompleteOrExpire();

      await expect(this.crowdfunding.checkFundingCompleteOrExpire())
        .to.emit(this.crowdfunding, "GoalReached")
        .withArgs(campaigne.raisedAmount);
    });
    it("Change de state de la campagne si la condition est remplie", async function () {
      await mine(30000000);
      await this.crowdfunding.checkFundingCompleteOrExpire();

      const campaigne = await this.crowdfunding.campaign();

      expect(campaigne.state).to.equal(
        1,
        "Le State devrait être Expired (valeur 1)"
      );
    });
    it("L'évenement CampaignExpired a bien fonctionné", async function () {
      await mine(30000000);
      await expect(this.crowdfunding.checkFundingCompleteOrExpire())
        .to.emit(this.crowdfunding, "CampaignExpired")
        .withArgs();
    });
  });
  // ::::::::::::: withdrawContributor ::::::::::::: //
  describe("withdrawContributor", function () {
    beforeEach(async function () {
      await this.crowdfunding.contribute({ value: ethers.parseEther("1.0") });
      await mine(30000000);
      await this.crowdfunding.checkFundingCompleteOrExpire();
    });
    it("Possibilité de récupérer ses fonds si le contrat est expiré", async function () {
      const contributionBefore = await this.crowdfunding.contributions(
        this.owner.address
      );
      await this.crowdfunding.withdrawContributor();      
      const contributionAfter = await this.crowdfunding.contributions(
        this.owner.address
      );
      expect(contributionBefore).to.equal(ethers.parseEther("1.0"));
      expect(contributionAfter).to.equal(ethers.parseEther("0"));
    });
    it("L'évenement WithdrawContributor a bien fonctionné", async function () {
      await expect(this.crowdfunding.withdrawContributor())
        .to.emit(this.crowdfunding, "WithdrawContributor")
        .withArgs(
          await this.owner.address,
          await this.crowdfunding.contributions(this.owner.address)
        );
    });
  });
  // ::::::::::::: withdrawFunds ::::::::::::: //
  describe("withdrawFunds", function () {
    it("L'owner arrive bien à récupérer les fonds du contrat", async function () {
      await this.crowdfunding.contribute({ value: ethers.parseEther("11.0") });
      await this.crowdfunding.checkFundingCompleteOrExpire();
      const balanceBefore = await ethers.provider.getBalance(this.crowdfunding)
      await this.crowdfunding.withdrawFunds();
      const balanceAfter = await ethers.provider.getBalance(this.crowdfunding)
      expect(balanceBefore).to.equal(ethers.parseEther("11.0"));
      expect(balanceAfter).to.equal(ethers.parseEther("0"));
    });
    it("L'évenement WithdrawFunds a bien fonctionné", async function () {
      await this.crowdfunding.contribute({ value: ethers.parseEther("11.0") });
      await this.crowdfunding.checkFundingCompleteOrExpire();

      await expect(this.crowdfunding.withdrawFunds())
        .to.emit(this.crowdfunding, "WithdrawFunds")
        .withArgs(
          await this.owner.address,
          await ethers.provider.getBalance(this.crowdfunding)
        );
    });
  });
});
