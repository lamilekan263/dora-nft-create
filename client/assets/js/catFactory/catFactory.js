
var colors = Object.values(allColors())

var defaultDNA = {
  "bodycolor" : 11,
  "fistcolor" : 21,
  "pocketcolor" : 21,
  "ribboncolor" : 31,
  "eyeshape" : 7,
  "mouthshape" : 1,
  "earshape" : 1,
  "earcolor" : 21,
  "animation" : 1,
  "lastNum" : 1
}

$( document ).ready(function () {
  makeDefaultCat();
});

$(".btn.colors").click(()=>{
  $(".tab.colors").css('display', 'block');
  $(".tab.cattributes").css('display', 'none');
})

$(".btn.cattributes").click(()=>{
  $(".tab.colors").css('display', 'none');
  $(".tab.cattributes").css('display', 'block');
})

$(".btn.default").click(()=>{
  makeDefaultCat();
})

$(".btn.random").click(()=>{
  var randomDNA = {
    "bodycolor" : Math.floor(Math.random() * 89) + 10,
    "fistcolor" : Math.floor(Math.random() * 89) + 10,
    "pocketcolor" : Math.floor(Math.random() * 89) + 10,
    "ribboncolor" : Math.floor(Math.random() * 89) + 10,
    "eyeshape" : Math.floor(Math.random() * 7) + 1,
    "mouthshape" : Math.floor(Math.random() * 4) + 1,
    "earshape" : Math.floor(Math.random() * 6) + 1,
    "earcolor" : Math.floor(Math.random() * 89) + 10,
    "animation" : Math.floor(Math.random() * 4) + 1,
    "lastNum" : 1
  }
  $('#dnabody').html(randomDNA.bodycolor);
  $('#dnafist').html(randomDNA.fistcolor);
  $('#dnapocket').html(randomDNA.pocketcolor);
  $('#dnaribbon').html(randomDNA.ribboncolor);
  $('#dnaeyeshape').html(randomDNA.eyeshape);
  $('#dnamouthshape').html(randomDNA.mouthshape);
  $('#dnaearshape').html(randomDNA.earshape);
  $('#dnaearcolor').html(randomDNA.earcolor);
  $('#dnaanimation').html(randomDNA.animation);
  $('#dnaspecial').html(randomDNA.lastNum);
  renderCat(randomDNA)
})

$(".btn.create").click(()=>{
  createDoraemon(getDna());
});


function makeDefaultCat(){
  $('#dnabody').html(defaultDNA.bodycolor);
  $('#dnafist').html(defaultDNA.fistcolor);
  $('#dnapocket').html(defaultDNA.pocketcolor);
  $('#dnaribbon').html(defaultDNA.ribboncolor);
  $('#dnaeyeshape').html(defaultDNA.eyeshape);
  $('#dnamouthshape').html(defaultDNA.mouthshape);
  $('#dnaearshape').html(defaultDNA.earshape);
  $('#dnaearcolor').html(defaultDNA.earcolor);
  $('#dnaspecial').html(defaultDNA.lastNum);
  renderCat(defaultDNA)
}

function getDna(){
  var dna = ''
  dna += $('#dnabody').html()
  dna += $('#dnafist').html()
  dna += $('#dnapocket').html()
  dna += $('#dnaribbon').html()
  dna += $('#dnaeyeshape').html()
  dna += $('#dnamouthshape').html()
  dna += $('#dnaearshape').html()
  dna += $('#dnaearcolor').html()
  dna += $('#dnaanimation').html()
  dna += $('#dnaspecial').html()

  return parseInt(dna)
}

function renderCat(dna){
  changeBodyColor(colors[dna.bodycolor],dna.bodycolor, 0)
  $('#bodycolor').val(dna.bodycolor)

  changeFistColor(colors[dna.fistcolor],dna.fistcolor, 0)
  $('#fistcolor').val(dna.fistcolor)

  changePocketColor(colors[dna.pocketcolor],dna.pocketcolor, 0)
  $('#pocketcolor').val(dna.pocketcolor)

  changeRibbonColor(colors[dna.ribboncolor],dna.ribboncolor, 0)
  $('#ribboncolor').val(dna.ribboncolor)

  changeEyeShape(dna.eyeshape, 0)
  $('#eyeshape').val(dna.eyeshape)

  changeMouthShape(dna.mouthshape, 0)
  $('#mouthshape').val(dna.mouthshape)

  changeEarShape(dna.earshape, 0)
  $('#earshape').val(dna.earshape)

  changeEarColor(colors[dna.earcolor],dna.earcolor, 0)
  $('#earcolor').val(dna.earcolor)

  changeAnimation(dna.animation, 0)
  $('#animation').val(dna.animation)
}

$('#bodycolor').change(()=>{
  var colorVal = $('#bodycolor').val()
  changeBodyColor(colors[colorVal],colorVal, 0)
})

$('#fistcolor').change(()=>{
  var colorVal = $('#fistcolor').val()
  changeFistColor(colors[colorVal],colorVal, 0)
})

$('#pocketcolor').change(()=>{
  var colorVal = $('#pocketcolor').val()
  changePocketColor(colors[colorVal],colorVal, 0)
})

$('#ribboncolor').change(()=>{
  var colorVal = $('#ribboncolor').val()
  changeRibbonColor(colors[colorVal],colorVal, 0)
})

$('#eyeshape').change(()=>{
  var shapeVal = parseInt($('#eyeshape').val())
  changeEyeShape(shapeVal, 0)
})

$('#mouthshape').change(()=>{
  var shapeVal = parseInt($('#mouthshape').val())
  changeMouthShape(shapeVal, 0)
})

$('#earshape').change(()=>{
  var shapeVal = parseInt($('#earshape').val())
  changeEarShape(shapeVal, 0)
})

$('#earcolor').change(()=>{
  var colorVal = $('#earcolor').val()
  changeEarColor(colors[colorVal],colorVal, 0)
})

$('#animation').change(()=>{
  var animationVal = parseInt($('#animation').val())
  changeAnimation(animationVal, 0)
})
