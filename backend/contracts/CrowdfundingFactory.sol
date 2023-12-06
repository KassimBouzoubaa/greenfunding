// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./NFTContributor.sol";
import "./Crowdfunding.sol";

contract CrowdfundingFactory {
    Crowdfunding[] public deployedCampaigns;
    NFTContributor public nftContract;
    mapping(address => bool) public gotNft;
    mapping(address => bool) public contributedStatus;
    mapping(address => mapping(address => bool)) public contributedToContract;

    event CampaignCreated(
        uint goal,
        uint durationDays,
        uint minimumContribution,
        address owner,
        string projectTitle,
        string projectDes
    );

    constructor(address _NFTContributor) {
        nftContract = NFTContributor(_NFTContributor);
    }

    function setContributedStatus(address _sender) internal {
        contributedStatus[_sender] = true;
    }
    function hasContributed(address _sender, address _contract) external {
         contributedToContract[_sender][_contract] = true;
         setContributedStatus(_sender);
    }

    function createCampaign(
        uint goal,
        uint durationDays,
        uint minimumContribution,
        string calldata projectTitle,
        string memory projectDes
    ) external {
        require(minimumContribution <= goal, "La contribution minimum depasse l'objectif.");
        Crowdfunding newCampaign = 
            new Crowdfunding(
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

    function mintNft() external {
        require(contributedStatus[msg.sender], "you haven't contributed yet");
        require(!gotNft[msg.sender], "You have already mint");
        nftContract.mint(msg.sender);
        gotNft[msg.sender] = true;
    }

    function getDeployedCampaigns() external view returns(Crowdfunding[] memory) {
        return deployedCampaigns;
    }

}
