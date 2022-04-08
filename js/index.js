  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 1200;
  canvas.height = 650;
  const h = canvas.height;
  const w = canvas.width;

  ctx.font = "40px Arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.fillText("Alien Grab & Drop", w / 2, h / 16);
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.fillText("Click StartGame to play", w / 2, h - 50);
  ctx.fillText(
    "Use left/right keys to rotate spaceship, up key for propulsion.",
    w/ 2, h / 6);
  ctx.fillStyle = "yellow";
  ctx.fillText(
    "Down key to drop farm animal. Cows must be dropped on the left. Sheep on the right.",
    w / 2, h / 5);
  ctx.fillText(
    "Any animal dropped on the wrong side will count against your final score.",
    w / 2, h / 4.3);

  let game;

  const shipImage = new Image();
  shipImage.src = "alien-spaceship.png";

  var spaceshipblueprint = {
    x: w / 2,
    y: h / 5,
    w: 40,
    h: 40,
    vx: 0,
    vy: 0,
    ax: 0,
    ay: 0,
    r: -1.55,
    mass: 0.1,
    radius: 15,
    restitution: -0.7,
    fillColor: null,
    draw: function () {
      ctx.fillStyle = spaceship.fillColor || "rgba(250, 250, 250, 0.1)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, 60, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.r);
      ctx.drawImage(shipImage, -30, -60, 60, 120);
      ctx.restore();
    },
    grabbedItems: [],
    score: 0,
  };


  let spaceship = {...spaceshipblueprint};



  let int;
  let gameOn = false;
  let timeInt;
  let oneSecond = 1000
  let time = 60;
  let droppedArr;
  var keys = [];

  function startGame() {
    if (gameOn === false) {
      gameOn = true;
      time=60
      int = setInterval(addItem, 2000);
      timeInt = setInterval(timer, oneSecond)
      itemArr = [];
      droppedArr = [];
      spaceshipblueprint.grabbedItems = [];
      spaceship = {...spaceshipblueprint};
      animloop();
    }
  }

