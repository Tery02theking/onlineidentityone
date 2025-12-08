let breath = 0; // Will oscillate between 0 and TWO_PI

function setup() {
  createCanvas(600, 700);
  angleMode(DEGREES);
}

function draw() {
  background(225,220);
  translate(width / 2, height / 2 - 50); // Center the lungs
  
  // Breathing animation: slow, natural rhythm
  breath += 0.01;
  let breatheAmount = sin(breath * 180) * 0.2 + 1; // Scales between ~0.6 and 1.4
  
  drawLungs(breatheAmount);
}

function drawLungs(scaleFactor) {
  push();
  scale(scaleFactor);
  
  // Main lung bodies (two symmetrical lobes)
  noStroke();
  
  // Left lung
  fill(200, 80, 120, 20);
  ellipse(-70, 0, 180, 280);
  ellipse(-90, -60, 140, 200);
  ellipse(-60, 60, 120, 180);
  
  // Right lung
  fill(220, 90, 140, 20);
  ellipse(70, 0, 180, 280);
  ellipse(90, -60, 140, 200);
  ellipse(60, 60, 120, 180);
  
  // Trachea (windpipe)
  fill(180, 70, 110,20);
  rect(-25, -140, 50, 180, 30);
  
  // Main bronchi branching into lungs
  stroke(180, 60, 100,20);
  strokeWeight(18);
  noFill();
  
  // Left main bronchus
  bezier(0, -100, -40, -80, -90, -40, -80, 20,);
  // Right main bronchus
  bezier(0, -100, 40, -80, 90, -40, 80, 20,);
  
  // Smaller bronchial branches (pulsing slightly)
  let pulse = sin(breath * 300) * 5 + 10;
  strokeWeight(pulse);
  
  // Left lung branches
  drawBranch(-80, 20, -110, -30);
  drawBranch(-80, 20, -50, -20);
  drawBranch(-80, 20, -100, 60);
  
  // Right lung branches
  drawBranch(80, 20, 110, -30);
  drawBranch(80, 20, 50, -20);
  drawBranch(80, 20, 100, 60);
  
  pop();
}

function drawBranch(x1, y1, x2, y2) {
  //stroke(180, 60, 100, 180, );
 // line(x1, y1, x2, y2);
  
  // Tiny sub-branches
  //strokeWeight(4,);
  //let midX = (x1 + x2) / 2;
  //let midY = (y1 + y2) / 2;
  //line(midX, midY, midX - 15, midY - 20);
  //line(midX, midY, midX + 15, midY + 20);
}

