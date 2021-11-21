const DoraContract = artifacts.require("Doracontract");
const DoraMarketplace = artifacts.require("DoraMarketplace");

module.exports = function (deployer) {
  deployer.deploy(DoraMarketplace, DoraContract.address);
};
