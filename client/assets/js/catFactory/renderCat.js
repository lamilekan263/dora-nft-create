// Functions to change colors and cattributes

function changeBodyColor(color, code, id) {
  $(`#${id}`).find('.cat__head, .cat__ear, .cat__chest, .cat__arm').css('background', '#' + color)  //Change cat
  $('#bodycode').html('code: ' + code) //Update code badge text
  $('#dnabody').html(code) //Update DNA number
}

function changeFistColor(color, code, id) {
  $(`#${id}`).find('.cat__hand, .cat__foot').css('background', '#' + color)
  $('#fistcode').html('code: ' + code)
  $('#dnafist').html(code)
}

function changePocketColor(color, code, id) {
  $(`#${id}`).find('.cat__pocket').css('background', '#' + color)
  $('#pocketcode').html('code: ' + code)
  $('#dnapocket').html(code)
}

function changeRibbonColor(color, code, id) {
  $(`#${id}`).find('.cat__ribbon').css('background', '#' + color)
  $('#ribboncode').html('code: ' + code)
  $('#dnaribbon').html(code)
}

function changeEyeShape(num, id) {
  $('#dnaeyeshape').html(num)
  switch (num) {
    case 1:
      eyeType1(id)
      $(`#${id}`).find('#eyeName').html('Basic')
      break
    case 2:
      eyeType2(id)
      $(`#${id}`).find('#eyeName').html('Down')
      break
    case 3:
      eyeType3(id)
      $(`#${id}`).find('#eyeName').html('Up')
      break
    case 4:
      eyeType4(id)
      $(`#${id}`).find('#eyeName').html('Close')
      break
    case 5:
      eyeType5(id)
      $(`#${id}`).find('#eyeName').html('Wink')
      break
    case 6:
      eyeType6(id)
      $(`#${id}`).find('#eyeName').html('Confused')
      break
    case 7:
      eyeType7(id)
      $(`#${id}`).find('#eyeName').html('Tilted')
      break
  }
}

function eyeType1(id) {
  $(`#${id}`).find('.cat__eye.left').css('transform', 'scale(1,-1) rotate(0deg)');
  $(`#${id}`).find('.cat__eye.left').css('left', '45px');
  $(`#${id}`).find('.cat__eye.right').css('transform', 'rotate(0deg)');
  $(`#${id}`).find('.cat__eye.right').css('left', '75px');
  $(`#${id}`).find('.cat__eye').css('top', '10px');
  $(`#${id}`).find('.cat__pupil.left').css('top', '10px');
  $(`#${id}`).find('.cat__pupil.left').css('left', '16px');
  $(`#${id}`).find('.cat__pupil.right').css('top', '19px');
  $(`#${id}`).find('.cat__pupil.right').css('left', '5px');
  $(`#${id}`).find('.cat__inner_pupil').css('display', 'block');
  $(`#${id}`).find('.cat__pupil').removeClass("cat__close_eyes");
}

function eyeType2(id) {
  eyeType1(id)
  $(`#${id}`).find('.cat__pupil.left').css('top', '3px');
  $(`#${id}`).find('.cat__pupil.left').css('left', '11px');
  $(`#${id}`).find('.cat__pupil.right').css('top', '26px');
  $(`#${id}`).find('.cat__pupil.right').css('left', '10px');
}

function eyeType3(id) {
  eyeType1(id)
  $(`#${id}`).find('.cat__pupil.left').css('top', '23px');
  $(`#${id}`).find('.cat__pupil.left').css('left', '11px');
  $(`#${id}`).find('.cat__pupil.right').css('top', '6px');
  $(`#${id}`).find('.cat__pupil.right').css('left', '10px');
}

function eyeType4(id) {
  eyeType1(id)
  $(`#${id}`).find('.cat__inner_pupil').css('display', 'none');
  $(`#${id}`).find('.cat__pupil').addClass("cat__close_eyes");
  $(`#${id}`).find('.cat__close_eyes.left').css('top', '9px');
  $(`#${id}`).find('.cat__close_eyes.left').css('left', '6px');
  $(`#${id}`).find('.cat__close_eyes.right').css('top', '10px');
  $(`#${id}`).find('.cat__close_eyes.right').css('left', '3px');
}

function eyeType5(id) {
  eyeType1(id)
  $(`#${id}`).find('.cat__inner_pupil.right').css('display', 'none');
  $(`#${id}`).find('.cat__pupil.right').addClass("cat__close_eyes");
  $(`#${id}`).find('.cat__close_eyes.right').css('top', '10px');
  $(`#${id}`).find('.cat__close_eyes.right').css('left', '3px');
}

function eyeType6(id) {
  eyeType1(id)
  $(`#${id}`).find('.cat__pupil.left').css('top', '20px');
  $(`#${id}`).find('.cat__pupil.right').css('top', '24px');
}

function eyeType7(id) {
  eyeType1(id)
  $(`#${id}`).find('.cat__eye.left').css('transform', 'scale(1,-1) rotate(10deg)');
  $(`#${id}`).find('.cat__eye.right').css('transform', 'rotate(10deg)');
}

function changeMouthShape(num, id) {
  $('#dnamouthshape').html(num)
  switch (num) {
    case 1:
      mouthType1(id)
      $(`#${id}`).find('#mouthName').html('Happy')
      break
    case 2:
      mouthType2(id)
      $(`#${id}`).find('#mouthName').html('Smile')
      break
    case 3:
      mouthType3(id)
      $(`#${id}`).find('#mouthName').html('Still')
      break
    case 4:
      mouthType4(id)
      $(`#${id}`).find('#mouthName').html('Thinking')
      break
  }
}