function timer() {
    --time;
    if (time < 0) {
        time = 60;
    }
  }

  const grabSound = new Audio();
  grabSound.src = "221091__alaskarobotics__cartoon-pop-or-drip.wav";

  const beamSound = new Audio();
  beamSound.src = "453391__breviceps__warp-sfx.wav";

  const cowSound = new Audio();
  cowSound.src = "233141__jarredgibb__cow-moan-1-96khz.wav";

  const sheepSound = new Audio();
  sheepSound.src = "28326__ftha__sheep-1-2.wav";

  const propelShip = new Audio();
  propelShip.src = "168984__lavik89__digital-hit.wav"

  function gameOver() {
    window.cancelAnimationFrame(game);
    clearInterval(int);
    clearInterval(timeInt);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "red";
    ctx.font = "50px sans-serif";
    ctx.fillText("GAME OVER", w/2, 100);
    if (droppedArr.length > 0) {
      ctx.fillStyle = "white";
      ctx.font = "30px sans-serif";
      ctx.fillText(`${droppedArr.length} farm animals failed to beam down, and are subtracted from your score.`, w/2, 250);
    }
    ctx.fillStyle = "white";
    ctx.font = "40px sans-serif";
    ctx.fillText(`Final Score: ${spaceship.score - droppedArr.length}`, w/2, 400);
    if (spaceship.score - droppedArr.length < 10) {
      ctx.fillStyle = "red"
      ctx.font = "48px sans-serif";
      ctx.fillText(`You have failed and will be sent to the Delta Quadrant!`, w/2, 500);
    }
    if (spaceship.score - droppedArr.length >= 10) {
      ctx.fillStyle = "white"
      ctx.font = "50px sans-serif";
      ctx.fillText(`Congratulations! You've won!`, w/2, 500);
      ctx.fillStyle = "red"
      ctx.font = "48px sans-serif";
      ctx.fillText(`You may remain on Earth.`, w/2, 600);
    }
    gameOn = false;    
  }

  class Item {
    constructor(id) {
      this.x = Math.random() * canvas.width;
      this.y = (Math.random() * canvas.height) / 2;
      this.w = 60;
      this.h = 30;
      this.color = this.generateColor();
      this.id = id;
      this.colorArray = [];
      this.fillstyle, this.fillRect;
    }
  
    generateColor = () => {
      let col = "";
      if (this.x > canvas.width / 2) {
        col = "red";
      } else {
        col = "yellow";
      }
      return col;
    };
  }

  const cow = new Image();
  cow.src = "Dairy-Cow-PNG-Image.png";

  const sheep = new Image();
  sheep.src = "sheep_on_a_transparent_background_by_zoostock_ddhetu0-fullview.png"

  let itemArr = [];
  let itemsCreated = 0;

  function addItem() {
    itemArr.push(new Item(itemsCreated++));
  }

  let colors = {
    yellow: "rgba(189, 36, 218, 0.3)",
    red: "rgba(37, 217, 38, 0.3)",
  };
  
  let waterTower = new Image()
  waterTower.src = "water-tower.png"

  let obstacle = {
    x: canvas.width / 2 - 10,
    y: (canvas.height * 0.6),
    w: 20,
    h: 260,
    draw: function () {
      ctx.fillStyle = "black";
      ctx.fillRect(this.x, this.y, this.w, this.h);
      ctx.drawImage (waterTower, this.x - 160, this.y - 20, 340, 320)
    },
  };

  let slider = new Image()
  slider.src = "ufo-platform.png"

  let slider1 = {
    x: 0,
    y: 640,
    w: 200,
    h: 40,
    sliderSpeed: 6,
    draw: function () {
      ctx.drawImage (slider, this.x-126, this.y-30, 250, 60)
    },
  };

  let slider2 = {
    x: canvas.width - 100,
    y: 640,
    w: 200,
    h: 40,
    sliderSpeed: 6,
    draw: function () {
      ctx.drawImage (slider, this.x-26, this.y-30, 250, 60)
    },
  };

  var frameRate = 1 / 40;
  var frameDelay = frameRate * 1000;

  var Cd = 0.47;
  var rho = 1.22;
  var A = (Math.PI * spaceship.radius * spaceship.radius) / 10000;
  var ag = 1.2;
  var friction = 0.01;

  function updatePosition(obj) {
    obj.vx += obj.ax;
    obj.vy += obj.ay;

    var Fx =
      (-0.5 * Cd * A * rho * obj.vx * obj.vx * obj.vx) / Math.abs(obj.vx);
    var Fy =
      (-0.5 * Cd * A * rho * obj.vy * obj.vy * obj.vy) / Math.abs(obj.vy);

    Fx = isNaN(Fx) ? 0 : Fx;
    Fy = isNaN(Fy) ? 0 : Fy;

    var ax = Fx / obj.mass;
    var ay = ag + Fy / obj.mass;

    obj.vx += ax * frameRate;
    obj.vy += ay * frameRate;

    obj.x += obj.vx * frameRate * 100;
    obj.y += obj.vy * frameRate * 100;

    if (
      obj.y > canvas.height - obj.radius &&
      obj.color === "red" &&
      obj.x < canvas.width / 2
    ) {
      obj.vy = obj.vy;
    } else if (
      obj.y > canvas.height - obj.radius &&
      obj.color === "yellow" &&
      obj.x > canvas.width / 2
    ) {
      obj.vy = obj.vy;
    } else if (obj.y > canvas.height - obj.radius) {
      obj.vy *= obj.restitution;
      obj.y = canvas.height - obj.radius;
    }

    if (obj.x > canvas.width - obj.radius) {
      obj.vx *= obj.restitution;
      obj.x = canvas.width - obj.radius;
    }
    if (obj.x < obj.radius) {
      obj.vx *= obj.restitution;
      obj.x = obj.radius;
    }
  }

  document.addEventListener("keydown", function (e) {
    keys[e.which] = true;
  });
  document.addEventListener("keyup", function (e) {
    keys[e.which] = false;
  });

  function detectGrab(player, obj) {
    if (
      player.x < obj.x + obj.w &&
      player.x + player.w > obj.x &&
      player.y < obj.y + obj.h &&
      player.y + player.h > obj.y
    ) {
      player.grabbedItems.push(obj);
      player.fillColor = colors[obj.color];
      itemArr = itemArr.filter(function (item) {
        return obj.id !== item.id;
      });
            grabSound.play();
            if (obj.color === "red") {cowSound.play()}
            if (obj.color === "yellow") {sheepSound.play()}
    }
  }

  function detectCollision(obj, obj2) {
    if (
      obj.x < obj2.x + obj2.w &&
      obj.x + obj.w > obj2.x &&
      obj.y < obj2.y + obj2.h &&
      obj.y + obj.h > obj2.y
    ) {
      obj.vy *= -1;
      obj.vx *= -1;
    }
  }

  let poppedObj = {
    x: null,
    y: null,
    w: 20,
    h: 20,
    vx: 0,
    vy: 0,
    ax: 0,
    ay: 0,
    r: -1.55,
    mass: 0.1,
    radius: 15,
    restitution: -0.7,
    color: null,
    points: null,
    id: null,
    colorArray: null,
    fillstyle: null,
    fillRect: null,
    draw: function () {
      ctx.fillRect(this.x, this.y, this.w, this.h);
    },
  };

  function dropObject() {
    if (spaceship.grabbedItems.length > 0) {
      let obj = spaceship.grabbedItems.pop();
      poppedObj.x = spaceship.x;
      poppedObj.y = spaceship.y + 20;
      poppedObj.color = obj.color;

      if (spaceship.grabbedItems.length < 1) {
        spaceship.fillColor = null
      } else 
      {spaceship.fillColor = colors[spaceship.grabbedItems[spaceship.grabbedItems.length-1].color];}

      droppedArr.push({ ...poppedObj });
    }
  }

  function animloop() {
    game = window.requestAnimationFrame(animloop, canvas);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "white";
    ctx.font = "24px sans-serif";
    ctx.fillText("Time: " + time, 70, 30);
    ctx.fillStyle = "white";
    ctx.font = "24px sans-serif";
    ctx.fillText(`Score: ${spaceship.score}`, 70, 60);

    if (keys[37]) spaceship.r -= 0.05;
    if (keys[39]) spaceship.r += 0.05;

    if (keys[38]) {
      spaceship.ax = Math.cos(spaceship.r) * 0.05;
      spaceship.ay = Math.sin(spaceship.r) * 0.05;
      propelShip.play();
    } else {
      spaceship.ax = spaceship.ay = 0;
    }

    if (keys[40]) {
      dropObject();
      beamSound.play();
      keys[40] = null;
    }

    spaceship.draw();
    obstacle.draw();
    slider1.draw();
    slider2.draw();

    if (
      (slider1.x + 100 >= canvas.width / 2 && slider1.sliderSpeed > 0) ||
      (slider1.x <= 0 && slider1.sliderSpeed < 0)
    ) {slider1.sliderSpeed *= -1;}

    slider1.x += slider1.sliderSpeed;

    if (
      (slider2.x + 100 >= canvas.width && slider2.sliderSpeed > 0) ||
      (slider2.x <= canvas.width / 2 && slider2.sliderSpeed < 0)
    ) {slider2.sliderSpeed *= -1;}

    slider2.x += slider2.sliderSpeed;

    for (let i = 0; i < itemArr.length; i++) {
      const item = itemArr[i];
      ctx.fillStyle = colors[itemArr[i].color];
      ctx.beginPath();
      ctx.arc(item.x, item.y, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
     
      if (itemArr[i].color === "red") {
      ctx.drawImage(cow, item.x - 29, item.y - 15, 60, 30);}
      if (itemArr[i].color === "yellow") {
        ctx.drawImage(sheep, item.x - 30, item.y - 15, 60, 30)}

      detectGrab(spaceship, item);
    }

    for (let i = 0; i < droppedArr.length; i++) {
      let droppedObj = droppedArr[i];
      ctx.fillStyle = colors[droppedArr[i].color];
      ctx.beginPath();
      ctx.arc(droppedObj.x, droppedObj.y, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();

      var grd1 = ctx.createLinearGradient(droppedObj.x, droppedObj.y, droppedObj.x-10, droppedObj.y);
      grd1.addColorStop(0, "rgba(250, 250, 250, 0.08)");
      grd1.addColorStop(1, "rgba(250, 250, 250, 0.01)");

      var grd2 = ctx.createLinearGradient(droppedObj.x, droppedObj.y, droppedObj.x+10, droppedObj.y);
      grd2.addColorStop(0, "rgba(250, 250, 250, 0.08)");
      grd2.addColorStop(1, "rgba(250, 250, 250, 0.01)");

      ctx.fillStyle = grd1;
      ctx.fillRect(droppedObj.x-10, droppedObj.y, 10, 700);
      ctx.fillStyle = grd2;
      ctx.fillRect(droppedObj.x, droppedObj.y, 10, 700);

      if (droppedArr[i].color === "red"){
      ctx.drawImage(cow, droppedArr[i].x - 29, droppedArr[i].y - 15, 60, 30)}
      if (droppedArr[i].color === "yellow") {
        ctx.drawImage(sheep, droppedArr[i].x - 30, droppedArr[i].y - 15, 60, 30)}

      detectCollision(droppedObj, obstacle);
      detectCollision(droppedObj, slider1);
      detectCollision(droppedObj, slider2);
      updatePosition(droppedObj);

      if (droppedArr[i].y > canvas.height) {
        spaceship.score += 1;
        droppedArr.splice(i, 1);
      }
    }

    detectCollision(spaceship, obstacle);
    detectCollision(spaceship, slider1);
    detectCollision(spaceship, slider2);
    updatePosition(spaceship);

    if (time === 0) {
      gameOver();
      }
  }



