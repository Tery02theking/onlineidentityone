const STROKE_DENSITY = 0.1; // 0-1, higher = more ink
const STROKE_MAX_LEN = 6; // max length of a single stroke (px)
const STROKE_MIN_LEN = 2; // min length
const WIGGLE_AMT = 1.5; // how much the line wiggles
const LINE_THICKNESS = 0.5; // marker thickness
const IMG_URL = "male portrait.jpg";
// ---------------------------------------------------

let srcImg;
let pg; // off-screen buffer for the final drawing

function preload() {
  srcImg = loadImage(IMG_URL); // source portrait
}

function setup() {
  createCanvas(1000, 700);
  pg = createGraphics(width, height);
  pg.background(255);
  pg.noFill();
  pg.stroke(0);
  pg.strokeWeight(LINE_THICKNESS);

  // Resize image to canvas (keeps aspect ratio)
  let ratio = min(width / srcImg.width, height / srcImg.height);
  let iw = srcImg.width * ratio;
  let ih = srcImg.height * ratio;
  srcImg.resize(iw, ih);

  image(srcImg, (width - iw) / 2, (height - ih) / 2); // show original for reference
  noLoop(); 
}

function draw() {
  // Center the image on the off-screen buffer
  let offsetX = (width - srcImg.width) / 6;
  let offsetY = (height - srcImg.height) / 6;

  //Scan every pixel of the source image ----
  srcImg.loadPixels();
  for (let y = 0; y < srcImg.height; y += 1) {
    for (let x = 0; x < srcImg.width; x += 1) {
      let i = (x + y * srcImg.width) * 4;
      let brightness =
        (srcImg.pixels[i] + srcImg.pixels[i + 1] + srcImg.pixels[i + 2]) / 3; // 0-255
      let darkness = 1 - brightness / 255; // 0 (white) … 1 (black)

      // ---- 2. Decide if we draw a stroke here ----
      // probability = darkness * STROKE_DENSITY
      if (random() < darkness * STROKE_DENSITY) {
        drawSharpieStroke(pg, x + offsetX, y + offsetY, darkness);
      }
    }
  }

  // 
  image(pg, 0, 0);
}

function drawSharpieStroke(g, cx, cy, darkness) {
  // Length proportional to darkness (darker = longer strokes)
  let len = lerp(STROKE_MIN_LEN, STROKE_MAX_LEN, darkness);
  let half = len / 2;

  g.beginShape();
  for (let t = -half; t <= half; t += 1) {
    let px = cx + random(-WIGGLE_AMT, WIGGLE_AMT);
    let py = cy + t;
    g.vertex(px, py);
  }
  g.endShape();
}
function mousePressed() {
  redraw();
    //pencil with mouse feature
  textSize(20);
  text("✏️",mouseX,mouseY);;
}