function mouthType1(id) {
  $(`#${id}`).find('.cat__mouth').removeClass("cat__mouth_smile");
  $(`#${id}`).find('.cat__mouth').removeClass("cat__mouth_still");
  $(`#${id}`).find('.cat__mouth').removeClass("cat__mouth_thinking");
  $(`#${id}`).find('.cat__mouth_round').css('display', 'block');
  $(`#${id}`).find('.cat__face_line').css('display', 'block');
  $(`#${id}`).find('.cat__tongue').css('display', 'block');
  $(`#${id}`).find('.cat__mouth').css('top', '85px');
  $(`#${id}`).find('.cat__mouth').css('left', '30px');
  $(`#${id}`).find('.cat__line_nose_to_mouth').css('height', '23px');
}

function mouthType2(id) {
  mouthType1(id);
  $(`#${id}`).find('.cat__mouth_round').css('display', 'none');
  $(`#${id}`).find('.cat__face_line').css('display', 'none');
  $(`#${id}`).find('.cat__tongue').css('display', 'none');
  $(`#${id}`).find('.cat__mouth').addClass("cat__mouth_smile");
  $(`#${id}`).find('.cat__mouth_smile').css('top', '-110px');
  $(`#${id}`).find('.cat__mouth_smile').css('left', '5px');
  $(`#${id}`).find('.cat__line_nose_to_mouth').css('height', '56px');
}

function mouthType3(id) {
  mouthType1(id);
  $(`#${id}`).find('.cat__mouth_round').css('display', 'none');
  $(`#${id}`).find('.cat__face_line').css('display', 'none');
  $(`#${id}`).find('.cat__tongue').css('display', 'none');
  $(`#${id}`).find('.cat__mouth').addClass("cat__mouth_still");
  $(`#${id}`).find('.cat__mouth_still').css('top', '110px');
  $(`#${id}`).find('.cat__mouth_still').css('left', '50px');
  $(`#${id}`).find('.cat__line_nose_to_mouth').css('height', '56px');
}

function mouthType4(id) {
  mouthType1(id);
  $(`#${id}`).find('.cat__mouth_round').css('display', 'none');
  $(`#${id}`).find('.cat__face_line').css('display', 'none');
  $(`#${id}`).find('.cat__tongue').css('display', 'none');
  $(`#${id}`).find('.cat__mouth').addClass("cat__mouth_thinking");
  $(`#${id}`).find('.cat__mouth_thinking').css('top', '111px');
  $(`#${id}`).find('.cat__mouth_thinking').css('left', '34px');
  $(`#${id}`).find('.cat__line_nose_to_mouth').css('height', '50px');
}


function changeEarShape(num, id) {
  $('#dnaearshape').html(num)
  switch (num) {
    case 1:
      earType(0, 0, id)
      $(`#${id}`).find('#earName').html('"The Actual"')
      break
    case 2:
      earType(200, 160, id);
      $(`#${id}`).find('#earName').html('Basic')
      break
    case 3:
      earType(180, 180, id);
      $(`#${id}`).find('#earName').html('Away')
      break
    case 4:
      earType(150, 210, id);
      $(`#${id}`).find('#earName').html('Far Away')
      break
    case 5:
      earType(220, 140, id);
      $(`#${id}`).find('#earName').html('Straight')
      break
    case 6:
      earType(240, 120, id);
      $(`#${id}`).find('#earName').html('Close')
      break
  }
}

function earType(angleRight, angleLeft, id) {
  $(`#${id}`).find('.cat__ears').css('display', 'block')
  if (angleRight == 0 && angleLeft == 0) {
    $(`#${id}`).find('.cat__ears').css('display', 'none')
  } else {
    $(`#${id}`).find('.cat__ear.left').css('transform', 'scale(1,-1) rotate(' + angleLeft.toString() + 'deg)')
    $(`#${id}`).find('.cat__ear.right').css('transform', 'scale(1,-1) rotate(' + angleRight.toString() + 'deg)')
  }
}

function changeEarColor(color, code, id) {
  $(`#${id}`).find('.cat__ear_inside').css('background', '#' + color)
  $(`#${id}`).find('#earcolorcode').html('code: ' + code)
  $(`#${id}`).find('#dnaearcolor').html(code)
}

function changeAnimation(num, id) {
  $('#dnaanimation').html(num)
  switch (num) {
    case 1:
      animateType1(id)
      $(`#${id}`).find('#animationName').html('Moving Bell')
      break
    case 2:
      animateType2(id)
      $(`#${id}`).find('#animationName').html('Wave')
      break
    case 3:
      animateType3(id)
      $(`#${id}`).find('#animationName').html('Dance')
      break
    case 4:
      animateType4(id)
      $(`#${id}`).find('#animationName').html('Jump!')
      break
  }
}

function resetAnimation(id) {
  $(`#${id}`).find(".cat__bell").removeClass("movingBell");
  $(`#${id}`).find(".cat__arm").removeClass("movingArm");
  $(`#${id}`).find(".cat__foot").removeClass("movingFoot");
  $(`#${id}`).find(".cat").removeClass("jump");
}

function animateType1(id) {
  resetAnimation(id);
  $(`#${id}`).find(".cat__bell").addClass("movingBell");
}

function animateType2(id) {
  resetAnimation(id);
  $(`#${id}`).find(".cat__arm.right").addClass("movingArm");
}

function animateType3(id) {
  resetAnimation(id);
  $(`#${id}`).find(".cat__arm").addClass("movingArm");
  $(`#${id}`).find(".cat__foot").addClass("movingFoot");
}

function animateType4(id) {
  resetAnimation(id);
  $(`#${id}`).find(".cat").addClass("jump");
}