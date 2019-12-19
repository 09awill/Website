var x,y;
var square;
var dvd;
var r,g,b;
function preload(){

  dvd = loadImage("dvdlogo.png");
  
}
function setup() {
  var canv = createCanvas(800, 600);
  canv.parent('CanvasWrap');
  x = random(width-dvd.width);
  y = random(height-dvd.height);
  r = random(100,255);
  g = random(100,255);
  b = random(100,255);
}
var xDirect = 3;
var yDirect = 3;
function draw() {
  x+= xDirect;
  y+= yDirect;
  if(x >= width-dvd.width || x <= 0){
    xDirect = -xDirect;
    randomTint();
  };
  if(y >= height-dvd.height || y <= 0){
    yDirect = -yDirect
    randomTint();
  };
  background(0);
  image(dvd,x,y);
}

function randomTint(){
      r = random(100,255);
      g = random(100,255);
      b = random(100,255);
      tint(r,g,b);
}