// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./NFTContributor.sol";
import "./Crowdfunding.sol";

/**
 * @title CrowdfundingFactory
 * @dev Contract to manage the creation of Crowdfunding campaigns and NFT minting based on contributions.
 */
contract CrowdfundingFactory {
    Crowdfunding[] public deployedCampaigns; // Array to store deployed Crowdfunding contracts
    NFTContributor public nftContract; // Reference to the NFTContributor contract
    mapping(address => bool) public gotNft; // Tracks users who have received an NFT
    mapping(address => bool) public contributedStatus; // Tracks users who have contributed
    mapping(address => mapping(address => bool)) public contributedToContract; // Tracks contributors to specific contracts

    event CampaignCreated(
        uint goal,
        uint durationDays,
        uint minimumContribution,
        address owner,
        string projectTitle,
        string projectDes
    );

    /**
     * @dev Initializes the CrowdfundingFactory with the NFTContributor contract address.
     * @param _NFTContributor Address of the NFTContributor contract.
     */
    constructor(address _NFTContributor) {
        nftContract = NFTContributor(_NFTContributor);
    }

    function setContributedStatus(address _sender) internal {
        contributedStatus[_sender] = true;
    }

    /**
     * @dev Marks a contributor's status for a specific contract.
     * @param _sender Address of the contributor.
     * @param _contract Address of the contract.
     */
    function hasContributed(address _sender, address _contract) external {
        contributedToContract[_sender][_contract] = true;
        setContributedStatus(_sender);
    }

    /**
     * @dev Creates a new Crowdfunding campaign.
     * @param goal Funding goal for the campaign.
     * @param durationDays Duration of the campaign in days.
     * @param minimumContribution Minimum contribution required for the campaign.
     * @param projectTitle Title of the project.
     * @param projectDes Description of the project.
     */
    function createCampaign(
        uint goal,
        uint durationDays,
        uint minimumContribution,
        string calldata projectTitle,
        string memory projectDes
    ) external {
        require(minimumContribution <= goal, "Minimum contribution exceeds the goal.");
        Crowdfunding newCampaign = new Crowdfunding(
            deployedCampaigns.length,
            goal,
            durationDays,
            minimumContribution,
            msg.sender,
            projectTitle,
            projectDes,
            address(this)
        );

        deployedCampaigns.push(newCampaign);
        emit CampaignCreated(
            goal,
            durationDays,
            minimumContribution,
            msg.sender,
            projectTitle,
            projectDes
        );
    }

    /**
     * @dev Allows contributors to mint an NFT based on their contribution.
     */
    function mintNft() external {
        require(contributedStatus[msg.sender], "You haven't contributed yet");
        require(!gotNft[msg.sender], "You have already minted");
        nftContract.mint(msg.sender);
        gotNft[msg.sender] = true;
    }

    /**
     * @dev Retrieves the list of deployed Crowdfunding campaigns.
     * @return Array of deployed Crowdfunding contracts.
     */
    function getDeployedCampaigns() external view returns (Crowdfunding[] memory) {
        return deployedCampaigns;
    }
}
