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

  mapping(uint256 => uint256) private mintPrices;
  mapping(uint256 => uint256) private maxMints;
  mapping(uint256 => uint256) public MAX_TOKENS;
  
  mapping(uint256 => bool) private mintPaused;
  mapping(uint256 => bool) private mintingEndedForever;
  uint256 privateSalePrice=0.01 ether;
  constructor() ERC1155("https://gateway.pinata.cloud/ipfs/QmREgzdidGN5JXyV3zPb7DoXhp5t4DDh7ooiMbWifSsnmh/{id}.json") {
        MAX_TOKENS[0] = 6;
        MAX_TOKENS[1] = 6;
        MAX_TOKENS[2] = 6;
        MAX_TOKENS[3] = 6;
        MAX_TOKENS[4] = 6;

        maxMints[0] = 1;
        maxMints[1] = 1;
        maxMints[2] = 1;
        maxMints[3] = 1;
        maxMints[4] = 1;

        mintPrices[0] = 0.01 ether;
        mintPrices[1] = 0.02 ether;
        mintPrices[2] = 0.03 ether;
        mintPrices[3] = 0.04 ether;
        mintPrices[4] = 0.05 ether;
  }

  function mint(uint256 id,uint256 numberOfTokens) public payable {
        require(mintPaused[id]==false, "Token Minting is currently paused");
        require(mintingEndedForever[id] == false, "Token Sale ended");
        require(numberOfTokens != 0, "You need to mint at least 1 token");
        require(numberOfTokens <= maxMints[id], "Number of tokens minted exceeds maximum allowable");
        require(totalSupply(id).add(numberOfTokens) <= MAX_TOKENS[id], "Minting would exceed max. supply");
        require(mintPrices[id].mul(numberOfTokens) <= msg.value, "Not enough Ether sent.");

        _mint(msg.sender, id,numberOfTokens,"");
    }

    function endSaleForever(uint256 id) external onlyOwner {
        mintingEndedForever[id] = true;
    }

    function togglePauseMinting(uint256 id) external onlyOwner {
        mintPaused[id] = !mintPaused[id];
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
