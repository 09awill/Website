// Variable for capture device
var video;
// Previous Frame
var prevFrame;
// How different must a pixel be to be a "motion" pixel
let thresholdInImageSlider, thresholdSlider ,DelaySlider;
var movement = 0;
//Variables for the display and detection are below
var ctracker;
//var cnv;
var display;
var startingVar = true;
var Detect = true;
var volume = 0;
var scalefactor = 40;

var  motionText;
var faceText;


function setup() {
  motionText = createElement('h1','No Motion Detected');
  motionText.parent('CanvasWrap');
  faceText = createElement('h1','No Face Detected');
  faceText.parent('CanvasWrap');
  thresholdInImageSlider = document.getElementById('thresholdInImageSlider');
  thresholdSlider = document.getElementById('thresholdSlider');
  DelaySlider = document.getElementById('DelaySlider');
  console.log(DelaySlider.value);
  cnv = createCanvas(320, 240);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.parent('CanvasWrap');
  cnv.parent('CanvasWrap');
  video.size(width, height);
  prevFrame = createImage(video.width, video.height, RGB);
}




function draw() {
  cnv.position(video.x,video.y);
  if(display){
    if(startingVar){
      starting();
    }
    setTimeout(DetectFace, 5000);
  } else {
  movement = 0;
  loadPixels();
  video.loadPixels();
  prevFrame.loadPixels();

  // Begin loop to walk through every pixel
  for (var x = 0; x < video.width; x++) {
    for (var y = 0; y < video.height; y++) {

      // Step 1, what is the location into the array
      var loc = (x + y * video.width) * 4;
      
      // Step 2, what is the previous color
      var r1 = prevFrame.pixels[loc   ]; 
      var g1 = prevFrame.pixels[loc + 1];
      var b1 = prevFrame.pixels[loc + 2];

      // Step 3, what is the current color
      var r2 = video.pixels[loc   ]; 
      var g2 = video.pixels[loc + 1];
      var b2 = video.pixels[loc + 2];

      // Step 4, compare colors (previous vs. current)
      var diff = dist(r1, g1, b1, r2, g2, b2);

      // Step 5, How different are the colors?
      // If the color at that pixel has changed, then there is motion at that pixel.
      if (diff > thresholdInImageSlider.value) { 
        // If motion, display black
        //pixels[loc] = 0;
        //pixels[loc+1] = 0;
        //pixels[loc+2] = 0;
        pixels[loc+3] = 255;
        movement++;
      } else {
        // If not, display white
        pixels[loc] = 255;
        pixels[loc+1] = 255;
        pixels[loc+2] = 255;
        pixels[loc+3] = 255;
      }
    }
  }
  updatePixels();

  // Save frame for the next cycle
  //if (video.canvas) {
    prevFrame.copy(video, 0, 0, video.width, video.height, 0, 0, video.width, video.height); // Before we read the new frame, we always save the previous frame for comparison!
  //}

  if(movement > thresholdSlider.value){
    console.log("YOU HAVE MOVED");
    motionText.html("Motion detected");
    display = true;
  } else {
    motionText.html("No Motion detected");
  }
}
}



function starting(){
  //video.position(cnv.x, cnv.y);
  //cnv.position(0, 0);

  // setup tracker
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(video.elt);
  noStroke();
  startingVar = false;
}

function DetectFace() {
  if(Detect){
  display = false;
  startingVar =false;
  //video.show();
  clear();
  display = false;
  startingVar =false;
  //get the detection score, or how well the face is detected (from 0 to 1)
  var detectionScore = ctracker.getScore();

  if (detectionScore > 0) {
    // get array of face marker positions [x, y] format
    var positions = ctracker.getCurrentPosition();

    /*
    You can find all the points here
    https://camo.githubusercontent.com/e967f92904c8ef84228b8950d3a278efb895b9d2/68747470733a2f2f617564756e6f2e6769746875622e696f2f636c6d747261636b722f6578616d706c65732f6d656469612f666163656d6f64656c5f6e756d626572696e675f6e65775f736d616c6c2e706e67
    */
    try{
    var leftEyeX = positions[32][0];
    var leftEyeY = positions[32][1];

    var rightEyeX = positions[27][0];
    var rightEyeY = positions[27][1];

    var noseX = positions[62][0];
    var noseY = positions[62][1];
    
    var faceLeftX = positions[1][0];
    var faceLeftY = positions[1][1];
    var faceRightX = positions[13][0];
    var faceRightY = positions[13][1];
    
    //the distance between the left point and the rightmost point is a good indication
    //of the size of the face or proximity to the camera and I can use it to scale my graphic elements
    var size = dist(faceLeftX,faceLeftY, faceRightX, faceRightY);
    
    //draw the face
    fill(255,255,255,60);
    ellipse(noseX, noseY, size, size);
    
    //draw the eyes
    fill(255);
    ellipse(rightEyeX, rightEyeY, 10, 10);
    ellipse(leftEyeX, leftEyeY, 10, 10);
    
    var noseSize = map(volume, 0, 1, 30, 400);
    //draw a nose
    ellipse(noseX, noseY, noseSize, noseSize/2);
      console.log("FACE DETECTED");
      faceText.html("Face Detected");
      takescreenshot("Face");
    } catch {
      console.log("No face Found");
      faceText.html("No Face Detected");
    }
  }
  Detect = false;
  setTimeout(setCanDetect, DelaySlider.value * 50);
  }
}

function takescreenshot(name){
  console.log("Snap")
}
function setCanDetect(){
  Detect = true;
  console.log("Detect set to true");
}