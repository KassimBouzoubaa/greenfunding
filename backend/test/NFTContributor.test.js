const {
  loadFixture,
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

  // ::::::::::::: BaseURI ::::::::::::: //
  describe("BaseUri", function () {
    it("La BaseUri est bien enregistré", async function () {
      expect(await this.nftcontributor.baseURI()).to.equal(this.baseUri);
    });
  });

  // ::::::::::::: crowdfundingFactory ::::::::::::: //
  describe("crowdfundingFactory", function () {
    beforeEach(async function () {
      await this.nftcontributor.setCrowdFundingFactory(
        this.crowdfundingFactory
      );
    });
    it("Le crowdfundingFactory est bien enregistré", async function () {
      expect(await this.nftcontributor.crowdfundingFactory()).to.equal(
        this.crowdfundingFactory.target
      );
    });
    it("Ne peux pas modifier deux fois le crowdfundingFactory", async function () {
      await expect(
        this.nftcontributor.setCrowdFundingFactory(this.crowdfundingFactory)
      ).to.be.revertedWith("crowdfundingFactory address is already set");
    });
  });

  // ::::::::::::: Mint function ::::::::::::: //
  describe("Mint", function () {
    beforeEach(async function () {
      await this.nftcontributor.setCrowdFundingFactory(
        this.crowdfundingFactory
      );
      await this.crowdfunding.contribute({ value: ethers.parseEther("2.0") });
    });
    it("Le mapping minted passe à true pour l'adresse qui mint", async function () {
      const mintedBeforeMint = await this.nftcontributor.minted(this.owner);
      await this.crowdfundingFactory.mintNft();
      const mintedAfterMint = await this.nftcontributor.minted(this.owner);

      expect(mintedBeforeMint).to.be.false;
      expect(mintedAfterMint).to.be.true;
    });
    it("Le total des Nft augmente de 1 après un mint", async function () {
      const totalNftsBeforeMint = await this.nftcontributor.totalNfts();
      await this.crowdfundingFactory.mintNft();
      const totalNftsAfterMint = await this.nftcontributor.totalNfts();
      expect(totalNftsBeforeMint).to.equal(0);
      expect(totalNftsAfterMint).to.equal(1);
    });
    it("L'evenement Minted a bien fonctionné", async function () {
      expect(await this.crowdfundingFactory.mintNft())
        .to.emit(this.nftcontributor, "Minted")
        .withArgs(this.owner, this.nftcontributor.totalNfts());
    });
  });
    // ::::::::::::: URI functions ::::::::::::: //
    describe("uri", function () {
    
      it("La base uri se modifie bien", async function () {
        const uriBefore = await this.nftcontributor.baseURI();
        await this.nftcontributor.setBaseURI("new");
        const uriAfter = await this.nftcontributor.baseURI();

       expect(uriBefore).to.equal(this.baseUri);
       expect(uriAfter).to.equal('new');
      });
      it("Je recupère bien la baseURI", async function () {
       expect(await this.nftcontributor.tokenURI()).to.equal(this.baseUri);
      });
    })
    // ::::::::::::: CrowdFundingFactory ::::::::::::: //
    describe("uri", function () {
      it("Je recupère bien la baseURI", async function () {
        await this.nftcontributor.setCrowdFundingFactory(
          this.crowdfundingFactory
        );
        expect(await this.nftcontributor.crowdfundingFactory()).to.equal(this.crowdfundingFactory.target);
      });
    })
});
