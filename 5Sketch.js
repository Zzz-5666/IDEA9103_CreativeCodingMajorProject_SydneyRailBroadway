
// Sketch — Main scene setup and rendering everything.

/*
 Canvas scaling from original 600×500 to 1000x800 with 960+20px margin both sides.
 Handles overall intergration including background, railmap, Mondrian town, and car animation.
*/


// Setup
const BASE_W = 1000;
const BASE_H = 800;

//Time-based Rush Hour (personal contribution)
let isRushHour = false;      // it is peak season now
let rushStartTime = 0;       // peak start time
let rushDuration = 5000;     // The peak lasted for 5 seconds.（5000 ms）
let nextRushTime = 8000;     // The first peak occurred 8 seconds later.

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  initTownGrid();
  initOutlineBlocks();
  initGridBlocks();
  initMondrianTown();

  initCars();
}


// Draw
function draw() {
  background(255);

  let s = min(width / BASE_W, height / BASE_H);
  let ox = (width  - BASE_W * s) * 0.5;
  let oy = (height - BASE_H * s) * 0.5;

  push();
  translate(ox, oy);
  scale(s);

  push();
  translate(20, 0);
  scale(960 / original_W, 800 / original_H);

  // 1) Background
  drawSea();

  // 2) Mondrian Town
  drawMondrianTown();
  drawTownGrid();
  drawGridBlocks();
  drawTownOutline();
  drawOutlineBlocks();

  //personal: rush hour status
  updateRushHour();

  // 3) Rails & Stations
  drawRails();
  drawStations();

  // 4) Car Animation
  advanceCars();
  drawCars();

  pop();
  pop();
}


// Adjustment
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//Time-based: Rush Hour Event (personal)
function updateRushHour() {
  let t = millis(); // Milliseconds have elapsed since the program started running.

if (!isRushHour && t > nextRushTime) { //If it's not currently peak time, but the time has exceeded nextRushTime, then it enters peak time.
    isRushHour = true;
    rushStartTime = t;

    nextRushTime = t + rushDuration + random(8000, 15000);//The start time of the next peak period (randomly determined 8-15 seconds after the current peak ends).
  }

   if (isRushHour && t > rushStartTime + rushDuration) {// If it is currently peak time, but the peak period has already ended, then exit the peak period.
    isRushHour = false;
  }
}