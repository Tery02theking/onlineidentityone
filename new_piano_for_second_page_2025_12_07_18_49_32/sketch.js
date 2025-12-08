let rectX = 10;
let rectY = 0;
let rectWidth = 12;
let rectHeight = 120;

let circles = [];
let particles = [];

function setup() {
  createCanvas(windowWidth, 120);   // full width
  rectX = width / 2;
}

function windowResized() {
  resizeCanvas(windowWidth, 120);
}

function draw() {
  background(255);

  // --- PARTICLES ---
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];

    p.x += p.vx;
    p.y += p.vy;
    p.life--;

    let alpha = map(p.life, 0, p.maxLife, 255, 0);
    fill(red(p.col), green(p.col), blue(p.col), alpha);
    noStroke();
    ellipse(p.x, p.y, p.size);

    if (p.life <= 0) particles.splice(i, 1);
  }

  // --- CIRCLES ---
  for (let c of circles) {
    noStroke();
    fill(c.col);
    ellipse(c.x, c.y, c.diameter);
  }

  // --- MOVING BLACK KEY ---
  rectX += random(-8, 8);
  rectX = constrain(rectX, 0, width - rectWidth);

  fill(0);
  rect(rectX, rectY, rectWidth, rectHeight);

  // --- FULL-WIDTH PIANO STRIPES ---
  let thickSpacing = 22;   // space between thick bars
  let thinSpacing  = 15;   // space between thin bars

  // Draw thick bars (wide)
  fill(22);
  for (let x = 0; x <= width; x += thickSpacing) {
    rect(x, 0, 9, 80);
  }

  // Draw thin bars (thin lines)
  for (let x = 0; x <= width; x += thinSpacing) {
    rect(x, 0, 0.75, 120);
  }
}

function mousePressed() {
  for (let i = circles.length - 1; i >= 0; i--) {
    let c = circles[i];
    if (dist(mouseX, mouseY, c.x, c.y) < c.diameter / 2) {
      explode(c.x, c.y, c.col);
      circles.splice(i, 1);
      return;
    }
  }

  circles.push({
    x: mouseX,
    y: mouseY,
    diameter: 15 + random(-3, 8),
    col: color(random(255), random(255), random(255))
  });
}

function explode(x, y, col) {
  let particleCount = 30;
  for (let i = 0; i < particleCount; i++) {
    let angle = random(TWO_PI);
    let speed = random(2, 8);
    let lifeSpan = floor(random(20, 40));

    particles.push({
      x: x,
      y: y,
      vx: cos(angle) * speed,
      vy: sin(angle) * speed,
      size: random(4, 12),
      life: lifeSpan,
      maxLife: lifeSpan,
      col: col
    });
  }
}
