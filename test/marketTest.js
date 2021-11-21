const DoraContract = artifacts.require("DoraContract");
const DoraMarketplace = artifacts.require("DoraMarketPlace");
const { assert } = require("chai");
const truffleAssert = require("truffle-assertions");

contract("Test", (accounts) => {
  let contract;
  let market;
  var DoraContractAddress;
  var DoraMarketplaceAddress;

  before(async () => {
    contract = await DoraContract.deployed();
    market = await DoraMarketplace.deployed();
    DoraContractAddress    = await contract.getContractAddress({from: accounts[0]});
    DoraMarketplaceAddress = await market.getContractAddress({from: accounts[0]});

    // await market.setDoraContract(DoraContractAddress, {from: accounts[0]});
    await contract.createDoraemonGen0(1234);
    await contract.createDoraemonGen0(4321);
    await contract.setApprovalForAll(DoraMarketplaceAddress, true);
  });

  it("Set Offer check", async () => {
    

    let totalSupply = await contract.totalSupply();
    let tokenOwner = await contract.ownerOf(1);
    console.log(totalSupply);
    console.log(tokenOwner)
    console.log(DoraContractAddress);
    console.log(DoraMarketplaceAddress);

    await market.setOffer(1000, 1);
    await truffleAssert.reverts(
      market.removeOffer(0)
    );
    await truffleAssert.passes(
      market.removeOffer(1)
    );
  });

  it("Buy check", async () => {
    await market.setOffer(1000, 1);
    await truffleAssert.reverts(
      market.buyDoraemon(1, {from: accounts[0], value: 1000})
    );
    await truffleAssert.passes(
      market.buyDoraemon(1, {from: accounts[1], value: 1000})
    );
    let ac1 = await contract.balanceOf(accounts[1]);
    let ac0 = await contract.balanceOf(accounts[0]);
    console.log(ac1);
    console.log(ac0);
    assert.equal(ac1, 1);
    assert.equal(ac0, 1);
  });
});
