# Solidity API

## Crowdfunding

_Contract to manage individual crowdfunding campaigns._

### Campaign

```solidity
struct Campaign {
  uint256 id;
  uint256 goal;
  uint256 raisedAmount;
  uint256 completeAt;
  uint256 endTime;
  uint256 minimumContribution;
  address owner;
  string projectTitle;
  string projectDes;
  enum Crowdfunding.State state;
}
```

### State

```solidity
enum State {
  Fundraising,
  Expired,
  Successful
}
```

### campaign

```solidity
struct Crowdfunding.Campaign campaign
```

### crowdFundingFactory

```solidity
contract CrowdfundingFactory crowdFundingFactory
```

### contributions

```solidity
mapping(address => uint256) contributions
```

### ContributionMade

```solidity
event ContributionMade(address contributor, uint256 amount, uint256 date)
```

### GoalReached

```solidity
event GoalReached(uint256 totalAmount)
```

### CampaignExpired

```solidity
event CampaignExpired()
```

### WithdrawContributor

```solidity
event WithdrawContributor(address contributor, uint256 amount)
```

### WithdrawFunds

```solidity
event WithdrawFunds(address owner, uint256 amount)
```

### onlyOwner

```solidity
modifier onlyOwner()
```

_Modifier to ensure that only the campaign owner can execute certain functions._

### validateExpiry

```solidity
modifier validateExpiry(enum Crowdfunding.State _state)
```

_Modifier to validate the campaign's state._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _state | enum Crowdfunding.State | Expected state of the campaign. |

### constructor

```solidity
constructor(uint256 _id, uint256 _goal, uint256 durationDays, uint256 _minimumContribution, address creator, string _projectTitle, string _projectDes, address _factoryAddress) public
```

_Constructor to initialize the crowdfunding campaign._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _id | uint256 | Identifier for the campaign. |
| _goal | uint256 | Funding goal for the campaign. |
| durationDays | uint256 | Duration of the campaign in days. |
| _minimumContribution | uint256 | Minimum contribution required for the campaign. |
| creator | address | Address of the campaign owner. |
| _projectTitle | string | Title of the project. |
| _projectDes | string | Description of the project. |
| _factoryAddress | address | Address of the CrowdfundingFactory contract. |

### contribute

```solidity
function contribute() external payable
```

_Function for contributors to make contributions to the campaign._

### checkFundingCompleteOrExpire

```solidity
function checkFundingCompleteOrExpire() public returns (enum Crowdfunding.State)
```

_Function to check if the campaign has reached its funding goal or expired._

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | enum Crowdfunding.State | Current state of the campaign. |

### withdrawContributor

```solidity
function withdrawContributor() external
```

_Function for contributors to withdraw their contributions when the campaign expires._

### withdrawFunds

```solidity
function withdrawFunds() external
```

_Function for the campaign owner to withdraw the raised funds when the campaign is successful._

## CrowdfundingFactory

_Contract to manage the creation of Crowdfunding campaigns and NFT minting based on contributions._

### deployedCampaigns

```solidity
contract Crowdfunding[] deployedCampaigns
```

### nftContract

```solidity
contract NFTContributor nftContract
```

### gotNft

```solidity
mapping(address => bool) gotNft
```

### contributedStatus

```solidity
mapping(address => bool) contributedStatus
```

### contributedToContract

```solidity
mapping(address => mapping(address => bool)) contributedToContract
```

### CampaignCreated

```solidity
event CampaignCreated(uint256 goal, uint256 durationDays, uint256 minimumContribution, address owner, string projectTitle, string projectDes)
```

### constructor

```solidity
constructor(address _NFTContributor) public
```

_Initializes the CrowdfundingFactory with the NFTContributor contract address._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _NFTContributor | address | Address of the NFTContributor contract. |

### setContributedStatus

```solidity
function setContributedStatus(address _sender) internal
```

### hasContributed

```solidity
function hasContributed(address _sender, address _contract) external
```

_Marks a contributor's status for a specific contract._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _sender | address | Address of the contributor. |
| _contract | address | Address of the contract. |

### createCampaign

```solidity
function createCampaign(uint256 goal, uint256 durationDays, uint256 minimumContribution, string projectTitle, string projectDes) external
```

_Creates a new Crowdfunding campaign._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| goal | uint256 | Funding goal for the campaign. |
| durationDays | uint256 | Duration of the campaign in days. |
| minimumContribution | uint256 | Minimum contribution required for the campaign. |
| projectTitle | string | Title of the project. |
| projectDes | string | Description of the project. |

### mintNft

```solidity
function mintNft() external
```

_Allows contributors to mint an NFT based on their contribution._

### getDeployedCampaigns

```solidity
function getDeployedCampaigns() external view returns (contract Crowdfunding[])
```

_Retrieves the list of deployed Crowdfunding campaigns._

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract Crowdfunding[] | Array of deployed Crowdfunding contracts. |

## NFTContributor

_Contrat de gestion des NFT (jetons non fongibles) pour les contributeurs de GreenFunding._

### baseURI

```solidity
string baseURI
```

### totalNfts

```solidity
uint256 totalNfts
```

### minted

```solidity
mapping(address => bool) minted
```

### Minted

```solidity
event Minted(address owner, uint256 tokendId)
```

### constructor

```solidity
constructor(string _baseURI) public
```

_Déploie le contrat avec un URI de base spécifique._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _baseURI | string | L'URI de base utilisé pour construire les URI des tokens. |

### mint

```solidity
function mint(address _adr) external
```

_Permet à un utilisateur de mint un NFT._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _adr | address | L'adresse de l'utilisateur recevant le NFT minté. |

### setBaseURI

```solidity
function setBaseURI(string _newBaseURI) external
```

_Permet à l'owner de mettre à jour l'URI de base des tokens._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _newBaseURI | string | Le nouvel URI de base utilisé pour construire les URI des tokens. |

### tokenURI

```solidity
function tokenURI() public view returns (string)
```

_Renvoie l'URI de base utilisé pour construire les URI des tokens._

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | string | L'URI de base des tokens. |

