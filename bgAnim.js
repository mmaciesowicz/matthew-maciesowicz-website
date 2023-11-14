const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// canvas.style.background = "#111032";
canvas.style.background = "#fff";
const particlesArray = [];
// let hue = 0;
let lightness = 50;
let reduceLight = false;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouse = {
  x: undefined,
  y: undefined,
};

// canvas.addEventListener("mousemove", function (event) {
//   const mouseCursor = document.querySelector(".cursor");
//   mouseCursor.style.left = event.x + "px";
//   mouseCursor.style.top = event.y + "px";
// });

// canvas.addEventListener('click', function(){
//     const mouseCursor = document.querySelector('.cursor');
//     mouseCursor.style.color = '#fff';
//     mouseCursor.style.boxShadow = '0 0 100px 60px #f0f, 0 0 140px 90px #0ff';
// });

canvas.addEventListener("click", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 15; i++) {
    particlesArray.push(new StarParticle());
  }
});

canvas.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 2; i++) {
    particlesArray.push(new Particle());
  }
});

function drawStar(
  cx,
  cy,
  spikes,
  outerRadius,
  innerRadius,
  strokeColour,
  fillColour
) {
  var rot = (Math.PI / 2) * 3;
  var x = cx;
  var y = cy;
  var step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.lineWidth = 4;
  ctx.strokeStyle = strokeColour;
  ctx.stroke();
  ctx.fillStyle = fillColour;
  ctx.fill();
}

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 15 + 1;
    this.speedX = Math.random() * 5 - 1.5;
    this.speedY = Math.random() * 5 - 1.5;
    // this.color = 'hsl(' + hue + ', 100%, 50%)';
    this.color = "hsl( 211 , 100%, " + lightness + "%)";
    //this.color = 'hsl( 40 , 100%, ' + lightness + '%)';
    // this.spikes = Math.round(Math.random() * 5) - 5
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }
  draw() {
    ctx.fillStyle = this.color;
    drawStar(this.x, this.y, 0, this.size, this.size / 2, "#0ff", this.colour);
    /*
        ctx.fillStyle = this.color;
        //ctx.strokeStyle = 'red';
        ctx.beginPath();
        //ctx.lineWidth = 5;
        ctx.arc(this.x,this.y,this.size,0,Math.PI * 2);
        ctx.fill();
        //ctx.stroke();
        */
  }
}

class StarParticle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 15 + 1;
    this.speedX = Math.random() * 5 - 1.5;
    this.speedY = Math.random() * 5 - 1.5;
    //this.color = 'hsl(' + hue + ', 100%, 50%)';
    this.color = "hsl( 211 , 100%, " + lightness + "%)";
    // this.spikes = Math.round(Math.random() * 5) - 5
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }
  draw() {
    ctx.fillStyle = this.color;
    drawStar(this.x, this.y, 5, this.size, this.size / 2, "#0ff", "#fff");
  }
}

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = particlesArray[i].color;
        //ctx.lineWidth = particlesArray[i].size/10;
        ctx.lineWidth = 0.2;
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
        ctx.closePath();
      }
    }
    if (particlesArray[i].size <= 2) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //ctx.fillStyle = 'rgba(0,0,0,0.1)';
  //ctx.fillRect(0,0,canvas.width,canvas.height);
  handleParticles();
  //hue+=2;

  if (lightness >= 100) {
    reduceLight = true;
  } else if (lightness <= 30) {
    reduceLight = false;
  }

  if (reduceLight == true) {
    lightness -= 10;
  } else {
    lightness += 10;
  }

  requestAnimationFrame(animate);
}
animate();
