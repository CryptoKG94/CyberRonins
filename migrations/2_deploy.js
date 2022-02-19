const NftContract = artifacts.require("NftContract");

module.exports = function (deployer) {
  deployer.deploy(NftContract);
};

