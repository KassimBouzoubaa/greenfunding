// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * @title NFTContributor
 * @dev Contrat de gestion des NFT (jetons non fongibles) pour les contributeurs de GreenFunding.
 */
contract NFTContributor is ERC721, Ownable {
    using Strings for uint256;

    string public baseURI; // ipfs://CID/
    uint public totalNfts;

    mapping(address => bool) public minted;

    event Minted(address owner, uint tokendId);

    /**
     * @dev Déploie le contrat avec un URI de base spécifique.
     * @param _baseURI L'URI de base utilisé pour construire les URI des tokens.
     */
    constructor(
        string memory _baseURI
    ) Ownable(msg.sender) ERC721("GREENFUNDING", "GFD") {
        baseURI = _baseURI;
    }

    /**
     * @dev Permet à un utilisateur de mint un NFT.
     * @param _adr L'adresse de l'utilisateur recevant le NFT minté.
     */
    function mint(address _adr) external {
        _mint(_adr, totalNfts);
        minted[_adr] = true;
        emit Minted(_adr, totalNfts);
        totalNfts++;
    }

    /**
     * @dev Permet à l'owner de mettre à jour l'URI de base des tokens.
     * @param _newBaseURI Le nouvel URI de base utilisé pour construire les URI des tokens.
     */
    function setBaseURI(string calldata _newBaseURI) external onlyOwner {
        baseURI = _newBaseURI;
    }

    /**
     * @dev Renvoie l'URI de base utilisé pour construire les URI des tokens.
     * @return L'URI de base des tokens.
     */
    function tokenURI() public view returns (string memory) {
        return baseURI;
    }
}
