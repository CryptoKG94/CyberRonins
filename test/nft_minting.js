const NftContract = artifacts.require("NftContract");
const { assert } = require('console');
let {utils}=require('ethers')
let {EVM_REVERT,SECONDS_IN_DAY,advanceTimeAndBlock}=require('./utils') 
require('chai')
    .use(require('chai-as-promised'))
    .should()

contract("NftContract",  function (accounts) {
  
  it("should revert mint value", async function () {
    let nftContract=await NftContract.deployed();
    await nftContract.mint(1,1,{ from: accounts[1],value:await nftContract.getTokenPrice() }).should.be.rejectedWith(EVM_REVERT+"The address isn't authorized -- Reason given: The address isn't authorized.");
  });
  it("should mint token when user is added", async function () {
    let nftContract=await NftContract.deployed();
    let res = await nftContract.addPrivateSaleBuyer(accounts[1],{ from: accounts[0]});
    await nftContract.mint(1,1,{ from: accounts[1],value:await nftContract.getTokenPrice() });
  });
  it("should not mint excess tokens", async function () {
    let nftContract=await NftContract.deployed();
    let res = await nftContract.addPrivateSaleBuyer(accounts[1],{ from: accounts[0]});
    await nftContract.mint(1,1,{ from: accounts[1],value:await nftContract.getTokenPrice() }).should.be.rejectedWith(EVM_REVERT+"Number of tokens minted exceed maximum set for private sale");
  });

  it("should get private mint price within 24hrs", async function () {
    let nftContract=await NftContract.deployed();
    let privateMintPrice=await nftContract.getTokenPrice();
    console.log(privateMintPrice)
    console.log(utils.formatEther(privateMintPrice))
  });

  it("should get public mint price past 24hrs", async function () {
    advanceTimeAndBlock(SECONDS_IN_DAY * 1.01);
    let nftContract=await NftContract.deployed();
    let publicMintPrice=await nftContract.getTokenPrice();
    console.log(publicMintPrice)
    console.log(utils.formatEther(publicMintPrice))
  });
});
