let choosing = false;
let selectedCats = [];
let maxCat = 0;

function showMenu(){
  if(loggedIn){
    $(".buttons.menu").css("display", "block");
  }else{
    $(".buttons.menu").css("display", "none");
  }
}

function showBreedMenu(){
  $(".breed-menu").css("display", "block");
  $(".buttons.menu").css("display", "none");
  choosing = true;
  selectedCats = [0, 0];
  maxCat = 2;
}

function showSellMenu(){
  $(".sell-menu").css("display", "block");
  $(".buttons.menu").css("display", "none");
  approveCheck();
  choosing = true;
  selectedCats = [0];
  maxCat = 1;
}

function gotoCatalogue(){
  window.location.href = "catalogue.html";
}

function boxClick(clickedId){
  clickedId = parseInt(clickedId);
  if(choosing){
    selectedCats.push(clickedId);
    if(selectedCats.length > maxCat){
      $(`#${selectedCats[0]}`).find(".featureBox").css("border", "1px solid #009DE4");
      selectedCats.shift();
    }
    $(`#${clickedId}`).find(".featureBox").css("border", "5px solid #DC3545");
  }
}

$(".btn.cancel").click(()=>{
  resetMyCatsPage();
});

$(".breed-menu .btn.confirm").click(async ()=>{
  console.log(selectedCats);
  if(selectedCats[0] == 0 || selectedCats[1] == 0 || selectedCats[0] == selectedCats[1]){
    return false;
  }
  await breedCats(selectedCats);
  resetMyCatsPage();
});

$(".sell-menu .btn.confirm").click(()=>{
  let price = $("#catPrice").val();
  if(selectedCats[0] == 0 || price == 0){
    return false;
  }
  sellCat(selectedCats[0], price);
  resetMyCatsPage();
});


function resetMyCatsPage(){
  choosing = false;
  $(".featureBox").css("border", "1px solid #009DE4");
  selectedCats = [0, 0];
  $(".breed-menu").css("display", "none");
  $(".sell-menu").css("display", "none");
  $(".buttons.menu").css("display", "block");
}