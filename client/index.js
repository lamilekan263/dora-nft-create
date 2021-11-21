//initialize web3 library, connect to Ethereum blockchain
var web3 = new Web3(Web3.givenProvider);

//contract instance
var tokenInst;
var marketInst;
var user;
var approved = false;
var loggedIn = false;
var tokenAddress = "0xfBdeCBF84A82129d6aCa47897cd2f954E6327450";
var marketAddress = "0xEB00De93E010DD2c167cf2298131A843171EDe7A";

function start() {
  //ask user to interact with the dapp
  if(loggedIn){
    return true;
  }
  window.ethereum.enable().then((accounts) => {
    //get call back
    //after login
    loggedIn = true;
    //contract instance
    tokenInst = new web3.eth.Contract(tokenAbi, tokenAddress, {
      from: accounts[0],
    });
    marketInst = new web3.eth.Contract(marketAbi, marketAddress, {
      from: accounts[0],
    });
    //almost always accounts[0]
    user = accounts[0];
    console.log("login successful");
    menu();
    console.log(tokenInst);
    console.log(marketInst);
    location.reload();
  });
}
 
$(document).ready(() => {
  web3.eth.getAccounts((err, accounts) => {
    tokenInst = new web3.eth.Contract(tokenAbi, tokenAddress, {
      from: accounts[0],
    });
    marketInst = new web3.eth.Contract(marketAbi, marketAddress, {
      from: accounts[0],
    });
    if (accounts.length == 0) {
      loggedIn = false;
    } else {
      loggedIn = true;
    }
    user = accounts[0];
    menu();
    if(window.location.pathname == "/client/myCats.html"){
      showMenu();
    }
  });
});

//.send is required when state variables are modified
function createDoraemon(dnaStr) {
  console.log(dnaStr);
  tokenInst.methods.createDoraemonGen0(dnaStr).send({}, (error, txHash) => {
    if (error) {
      console.log(error);
    } else {
      console.log(txHash);
      tokenInst.once("Birth", (error, event) => {
        if (error) {
          alert("Error");
        } else {
          console.log(JSON.stringify(event, null, "    "));
          alert(`
            Successfully created Doraemon \n
            owner: ${event.returnValues.owner} \n
            genes: ${event.returnValues.genes} \n
            ID: ${event.returnValues.doraemonId} \n
            mumID: ${event.returnValues.mumId} \n
            dadID: ${event.returnValues.dadId} 
          `);
        }
      });
    }
  });
}

async function breedCats(parentId){
  await tokenInst.methods.breed(parentId[0], parentId[1]).send({}, async (error, txHash) => {
    if (error) {
      console.log(error);
    } else {
      console.log(txHash);
      await tokenInst.once("Birth", (error, event) => {
        if (error) {
          alert("Error");
        } else {
          console.log(JSON.stringify(event, null, "    "));
          appendDoraemon(event.returnValues.doraemonId);
        }
      });
    }
  }); 
}

async function myDoraemon(){
  let arrayId = await tokenInst.methods.tokensOfOwner(user).call();
  for(let i=0; i < arrayId.length; i++){
    appendDoraemon(arrayId[i]);
  }
}

async function marketDoraemon(){
  let arrayId = await marketInst.methods.getAllTokenOnSale().call();
  for(let i=0; i < arrayId.length; i++){
    appendDoraemonMarket(arrayId[i]);
  }
}

async function appendDoraemon(id){
  let doraemon = await tokenInst.methods.getDoraemon(id).call();
  appendCat(doraemon.genes, id, doraemon.generation);
}

async function appendDoraemonMarket(id){
  console.log(id);
  let doraemon = await tokenInst.methods.getDoraemon(id).call();
  let offer = await marketInst.methods.getOffer(id).call();
  let isSeller = offer.seller == user;
  let price = web3.utils.fromWei(offer.price, 'ether');
  appendCatMarket(doraemon.genes, id, doraemon.generation, isSeller, price);
}

async function approveCheck(){
  approved = await tokenInst.methods.isApprovedForAll(user, marketAddress).call();
  if(!approved){
    alert("In order to sell any token, you need to allow the market place to be the operator for your tokens. \nPlease accept the following transcation first.");
    tokenInst.methods.setApprovalForAll(marketAddress, true).send({}, (err, txHash) => {
      if(err){
        console.log(err);
      }else{
        console.log(txHash);
      }
    });
  }
}

async function sellCat(id, price){
  approveCheck();
  if(!approved){
    return false;
  }
  price = web3.utils.toWei(price, 'ether');
  console.log(price);
  marketInst.methods.setOffer(price, id).send({}, (err) => {
    if(err){
      console.log(err);
    }else{
      marketInst.once("MarketTransaction", (err, event) => {
        if(err){
          console.log(err);
        }else{
          console.log(JSON.stringify(event, null, "    "));
          alert(`
            Successfully listed in marketplace \n
            owner: ${event.returnValues.owner} \n
            ID: ${event.returnValues.tokenId} 
          `);
        }
      });
    }
  });
}

async function buyCat(id){
  let offer = await marketInst.methods.getOffer(id).call();
  marketInst.methods.buyDoraemon(id).send({value: offer.price}, (err) => {
    if(err){
      console.log(err);
    }else{
      marketInst.once("MarketTransaction", (err, event) => {
        if(err){
          console.log(err);
        }else{
          console.log(JSON.stringify(event, null, "    "));
          alert(`
            Successfully purchased Doraemon\n
            owner: ${event.returnValues.owner} \n
            ID: ${event.returnValues.tokenId} 
          `);
          location.reload();
        }
      });
    }
  });
}

async function cancelOrder(id){
  marketInst.methods.removeOffer(id).send({}, (err) => {
    if(err){
      console.log(err);
    }else{
      marketInst.once("MarketTransaction", (err, event) => {
        if(err){
          console.log(err);
        }else{
          console.log(JSON.stringify(event, null, "    "));
          alert(`
            Successfully removed from marketplace \n
            owner: ${event.returnValues.owner} \n
            ID: ${event.returnValues.tokenId} 
          `);
          location.reload();
        }
      });
    }
  });
}

