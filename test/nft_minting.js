const NftContract = artifacts.require("NftContract");
let {utils}=require('ethers')
require('chai')
    .use(require('chai-as-promised'))
    .should()

contract("NftContract", function (accounts) {
  it("should assert true", async function () {
    let nftContract=await NftContract.deployed();
    let res = await nftContract.mint(1,1,{ from: accounts[0],value:utils.parseEther('0.05') });
    console.log(res)
  });
});
