// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
contract NftContract is ERC1155Supply,Ownable {
  using SafeMath for uint;

  mapping(uint256 => uint256) private mintPrices;
  mapping(uint256 => uint256) private maxMints;
  mapping(uint256 => uint256) private MAX_TOKENS;
  
  mapping(uint256 => bool) private mintPaused;
  mapping(uint256 => bool) private mintingEndedForever;
  constructor() ERC1155("nftUri{id}") {
        MAX_TOKENS[1] = 600;
        MAX_TOKENS[2] = 300;
        MAX_TOKENS[3] = 200;
        MAX_TOKENS[4] = 100;

        maxMints[1] = 1;
        maxMints[2] = 1;
        maxMints[3] = 1;
        maxMints[4] = 1;

        mintPrices[1] = 1.5 ether;
        mintPrices[2] = 3 ether;
        mintPrices[3] = 4.5 ether;
        mintPrices[4] = 8 ether;
  }

  function mint(uint256 id,uint256 numberOfTokens) public payable {
        require(!mintPaused[id], "Token Minting is currently paused");
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
}
