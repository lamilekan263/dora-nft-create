// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interface/IERC721.sol";
import "./interface/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Doracontract is IERC721, Ownable {
  string constant _name = "CryptoDoraemon";
  string constant _symbol = "DORA";
  uint16 public constant CREATION_LIMIT_GEN0 = 10;

  bytes4 internal constant MAGIC_ERC721_RECEIVED = bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
  bytes4 private constant _INTERFACE_ID_ERC721 = 0x80ac58cd;
  bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7;

  event Birth(
    address owner, 
    uint256 doraemonId, 
    uint256 mumId, 
    uint256 dadId, 
    uint256 genes
  );

  struct Doraemon {
    uint256 genes;
    uint64 birthTime;
    uint32 mumId;
    uint32 dadId;
    uint16 generation;
  }

  //Array of all tokens (index => token) (index, token ID: position of allTokens array)
  Doraemon[] private allTokens;
  //Token ID to owner address
  mapping (uint256 => address) private tokenOwner;
  //Owner to list of owned token IDs (addr => index)
  mapping(address => uint256[]) private ownedTokens;
  //Token ID to index of the owner tokens list 
  mapping(uint256 => uint256) private ownedTokensIndex;
  //Give right to transfer (token ID => approved address)
  mapping (uint256 => address) private tokenIndexToApproved;
  //Give operator (myAddr => operatorAddr => true/false)
  mapping (address => mapping(address => bool)) private operatorApprovals;

  //Counts created gen 0 doraemons
  uint16 public gen0Counter; 

  constructor(){
    _createDoraemon(0, 0, 0, 0, address(0)); //to fill index 0 spot
  }

  function getContractAddress() external view returns(address){
    return address(this);
  }

  function supportsInterface(bytes4 _interfaceId) external pure returns (bool) {
    return (_interfaceId == _INTERFACE_ID_ERC165 || _interfaceId == _INTERFACE_ID_ERC721);
  }

  function createDoraemonGen0(uint256 _genes) public returns(uint256){
    require(gen0Counter < CREATION_LIMIT_GEN0, "Cannot create more gen 0 doraemon");
    gen0Counter++;

    return _createDoraemon(0, 0, 0, _genes, msg.sender);
  }

  function _createDoraemon(
    uint256 _mumId, 
    uint256 _dadId, 
    uint256 _generation, 
    uint256 _genes, 
    address _owner
  ) private returns(uint256) {
    Doraemon memory _doraemon = Doraemon({
      genes: _genes,
      birthTime: uint64(block.timestamp),
      mumId: uint32(_mumId),
      dadId: uint32(_dadId),
      generation: uint16(_generation)
    });
    allTokens.push(_doraemon);
    uint256 newDoraemonId = allTokens.length - 1; 

    emit Birth(_owner, newDoraemonId, _mumId, _dadId, _genes);
    _transfer(address(0), _owner, newDoraemonId);

    return newDoraemonId;
  } 

  function getDoraemon(uint256 _tokenId) external view returns(
    uint256 genes,
    uint64 birthTime,
    uint32 mumId,
    uint32 dadId,
    uint16 generation,
    address owner
  ){
    genes = allTokens[_tokenId].genes;
    birthTime = allTokens[_tokenId].birthTime;
    mumId = allTokens[_tokenId].mumId;
    dadId = allTokens[_tokenId].dadId;
    generation = allTokens[_tokenId].generation;
    owner = tokenOwner[_tokenId];
  }

  function tokensOfOwner(address _owner) external view returns(uint256[] memory){
    return ownedTokens[_owner];
  }

  function breed(uint256 _dadId, uint256 _mumId) public returns (uint256){
    require(_owns(msg.sender, _dadId) && _owns(msg.sender, _mumId), "You are not the owner of this token");
    Doraemon storage dad = allTokens[_dadId];
    Doraemon storage mum = allTokens[_mumId];
    uint256 newDna = _mixDna(dad.genes, mum.genes);
    uint256 newGen = (dad.generation + mum.generation) / 2 + 1;
    return _createDoraemon(_dadId, _mumId, newGen, newDna, msg.sender);
  }

  function balanceOf(address _owner) public view override returns(uint256){
    return ownedTokens[_owner].length;
  }

  function totalSupply() external view override returns(uint256){
    return allTokens.length;
  }

  function name() external pure override returns (string memory){
    return _name;
  } 

  function symbol() external pure override returns (string memory){
    return _symbol;
  } 

  function ownerOf(uint256 _tokenId) public view override returns(address){
    address owner = tokenOwner[_tokenId];
    require(owner != address(0), "ERC721: owner query for nonexistent token");
    return owner;
  }

  function approve(address _approved, uint256 _tokenId) external override{
    require(_owns(msg.sender, _tokenId), "ERC721: You are not the owner of this token");
    _approve(msg.sender, _approved, _tokenId);
  }

  function setApprovalForAll(address _operator, bool _approved) external override {
    require(_operator != msg.sender, "ERC721: You are the owner");
    operatorApprovals[msg.sender][_operator] = _approved;
    emit ApprovalForAll(msg.sender, _operator, _approved);
  }

  function getApproved(uint256 _tokenId) external view override returns(address){
    require(tokenOwner[_tokenId] != address(0), "ERC721: Invalid token ID");
    return tokenIndexToApproved[_tokenId];
  }

  function isApprovedForAll(address _owner, address _operator) public view override returns(bool){
    return operatorApprovals[_owner][_operator];
  }

  function safeTransferFrom(address _from, address _to, uint256 _tokenId) external override {
    require(_isApprovedOrOwner(msg.sender, _from, _to, _tokenId));
    _safeTransfer(_from, _to, _tokenId, "");
  }

  function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes calldata data) external override {
    require(_isApprovedOrOwner(msg.sender, _from, _to, _tokenId));
    _safeTransfer(_from, _to, _tokenId, data);
  }

  function _safeTransfer(address _from, address _to, uint256 _tokenId, bytes memory _data) internal {
    _transfer(_from, _to, _tokenId);
    require(_checkERC721Support(_from, _to, _tokenId, _data));
  }

  function transferFrom(address _from, address _to, uint256 _tokenId) external override {
    require(_isApprovedOrOwner(msg.sender, _from, _to, _tokenId), "ERC721: Is not approved or owner");
    _transfer(_from, _to, _tokenId);
  }

  function _transfer(address _from, address _to, uint256 _tokenId) internal{
    if(_from != address(0)){
      uint256 lastTokenIndex = balanceOf(_from) - 1;
      uint256 tokenIndex = ownedTokensIndex[_tokenId];
      if(tokenIndex != lastTokenIndex){
        uint256 lastTokenId = ownedTokens[_from][lastTokenIndex];
        ownedTokens[_from][tokenIndex] = lastTokenId;
        ownedTokensIndex[lastTokenId] = tokenIndex;
      }
      ownedTokens[_from].pop();
      delete tokenIndexToApproved[_tokenId];
    }
    ownedTokens[_to].push(_tokenId);
    ownedTokensIndex[_tokenId] = ownedTokens[_to].length - 1;
    tokenOwner[_tokenId] = _to; 
    emit Transfer(_from, _to, _tokenId);
  }

  function _owns(address _claimant, uint256 _tokenId) internal view returns(bool){
    return tokenOwner[_tokenId] == _claimant;
  }

  function _approve(address _owner, address _approved, uint256 _tokenId) internal {
    tokenIndexToApproved[_tokenId] = _approved;
    emit Approval(_owner, _approved, _tokenId);
  }

  function _approvedFor(address _claimant, uint256 _tokenId) internal view returns (bool) {
    return tokenIndexToApproved[_tokenId] == _claimant;
  }

  function _checkERC721Support(address _from, address _to, uint256 _tokenId, bytes memory _data) internal returns (bool) {
    if(!_isContract(_to)){
      return true;
    }

    bytes4 returnData = IERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data);
    return returnData == MAGIC_ERC721_RECEIVED;
  }

  function _isContract(address _to) view internal returns(bool){
    uint32 size; //code size
    assembly{
      size := extcodesize(_to)
    }
    return size > 0;
  }

  function _isApprovedOrOwner(address _spender, address _from, address _to, uint256 _tokenId) internal view returns(bool){
    require(tokenOwner[_tokenId] != address(0), "ERC721: Invalid token ID");
    require(_to != address(0), "ERC721: Invalid address");
    require(_owns(_from, _tokenId), "ERC721: The sender does not own this token");
    require(
      _spender == _from || isApprovedForAll(_from, _spender) || _approvedFor(_spender, _tokenId), 
      "ERC721: You don't have the permission to transfer token"
    );
    return true;
  }

  function _mixDna(uint256 _dadDna, uint256 _mumDna) internal view returns(uint256 newGene){
    uint256[] memory geneArray = new uint256[](10);
    uint8[10] memory digitControl = [100, 100, 100, 100, 10, 10, 10, 100, 10, 10]; 
    uint16 random = uint16(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % 65536);
    uint16 i;
    uint16 index = 10;
    for(i = 1; i <= 512; i = i * 2){
      index = index - 1;
      if(index == random % 10){
        geneArray[index] = (_mumDna % digitControl[index] + _dadDna % digitControl[index]) / 2;
      }else if(random & i != 0){
        geneArray[index] = _mumDna % digitControl[index];
      }else{
        geneArray[index] = _dadDna % digitControl[index];
      }
      _mumDna /= digitControl[index];
      _dadDna /= digitControl[index];
    }
    for(i = 0; i < 10; i++){
      newGene += geneArray[i];
      if(i != 9){
        newGene *= digitControl[i+1];
      }
    }
  }
}