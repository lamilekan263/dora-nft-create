function appendCat(dna, id, gen){
  catBox(id, gen, dna, false);
  styleCat(formatDna(dna), id);
}

function appendCatMarket(dna, id, gen, isSeller, price){
  catBox(id, gen, dna, true, isSeller, price);
  styleCat(formatDna(dna), id);
}

function formatDna(dnaStr){
  let formattedDna = {
    "bodycolor": parseInt(dnaStr.substring(0,2)),
    "fistcolor": parseInt(dnaStr.substring(2,4)),
    "pocketcolor": parseInt(dnaStr.substring(4,6)),
    "ribboncolor": parseInt(dnaStr.substring(6,8)),

    "eyeshape": parseInt(dnaStr.substring(8,9)),
    "mouthshape": parseInt(dnaStr.substring(9,10)),
    "earshape": parseInt(dnaStr.substring(10,11)),
    "earcolor": parseInt(dnaStr.substring(11,13)),
    "animation": parseInt(dnaStr.substring(13,14)),
    "lastnum": parseInt(dnaStr.substring(14,15))
  }
  return formattedDna;
}

function catBox(id, gen, dna, isMarket, isSeller, price){
  let catDiv = 
    `<div class="col-lg-4 pointer fit-content catBox flipcard" id="${id}" onClick="boxClick(this.id)">
      <div class="featureBox catDiv">
        ${catBody()} 
        ${cattributes(gen, dna, id)}
      </div>
      ${isMarket ? catOffer(isSeller, price, id) : ""}
    </div>
    `
  $('#catsDiv').append(catDiv);
  if(isMarket){
    $(".catBox").css("margin-bottom", "30px");
  }
}

function catOffer(isSeller, price, id){
  let buttonDiv;
  price = price.toString().substring(0, 7);
  if(isSeller){
    buttonDiv = `<button type="button" class="btn btn-danger cancel" id="${id}" onClick="cancelClick(this.id)">Cancel</button>`
  }else{
    buttonDiv = `<button type="button" class="btn btn-success buy" id="${id}" onClick="buyClick(this.id)">Purchase</button>`
  }

  let offerDiv = `
    <div class="offerBox">
      <div class="tag"><h5>Price: ${price} ETH</h5></div>
      <div class="buttons">${buttonDiv}</div>
    </div>
  `
  return offerDiv;
}

function catBody(){
  let catbody = 
    `<div class="cat flipcard_front">
      <div class="cat__ears" >
        <div class="cat__ear left" >
          <div class="cat__ear_inside left" ></div>
        </div>
        <div class="cat__ear right" >
          <div class="cat__ear_inside right" ></div>
        </div>
      </div>

      <div class="cat__head" >

        <div class="cat__eyes" >
          <div class="cat__eye left" >
            <div class="cat__pupil left" ><div class="cat__inner_pupil left" ></div></div>
          </div>
          <div class="cat__eye right" >
            <div class="cat__pupil right" ><div class="cat__inner_pupil right" ></div></div>
          </div>
        </div>

        <div class="cat__mouth_contour">
          <div class="cat__mouth_round left"></div>
          <div class="cat__mouth_round right"></div>
        </div>
        <div class="cat__nose">
          <div class="cat__inner_nose"></div>
        </div>

        <div class="cat__mouth" >
          <div class="cat__tongue" ></div>
        </div>

        <div class="cat__whiskers">
          <div class="cat__whisker left top"></div>
          <div class="cat__whisker left middle"></div>
          <div class="cat__whisker left bottom"></div>
          <div class="cat__whisker right top"></div>
          <div class="cat__whisker right middle"></div>
          <div class="cat__whisker right bottom"></div>
        </div>

        <div class="cat__face_lines" >
          <div class="cat__line_nose_to_mouth" ></div>
          <div class="cat__face_line left" ></div>
          <div class="cat__face_line right" ></div>
        </div>
      </div>

      <div class="cat__decoration">
        <div class="cat__ribbon" ></div>
        <div class="cat__bell" >
          <div class="cat__bell_dot"></div>
          <div class="cat__bell_vertical_line"></div>
          <div class="cat__bell__horizontal_line_top"></div>
          <div class="cat__bell__horizontal_line_bottom"></div>
        </div>
        <div class="cat__pocket" ></div>
      </div>

      <div class="cat__body">
        <div class="cat__chest" ></div>
        <div class="cat__inner_chest"></div>
      </div>

      <div class="cat__arms">
        <div class="cat__arm left" >
          <div class="cat__hand left" ></div>
        </div>
        <div class="cat__arm right">
          <div class="cat__hand right"></div>
        </div>
      </div>

      <div class="cat__feet">
        <div class="cat__feet_seperator"></div>
        <div class="cat__foot left"></div>
        <div class="cat__foot right"></div>
      </div>
    </div>`

  return catbody;
}

function cattributes(gen, dna, id) {
  let Cattributes = 
    `
    <div class="catInfo flipcard_back">
      <br>
      <h2>Doraemon Info</h2>
        <span><h4><b>　GEN: </b>${gen}</h4></span>
        <span><h4><b>　DNA: </b>${dna}</h4></span> 
        <span><h4><b>　ID : </b>${id}</h4></span> 
      <br>
      <h2>Cattributes</h2>
      <ul class="ml-5 cattributes>
        <li><span id=""></span></li>
        <li><span id="earName"></span> ears</li>
        <li><span id="eyeName"></span> eyes</li>
        <li><span id="mouthName"></span> </li>
        <li><span id="animationName"></span> </li>
      </ul>
    </div>
    `
  return Cattributes
}

function styleCat(dna, id){
  changeBodyColor(colors[dna.bodycolor],dna.bodycolor, id)
  changeFistColor(colors[dna.fistcolor],dna.fistcolor, id)
  changePocketColor(colors[dna.pocketcolor],dna.pocketcolor, id)
  changeRibbonColor(colors[dna.ribboncolor],dna.ribboncolor, id)
  changeEyeShape(dna.eyeshape, id)
  changeMouthShape(dna.mouthshape, id)
  changeEarShape(dna.earshape, id)
  changeEarColor(colors[dna.earcolor],dna.earcolor, id)
  changeAnimation(dna.animation, id)
}