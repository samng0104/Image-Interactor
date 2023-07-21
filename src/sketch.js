//variables
let handpose, detections, video;
let img;

//Begin: Setup()
function setup(){
  createCanvas(1250, 437);
  video = createCapture(VIDEO);
  video.size(625, height);
  video.hide();
  handpose = ml5.handpose(video, modelReady);
  handpose.on("hand", gotResults);
  img = loadImage('Assets/hamburger.jpeg');

}
//EOF: Setup()

//Begin: modelReady()
function modelReady(){console.log('model ready');}
//EOF: modelReady()

//Begin: gotResults()
function gotResults(results){detections = results}
//EOF: gotResults()

//Begin: draw
function draw(){
  let frame = video.get();
  image(img, 625, 0, 625, height);
  image(frame, 0, 0, 625, height);
  
  
  if(detections) {
    if(detections.length > 0) 
      drawKeypoints();
  }
}
//EOF: draw()

//Begin: drawKeypoints()
function drawKeypoints(){
  noStroke();
  fill(255, 0, 0);
  for (let i = 0; i < detections.length; i++){
    const detection = detections[i];
    for (let j = 0; j < detection.landmarks.length; j++) {
      const keypoint = detection.landmarks[j];
      ellipse(keypoint[0], keypoint[1], 10, 10);
    }
  }
}
//EOF: drawKeypoints()