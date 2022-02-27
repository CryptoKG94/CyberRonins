// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
contract NftContract is ERC1155Supply,Ownable {
  using SafeMath for uint;
  
  bool private mintPaused;

  mapping(address=>bool) private privateSaleUserWhitelist;
  mapping(address=>uint256) private privateSaleUserMints;
  uint256 public privateSalePrice;
  uint256 public publicSalePrice;
  uint256 public deployTime;
  uint256 public maxTokensPerMintPublicSale;
  uint256 public maxTokensPerMintPrivateSale;
  uint256 public maxTokensPerUserPrivateSale;


  constructor() ERC1155("https://gateway.pinata.cloud/ipfs/QmREgzdidGN5JXyV3zPb7DoXhp5t4DDh7ooiMbWifSsnmh/{id}.json") {
        privateSalePrice=0.1 ether;
        publicSalePrice=0 ether;
        deployTime=block.timestamp;
        maxTokensPerMintPublicSale=1;
        maxTokensPerMintPrivateSale=1;
        maxTokensPerUserPrivateSale=1;
  }

  function setMaxTokensPerUserPrivateSale(uint256 _maxTokensPerUserPrivateSale) external onlyOwner{
      maxTokensPerUserPrivateSale=_maxTokensPerUserPrivateSale;
  }
  function setMaxTokensPerMintPublicSale(uint256 _maxTokensPerMintPublicSale) external onlyOwner{
      maxTokensPerMintPublicSale=_maxTokensPerMintPublicSale;
  }
  function setMaxTokensPerMintPrivateSale(uint256 _maxTokensPerMintPrivateSale) external onlyOwner{
      maxTokensPerMintPrivateSale=_maxTokensPerMintPrivateSale;
  }
  function setPrivateSalePrice(uint256 _privateSalePrice) external onlyOwner{
      privateSalePrice=_privateSalePrice;
  }
  function setPublicSalePrice(uint256 _publicSalePrice) external onlyOwner{
      publicSalePrice=_publicSalePrice;
  }

  function getTokenPrice() public view returns(uint256){
      if(deployTime.add(1 days)>=block.timestamp){
        return privateSalePrice;
      }else{
        return publicSalePrice;
      }
  }


  function mint(uint256 id,uint256 numberOfTokens) public payable {
        require(mintPaused==false, "Token Minting is currently paused");
        require(numberOfTokens != 0, "You need to mint at least 1 token");
        uint256 salePrice;
        //Private Sale
        if(deployTime.add(1 days)>=block.timestamp){
            salePrice=privateSalePrice;
            require(privateSaleUserWhitelist[msg.sender],"The address isn't authorized");
            require(privateSaleUserMints[msg.sender].add(numberOfTokens)<=maxTokensPerUserPrivateSale,"Number of tokens minted exceed maximum set for private sale");
            require(numberOfTokens<=maxTokensPerMintPrivateSale,"Number of tokens minted exceed maximum set for private sale per mint");
            privateSaleUserMints[msg.sender]++;
        }else{
            salePrice=publicSalePrice;
            require(numberOfTokens<=maxTokensPerMintPublicSale,"Number of tokens minted exceed maximum set for public sale per mint");
        }
        require(salePrice.mul(numberOfTokens) <= msg.value, "Not enough Ether sent.");

        _mint(msg.sender, id,numberOfTokens,"");
    }


    function addPrivateSaleBuyer(address user)external onlyOwner{
        privateSaleUserWhitelist[user]=true;
    }

    function togglePauseMinting() external onlyOwner {
        mintPaused = !mintPaused;
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function uri(uint256 id) override public pure returns(string memory){
        return string(
            abi.encodePacked(
                "https://gateway.pinata.cloud/ipfs/QmREgzdidGN5JXyV3zPb7DoXhp5t4DDh7ooiMbWifSsnmh/",
                Strings.toString(id),
                ".json"
            )
        );
    }
}
