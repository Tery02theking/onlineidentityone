let t = 0;

function setup() {
  createCanvas(500, 500);
  noStroke();
}

function draw() {
  background(220,120);

  // Heartbeat scale (subtle, organic)
  t += 0.1;
  let s = 1 + 0.03 * sin(t);  

  translate(width / 2, height / 2 + 40);
  scale(s);

  drawHeart();
}

function drawHeart() {
  // Base color
  fill(180, 30, 40,120);

  // Main heart shape (anatomical-ish)
  beginShape();
  vertex(0, -140);

  // Left aorta bulge
  bezierVertex(-90, -170, -150, -80, -100, -20);

  // Left body
  bezierVertex(-140, 40, -80, 140, 0, 140);

  // Right body
  bezierVertex(80, 140, 140, 40, 100, -20);

  // Right aorta bulge
  bezierVertex(150, -80, 90, -170, 0, -140);
  endShape(CLOSE);

  // Shading (darker edges)
  fill(120, 10, 20, 80,);
  beginShape();
  vertex(0, -130);
  bezierVertex(-80, -150, -120, -60, -70, 0);
  bezierVertex(-110, 50, -50, 130, 0, 130);
  bezierVertex(50, 130, 110, 50, 70, 0);
  bezierVertex(120, -60, 80, -150, 0, -130);
  endShape(CLOSE);

  // Highlight
  fill(255, 100, 120, 30,);
  beginShape();
  vertex(-30, -50);
  bezierVertex(-80, -20, -60, 40, -20, 60);
  bezierVertex(-10, 40, -5, 0, -30, -50);
  endShape(CLOSE);
}
