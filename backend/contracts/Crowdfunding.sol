// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./CrowdfundingFactory.sol";

/**
 * @title Crowdfunding
 * @dev Contract to manage individual crowdfunding campaigns.
 */
contract Crowdfunding {
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

    event ContributionMade(address contributor, uint amount, uint date);
    event GoalReached(uint totalAmount);
    event CampaignExpired();
    event WithdrawContributor(address contributor, uint amount);
    event WithdrawFunds(address owner, uint amount);

    /**
     * @dev Modifier to ensure that only the campaign owner can execute certain functions.
     */
    modifier onlyOwner() {
        require(
            msg.sender == campaign.owner,
            "Only the campaign owner can perform this action"
        );
        _;
    }

    /**
     * @dev Modifier to validate the campaign's state.
     * @param _state Expected state of the campaign.
     */
    modifier validateExpiry(State _state) {
        checkFundingCompleteOrExpire();
        require(campaign.state == _state, "Invalid state");
        _;
    }

    /**
     * @dev Constructor to initialize the crowdfunding campaign.
     * @param _id Identifier for the campaign.
     * @param _goal Funding goal for the campaign.
     * @param durationDays Duration of the campaign in days.
     * @param _minimumContribution Minimum contribution required for the campaign.
     * @param creator Address of the campaign owner.
     * @param _projectTitle Title of the project.
     * @param _projectDes Description of the project.
     * @param _factoryAddress Address of the CrowdfundingFactory contract.
     */
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
        campaign.goal = _goal;
        campaign.endTime = block.timestamp + durationDays * 1 days;
        campaign.minimumContribution = _minimumContribution;
        campaign.owner = creator;
        campaign.projectTitle = _projectTitle;
        campaign.projectDes = _projectDes;
        campaign.state = State.Fundraising;
        crowdFundingFactory = CrowdfundingFactory(_factoryAddress);
    }

    /**
     * @dev Function for contributors to make contributions to the campaign.
     */
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
        emit ContributionMade(msg.sender, msg.value, block.timestamp);
    }

    /**
     * @dev Function to check if the campaign has reached its funding goal or expired.
     * @return Current state of the campaign.
     */
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

    /**
     * @dev Function for contributors to withdraw their contributions when the campaign expires.
     */
    function withdrawContributor() external validateExpiry(State.Expired) {
        require(contributions[msg.sender] > 0, "You cannot withdraw 0");
        payable(msg.sender).transfer(contributions[msg.sender]);
        emit WithdrawContributor(msg.sender, contributions[msg.sender]);
        contributions[msg.sender] = 0;
    }

    /**
     * @dev Function for the campaign owner to withdraw the raised funds when the campaign is successful.
     */
    function withdrawFunds() external onlyOwner validateExpiry(State.Successful) {
        require(address(this).balance > 0, "You cannot withdraw 0");
        uint balance = address(this).balance;
        payable(msg.sender).transfer(address(this).balance);
        emit WithdrawFunds(msg.sender, balance);
    }
}
