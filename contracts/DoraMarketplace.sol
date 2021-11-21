// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Doracontract.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./interface/IDoraMarketplace.sol";

contract DoraMarketplace is Ownable, IDoraMarketPlace {
  Doracontract private _DoraContract;

  struct Offer {
    address seller;
    uint256 price;
    uint256 index;
    uint256 tokenId;
    bool active;
  }   

  Offer[] private offers;
  mapping(uint256 => Offer) private tokenIdToOffer;

  constructor(address _doraContractAddress) {
    setDoraContract(_doraContractAddress);
  }

  function setDoraContract(address _doraContractAddress) public override onlyOwner {
    _DoraContract = Doracontract(_doraContractAddress);
  }

  function getContractAddress() external view returns(address){
    return address(this);
  }
  
  function getOffer(uint256 _tokenId) external override view returns ( address seller, uint256 price, uint256 index, uint256 tokenId, bool active){
    Offer storage offer = tokenIdToOffer[_tokenId];
    require(offer.active == true, "Marketplace: There is no active offer for this token");
    return (
      seller = offer.seller,
      price = offer.price,
      index = offer.index,
      tokenId = offer.tokenId,
      active = offer.active
    );
  }

  function getAllTokenOnSale() external override view returns(uint256[] memory){
    uint256 numOfOffers = offers.length;
    uint256[] memory listOfOffers = new uint256[](numOfOffers);
    for(uint i = 0; i < numOfOffers; i++){
      listOfOffers[i] = offers[i].tokenId;
    }
    return listOfOffers;
  }

  function setOffer(uint256 _price, uint256 _tokenId) external override {
    require(msg.sender == _DoraContract.ownerOf(_tokenId), "Marketplace: You are not the owner of this token");
    require(tokenIdToOffer[_tokenId].active == false, "Marketplace: The token is already on sale");
    require(_DoraContract.isApprovedForAll(msg.sender, address(this)), "Marketplace: Contract needs to approved to transfer Doraemon in the future");
    _setOffer(_price, _tokenId, msg.sender);
  }

  function removeOffer(uint256 _tokenId) external override {
    require(msg.sender == tokenIdToOffer[_tokenId].seller, "Marketplace: Only the seller of this token can remove offer");
    require(tokenIdToOffer[_tokenId].active == true, "Marketplace: The token is already not on sale");
    _removeOffer(_tokenId, msg.sender);
  }

  function buyDoraemon(uint256 _tokenId) external override payable {
    Offer memory targetToken = tokenIdToOffer[_tokenId];
    require(targetToken.price == msg.value, "Marketplace: Incorrect fund" );
    require(targetToken.seller != msg.sender, "Marketplace: Cannot by your own token!");
    require(targetToken.active == true, "Marketplace: The token is not for sell");
    _buyDoraemon(_tokenId, msg.sender);
  }

  function _setOffer(uint256 _price, uint256 _tokenId, address _seller) internal {
    Offer memory newOffer = Offer({
      seller: _seller,
      price: _price,
      index: offers.length,
      tokenId: _tokenId,
      active: true
    });
    offers.push(newOffer);
    tokenIdToOffer[_tokenId] = newOffer;
    emit MarketTransaction("Create offer", _seller, _tokenId);
  }

  function _removeOffer(uint256 _tokenId, address _seller) internal {
    uint256 targetIndex = tokenIdToOffer[_tokenId].index;
    uint256 lastIndex = offers.length - 1;
    if(lastIndex > 0){
      offers[targetIndex] = offers[lastIndex];
      offers[targetIndex].index = targetIndex;
      tokenIdToOffer[offers[targetIndex].tokenId] = offers[targetIndex];
    }
    offers.pop();
    delete tokenIdToOffer[_tokenId];
    emit MarketTransaction("Remove offer", _seller, _tokenId);
  }

  function _buyDoraemon(uint256 _tokenId, address _buyer) internal {
    Offer memory targetToken = tokenIdToOffer[_tokenId];
    address seller = targetToken.seller;
    uint256 price = targetToken.price;
    (bool success, ) = payable(seller).call{value: price}("");
    require(success, "Marketplace: Failed to send funds to the seller");
    _DoraContract.transferFrom(seller, _buyer, _tokenId);
    _removeOffer(_tokenId, seller);
    emit MarketTransaction("Buy", _buyer, _tokenId);
  }
}