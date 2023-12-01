// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTContributor is ERC721, Ownable {
    using Strings for uint256;

    string public baseURI; // ipfs://CID/
    uint public totalNfts;
    address public crowdfundingFactory;

    mapping(address => bool) public minted;

    event Minted(address owner, uint tokendId);

    constructor(
        string memory _baseURI
    ) Ownable(msg.sender) ERC721("GREENFUNDING", "GFD") {
        baseURI = _baseURI;
    }

    modifier onlyCrowdfundingFactory() {
        require(
            msg.sender == crowdfundingFactory,
            "Only crowdfundingFactory can call this function"
        );
        _;
    }

    function mint(address _adr) external onlyCrowdfundingFactory {
        _mint(_adr, totalNfts);
        minted[_adr] = true;
        emit Minted(_adr, totalNfts);
        totalNfts++;
    }

    function setBaseURI(string calldata _newBaseURI) external onlyOwner {
        baseURI = _newBaseURI;
    }

    function tokenURI() public view returns (string memory) {
        return baseURI;
    }

    function setCrowdFundingFactory(address _contract) external onlyOwner {
        require(
            crowdfundingFactory == address(0),
            "crowdfundingFactory address is already set"
        );
        crowdfundingFactory = _contract;
    }
}
