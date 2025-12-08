
      let symbols = [];
      const symbolSize = 80;

      class BouncingSymbol {
        constructor(char, x, y, hue) {
          this.char = char;
          // "𝄞" or "𝄢"
          this.pos = createVector(x, y);
          this.vel = createVector(random(-4, 4), random(-4, 4));
          this.size = symbolSize;
          this.hue = hue;               // 0–359 → full rainbow
          this.trail = [];
          this.maxTrail = 20;
        }

        update() {
          this.pos.add(this.vel);

          // Add to trail
          this.trail.push(this.pos.copy());
          if (this.trail.length > this.maxTrail) this.trail.shift();

          // Bounce off walls
          if (this.pos.x < this.size/2 || this.pos.x > width - this.size/2) {
            this.vel.x *= -0.96;
            this.pos.x = constrain(this.pos.x, this.size/2, width - this.size/2);
          }
          if (this.pos.y < this.size/2 || this.pos.y > height - this.size/2) {
            this.vel.y *= -0.96;
            this.pos.y = constrain(this.pos.y, this.size/2, height - this.size/2);
          }
        }

        display() {
          push();
          translate(this.pos.x, this.pos.y);

          // ——— GLOWING TRAIL ———
          noFill();
          for (let i = 0; i < this.trail.length; i++) {
            let alpha = map(i, 0, this.trail.length-1, 255, 0);
            let sz    = map(i, 0, this.trail.length-1, this.size*0.5, this.size*1.6);
            stroke(`hsla(${this.hue}, 100%, 65%, ${alpha/255})`);
            strokeWeight(5);
            textSize(sz);
            textAlign(CENTER, CENTER);
            text(this.char, this.trail[i].x - this.pos.x, this.trail[i].y - this.pos.y);
          }

          // ——— MULTI-LAYER NEON GLOW ———
          textSize(this.size);
          textAlign(CENTER, CENTER);
          for (let i = 8; i > 0; i--) {
            fill(`hsla(${this.hue}, 100%, 70%, ${0.35 / i})`);
            text(this.char, i*1.8, i*1.8);
            text(this.char, -i*1.8, i*1.8);
            text(this.char, i*1.8, -i*1.8);
            text(this.char, -i*1.8, -i*1.8);
          }

          // ———— BRIGHT CORE ———
          fill(`hsl(${this.hue}, 100%, 82%)`);
          noStroke();
          text(this.char, 0, 0);

          pop();
        }
      }

      function setup() {
        createCanvas(500, 800);
        colorMode(HSB, 360, 100, 100, 1);
        textFont("Georgia");
        background(0);

        // First 6 clefs — nice spaced rainbow colors
        for (let i = 0; i < 6; i++) {
          let hue = i * 60;  // 0, 60, 120, 180, 240, 300 → perfect rainbow
          let char = i % 2 === 0 ? "𝄞" : "𝄢";
          let x = random(symbolSize, width  - symbolSize);
          let y = random(symbolSize, height - symbolSize);
          symbols.push(new BouncingSymbol(char, x, y, hue));
        }
      }

      function draw() {
        background(0, 0, 0, 40);   // beautiful fading trails

        for (let s of symbols) {
          s.update();
          s.display();
        }
      }

      // ←←← THIS IS THE IMPORTANT PART →→→
      function mousePressed() {
        if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
          // Give clicked symbols the EXACT same beautiful rainbow cycle
          let hue = frameCount * 3 % 360;           // slowly cycles through all colors
          // Or use: let hue = random(0, 360);      // totally random (also gorgeous)
          let char = random(["𝄞", "𝄢"]);
          
          symbols.push(new BouncingSymbol(char, mouseX, mouseY, hue));
        }
      }
  
 