let blobs = [];

function setup() {
  createCanvas(500, 800);
  background(245);
  noStroke();
}

function draw() {
  // Soft fade for smudging buildup
  fill(245, 8);
  rect(0, 0, width, height);

  // Draw active blobs
  for (let b of blobs) {
    b.update();
    b.show();
  }
}

function mouseDragged() {
  // Create multiple blobs at each drag point for a heavy charcoal look
  for (let i = 0; i < 8; i++) {
    blobs.push(new Smudge(mouseX + random(-5, 5), mouseY + random(-5, 5)));
  }
}

class Smudge {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.size = random(20, 60);
    this.speed = random(0.2, 1.2);
    this.angleOffset = random(1000);
  }

  update() {
    // Swirly drifting motion using Perlin noise
    let n = noise(this.pos.x * 0.004, this.pos.y * 0.004, this.angleOffset);
    let angle = n * TWO_PI * 3;  // more swirl = more smear

    let v = p5.Vector.fromAngle(angle);
    v.mult(this.speed);
    this.pos.add(v);

    this.angleOffset += 0.01;

    // Slowly shrink so smudges fade naturally
    this.size *= 0.97;
  }

  show() {
    // Charcoal texture: dark irregular ellipse with soft transparency
    fill(0, random(20, 60));
    ellipse(
      this.pos.x,
      this.pos.y,
      this.size * random(0.7, 1.3),
      this.size * random(0.4, 1.1)
    );
  }
}
