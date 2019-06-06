var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var redball = 10;
var blueball = 10;
var circle = 50;

var speed = 8;

var angleblue = 0;
var anglered = Math.PI;

var score = 0;

var xAll = canvas.width/2;
var yAll = canvas.height-80;

var xblue = xAll;
var yblue = yAll-50;

var xred = xAll;
var yred = yAll+50;

function makeSquare(x, y, length, breadth, speed) {
  return {
    x: x,
    y: y,
    l: length,
    b: breadth,
    s: speed,
    draw: function() {
      context.fillRect(this.x, this.y, this.l, this.b);
    }
  }
}

function play()
{
   ctx.fillStyle = 'rgba(255,255,255,0.5)';
 ctx.fillRect(0,0, canvas.width,canvas.height);
 drawCircle();
 drawscore();
 draw();

   var Xbcircle = circle * Math.cos(angleblue * (Math.PI/180));
   var Ybcircle = circle * Math.sin(angleblue * (Math.PI/180));
   xblue = Xbcircle + xAll;
   yblue = Ybcircle + xAll;


   var Xrcircle = circle * Math.cos(angleblue * (Math.PI/180));
   var Yrcircle = circle * Math.sin(angleblue * (Math.PI/180));
   xred = Xbcircle + xAll;
   yred = Ybcircle + xAll;

  if(rightPressed) { 
     angleblue += speed; 
    anglered += speed;
		}
	else if(leftPressed) {
     angleblue -= speed; 
    anglered -= speed;
		}

}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}


function drawCircle() {
  ctx.beginPath();
  ctx.arc(xAll, yAll, circle, 0, Math.PI*2);
  ctx.stroke();
  ctx.closePath();

  
  ctx.beginPath();
  ctx.arc(xblue, yblue, blueball, 0, Math.PI*2);
  ctx.fillStyle = 'blue';
  ctx.fill();
  ctx.closePath();
  

  ctx.beginPath();
  ctx.arc(xred, yred, redball, 0, Math.PI*2);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();

}

var bricks = [];
var brickspeed = 3;

 function incspeed()
{    brickspeed++;  }
setInterval(incspeed,25000);

var bricklength = 35;
var brickwidth = 20;

function drawbrick() {

   var Xbrick = (canvas.width/3)+ Math.floor(Math.random()*canvas.width/3);
   var Ybrick = 0;
   bricks.push(makeSquare(Xbrick,Ybrick,bricklength,brickwidth,brickspeed));


}
function Score(){ score++; }

setInterval(Score,800);

function drawscore()
{
   ctx.font = '24px Arial';
  ctx.textStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 25);
}


function draw(){

bricks.forEach(function(brick){

    brick.y +=brickspeed;
    
    ctx.fillStyle = '#00FF00';

   brick.draw(); 

   if(brick.x<xblue && xblue<brick.x+bricklength && brick.y<yblue && yblue<brick.y+brickwidth || brick.x<xred && xred<brick.x+bricklength && brick.y<yred && yred<brick.y+brickwidth )
     {  

   alert("GAME OVER");
        document.location.reload();
      clearInterval(interval);
 }        
});
}
console.log(bricks);


play();



