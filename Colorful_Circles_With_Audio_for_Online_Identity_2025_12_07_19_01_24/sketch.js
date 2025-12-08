// Press Space → toggle Circles / Grid
// Click → Play / Pause

let Penny;
let amp;
let vol;
let stage = "circles";

function preload() {
  Penny = loadSound("Penny.mp3");
}

function setup() {
  createCanvas(windowWidth, 1200);
  colorMode(HSB, 360, 100, 100, 100);  
  amp = new p5.Amplitude();
  amp.setInput(Penny);
  amp.smooth(0.3);
  background(0);
}

function draw() {
  background(0, 0, 0, 20);           // soft trail
  vol = amp.getLevel();              // 0 – ~0.5
  let size      = map(vol, 0, 0.5, 30, 220);
  let bright    = map(vol, 0, 0.5, 40, 100);
  let sat       = map(vol, 0, 0.5, 60, 100);

  if (stage === "circles") {
    drawCalmColorfulCircles(size, bright, sat);
  } else if (stage === "grid") {
    drawGrid(size, bright);          
  }
}
  
function drawCalmColorfulCircles(baseSize, brightness, saturation) {
  const cols = 9;
  const rows = 9;
  const spacingX = width / (cols + 1);
  const spacingY = height / (rows + 1);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = spacingX * (i + 1);
      let y = spacingY * (j + 1);

      // Slow, gentle breathing instead of fast jitter
      let breathe = sin(frameCount * 0.02 + i * 0.5 + j * 0.5) * 30;

      // Unique slowly-moving hue for every circle
      let hue = (frameCount * 0.3 + i * 25 + j * 15) % 360;

      // Distance from center makes outer circles react a little slower/larger
      let distFromCenter = dist(x, y, width/2, height/2);
      let sizeOffset = map(distFromCenter, 0, 300, 0, 60);
      let pulseSize = baseSize + breathe + sizeOffset;

      // Final color (very vivid + volume-controlled brightness)
      fill(hue, saturation, brightness, 90);
      noStroke();

      ellipse(x, y, pulseSize, pulseSize);

      // Optional subtle inner glow
      fill(hue, saturation * 0.8, brightness + 20, 60);
      ellipse(x, y, pulseSize * 0.5, pulseSize * 0.5);
    }
  }
}

function drawGrid(baseSize, brightness) {
  let spacing = map(vol, 0, 0.5, 40, 12);
  strokeWeight(map(vol, 0, 0.5, 1, 7));
  stroke((frameCount * 2) % 360, 80, brightness);

  for (let x = 0; x <= width; x += spacing) {
    for (let y = 0; y <= height; y += spacing) {
      let d = dist(x, y, mouseX, mouseY);
      let wave = sin(frameCount * 0.08 + d * 0.02) * vol * 150;
      line(x - wave, y, x + wave, y);
      line(x, y - wave, x, y + wave);
    }
  }
}

//Controls
function mousePressed() {
  if (Penny.isPlaying()) {
    Penny.pause();
  } else {
    Penny.play();
    Penny.loop();
  }
}

function keyPressed() {
  if (key === ' ') {
    stage = stage === "circles" ? "grid" : "circles";
    background(0);
  }
}