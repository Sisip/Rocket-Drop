//this is the lunar class scirpt
//alert("Hi");
//var gameArea = document.getElementById('game');
//var gameRect = gameArea.getBoundingClientRect();
//var gameAreaHeight = Math.round(gameRect.bottom - gameRect.top);
//var gameAreaWidth = Math.round(gameRect.right - gameRect.left);
//alert("Hi game Area width is " + gameAreaWidth + "and game area height is" + gameAreaHeight);
//var landerImage = document.getElementbyId('lander');
//landerImage.style.position= "absolute";
//var targetImage = document.getElementById('target');
//targetImage.style.position= "absolute";
//var flameImage = document.getElementById('flame');
// var blowUp = document.getElementById('blowUp');

//alert("Hi");
var gameArea = document.getElementById('gameArea');
var gameRect = gameArea.getBoundingClientRect();
var gameAreaWidth = Math.round(gameRect.right - gameRect.left);
var gameAreaHeight = Math.round(gameRect.bottom - gameRect.top);

var landerImage = document.getElementById('lander');
landerImage.style.position = "absolute";
landerImage.style.zIndex = "1";

var targetImage = document.getElementById('target');
targetImage.style.position = "absolute";
targetImage.style.zIndex = "0";

var flameImage = document.getElementById('flame');
flameImage.style.position = "absolute";
flameImage.style.zIndex = "0";
flameImage.style.display = "none";

var blowUpImage = document.getElementById('blowup');
blowUpImage.style.position = "absolute";
blowUpImage.style.zIndex = "1";
blowUpImage.style.display = "none";

var landerDY = 6;
var landerDX = 0;
var landerX = 0;
var landerY = 0;
var landerWidth = 110;
var targetX = 0;
var targetY = 0;
var flameX = 0;
var flameY = 0;
var id = setInterval(frame, 40);
var crashed = false;
var moving = false;

function checkForTargetWin() {
  var didIWin = false;
  if (Math.abs(landerX - targetX) < 15) {
    if (((targetY + 5) - (landerY + 80)) < 10) {
      if (Math.abs(landerDY) < 5) {
        didIWin = true;
      }
    }
  }


  return didIWin;
}

function setFlamePosition(){
    flameY = landerY + 70;
    flameX = landerX + 30;
    flameImage.style.top = flameY + 'px';
    flameImage.style.left = flameX + 'px';
}

function showFlame(){
flameImage.style.display = "block";


}

function hideFlame(){
flameImage.style.display = "none";


}



function setLanderAtTopAndTargetAtBottom(){
    crashed = false;
    blowUpImage.style.display = "none";
    landerImage.style.display = "block";
    landerY = 0;
    landerDX = 0;
    landerImage.style.top = landerY + 'px';
    landerX = Math.round(gameAreaWidth/2) - Math.round(landerWidth/2);
    landerImage.style.left = landerX + 'px';
    targetY = gameAreaHeight - 75;
    targetX = Math.round(Math.random() * (gameAreaWidth-110)) + 55;
    targetImage.style.top = targetY + 'px';
    targetImage.style.left = targetX + 'px';
    setFlamePosition();
   
}


function resetAnimation(){
  
  landerDY = 0;
  landerDX = 0;
  setLanderAtTopAndTargetAtBottom();
}




function startAnimation(){
moving = true;
crashed = false;
landerDY = 6;

}

function moveLander(){

    if( moving === true){
      if (checkForTargetWin() === false) {
      landerX += landerDX;
      landerY += landerDY;
      landerDY += 1;


      if (landerX <= 0 && landerDX < 0) {
        landerX = 0;
        landerDX = 0;
      }

      if( (landerX > gameAreaWidth - landerWidth) && landerDX > 0) {
        landerX = gameAreaWidth - landerWidth;
        landerDX = 0;
      }

      if(landerY >= gameAreaHeight - landerWidth) {
          landerY = gameAreaHeight - landerWidth;


          landerDY = 0;
          landerX = 0;
          crashed = true;


      }

      if(crashed === false){
        console.log( "moving lander to " + landerX +", " + landerY);
        landerImage.style.left = landerX + 'px';
        landerImage.style.top = landerY + 'px';
        setFlamePosition();


      } else {

        moving = false;
        landerImage.style.display = "none";
        hideFlame();
        blowUpImage.style.left = landerX + 'px';
        blowUpImage.style.top = landerY + 'px';
        blowUpImage.style.display = "block";

      }
    } else {
      flameImage.style.display = "none";
      moving = false;
      alert("YOU WON!!!!!!! NICE LANDING!!!!!!!");
    }
  }
}
function frame() {
    //console.log("hi from frame");
    moveLander();    
}



setLanderAtTopAndTargetAtBottom();

//showFlame();

document.getElementById('resetButton').onclick = resetAnimation;
document.getElementById('startButton').onclick = startAnimation;

document.onkeydown = function(e){
  //alert("Hello you pressed the key " + e.keyCode) + "!";

//if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
   // e.preventDefault();
  // }

   switch(e.keyCode){

      case 32:
      //alert("You pressed the space key!");
      crashed = false;
      resetAnimation();
      startAnimation();
      break;

      case 37:
      //alert("You pressed the left key!");
      landerDX -=3;
      showFlame();
      break;

      case 38:
     // alert("You pressed the up key!")
     landerDY -=9;
     showFlame();
      break;

      case 39:
      //alert("You pressed the right key!")
      landerDX +=3;
      showFlame();
      break;

      case 40:
      //alert("You pressed the down key!")
      landerDY +=2;
      showFlame();
      break;

   }



};


document.onkeyup = function(e){

  //if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
   // e.preventDefault();
  //}
    switch(e.keyCode){
            case 32:
      //alert("You released the space key!");
      break;

      case 37:
      //alert("You released the left key!");
      landerDX = 0;
      hideFlame();
      break;

      case 38:
     // alert("You released the up key!")
     landerDY = 0;
     hideFlame();
      break;

      case 39:
      //alert("You released the right key!")
      landerDX = 0;
      hideFlame();
      break;

      case 40:
      //alert("You released the down key!")
      landerDY = 0;
      hideFlame();
    }


};






