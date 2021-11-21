const Migrations = artifacts.require("Doracontract");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
