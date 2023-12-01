// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./CrowdfundingFactory.sol";

contract Crowdfunding {
    // Structure pour stocker les détails de la campagne
    struct Campaign {
        uint id;
        uint goal;
        uint raisedAmount;
        uint completeAt;
        uint endTime;
        uint256 minimumContribution;
        address owner;
        string projectTitle;
        string projectDes;
        State state;
    }

    enum State {
        Fundraising,
        Expired,
        Successful
    }

    Campaign public campaign;
    CrowdfundingFactory public crowdFundingFactory;
    mapping(address => uint) public contributions;

    event ContributionMade(address contributor, uint amount);
    event GoalReached(uint totalAmount);
    event CampaignExpired();
    event WithdrawContributor(address contributor, uint amount);
    event WithdrawFunds(address owner, uint amount);

    modifier onlyOwner() {
        require(
            msg.sender == campaign.owner,
            "Only the campaign owner can perform this action"
        );
        _;
    }

    modifier validateExpiry(State _state) {
        checkFundingCompleteOrExpire();
        require(campaign.state == _state, "Invalid state");
        _;
    }

    constructor(
        uint _id,
        uint _goal,
        uint durationDays,
        uint _minimumContribution,
        address creator,
        string memory _projectTitle,
        string memory _projectDes,
        address _factoryAddress
    ) {
        campaign.id = _id;
        campaign.goal = _goal * 1 ether;
        campaign.endTime = block.timestamp + durationDays * 1 days;
        campaign.minimumContribution = _minimumContribution * 1 ether;
        campaign.owner = creator;
        campaign.projectTitle = _projectTitle;
        campaign.projectDes = _projectDes;
        campaign.state = State.Fundraising;
        crowdFundingFactory = CrowdfundingFactory(_factoryAddress);
    }

    function contribute() external payable validateExpiry(State.Fundraising) {
        require(
            block.timestamp < campaign.endTime,
            "Crowdfunding period has ended"
        );
        require(
            msg.value >= campaign.minimumContribution,
            "Contribution amount should be greater or equal than minimum contribution"
        );

        contributions[msg.sender] += msg.value;
        campaign.raisedAmount += msg.value;
        crowdFundingFactory.hasContributed(msg.sender, address(this));
        emit ContributionMade(msg.sender, msg.value);
    }

    function checkFundingCompleteOrExpire() public returns (State) {
        if (campaign.raisedAmount >= campaign.goal) {
            campaign.state = State.Successful;
            campaign.completeAt = block.timestamp;
            emit GoalReached(campaign.raisedAmount);
        } else if (block.timestamp > campaign.endTime) {
            campaign.state = State.Expired;
            campaign.completeAt = block.timestamp;
            emit CampaignExpired();
        }
        return campaign.state;
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function withdrawContributor() external validateExpiry(State.Expired) {
        require(contributions[msg.sender] > 0, "You cannot withdraw 0");
        payable(msg.sender).transfer(contributions[msg.sender]);
        emit WithdrawContributor(msg.sender, contributions[msg.sender]);
        contributions[msg.sender] = 0;
    }

    function withdrawFunds()
        external
        onlyOwner
        validateExpiry(State.Successful)
    {
        uint balance = address(this).balance;
        payable(msg.sender).transfer(address(this).balance);
        emit WithdrawFunds(msg.sender, balance);
    }
}
