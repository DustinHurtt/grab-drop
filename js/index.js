window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 1200;
  canvas.height = 650;
  const h = canvas.height;
  const w = canvas.width;

  //This variable is the reference for how we stop adding blocks to the array when the game ends
  let int;
  let gameOn = false;

  //This gets called when the "StartGame" button is pressed
  function startGame() {
    if (gameOn === false) {
      int = setInterval(addItem, 2000);
      animloop();
      gameOn = true;
    }
  }

  //This variable is the reference to the animation loop. This is called to cease animations when the game ends
  let game;

  // function animate() {
  //   game = window.requestAnimationFrame(animate);
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   ctx.fillStyle = "white";
  //   ctx.font = "24px sans-serif";
  //   ctx.fillText(`Score: ${player.score}`, 70, 30);
  //   ctx.drawImage(car, player.x, player.y, player.w, player.h);
  //   //draw obstacle
  //   ctx.fillStyle = "maroon";
  //   for (let i = 0; i < obstacleArr.length; i++) {
  //     ctx.fillRect(
  //       obstacleArr[i].x,
  //       obstacleArr[i].y,
  //       obstacleArr[i].w,
  //       obstacleArr[i].h
  //     );
  //     obstacleArr[i].y += 4;
  //     //this will evaluate to true or false
  //     let didCollide = detectCollision(player, obstacleArr[i]);
  //     if (didCollide) {
  //       gameOver();
  //       break;
  //     }
  //   }
  //   player.score++;
  // }

  function gameOver() {
    window.cancelAnimationFrame(game);
    clearInterval(int);
    spaceship.score -= droppedArr.length
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "red";
    ctx.font = "50px sans-serif";
    ctx.fillText("GAME OVER", 100, 100);
    ctx.fillStyle = "white";
    ctx.font = "40px sans-serif";
    ctx.fillText(`Final Score: ${player.score}`, 100, 300);
    gameOn = false
  }

  // document.addEventListener("keydown", move);

  // function detectCollision(player, obj) {
  //   if (
  //     player.x < obj.x + obj.w &&
  //     player.x + player.w > obj.x &&
  //     player.y < obj.y + obj.h &&
  //     player.y + player.h > obj.y
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  class Item {
    constructor(id) {
      this.x = Math.random() * canvas.width;
      this.y = (Math.random() * canvas.height) / 2;
      this.w = 20;
      this.h = 20;
      this.color = this.generateColor();
      this.points = this.generatePoints();
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

    generatePoints = () => {
      return Math.floor(Math.random() * 5) + 1;
    };
  }

  let itemArr = [];
  let itemsCreated = 0;

  function addItem() {
    itemArr.push(new Item(itemsCreated++));
  }

  let colors = {
    yellow: "rgba(250, 250, 210, 0.3)",
    red: "rgba(240, 128, 128, 0.3)",
  };

  // let poppedObj = {

  // }

  let obstacle = {
    x: canvas.width / 2 - 10,
    y: (canvas.height * 2) / 3,
    w: 20,
    h: 217,
    // fillColor : 'black',
    draw: function () {
      ctx.fillStyle = "black";
      ctx.fillRect(this.x, this.y, this.w, this.h);
    },
  };

  let slider1 = {
    x: 0,
    y: 640,
    w: 100,
    h: 20,
    sliderSpeed: 6,
    draw: function () {
      ctx.fillStyle = "black";
      ctx.fillRect(this.x, this.y, this.w, this.h);
    },
  };

  let slider2 = {
    x: canvas.width - 100,
    y: 640,
    w: 100,
    h: 20,
    sliderSpeed: -6,
    draw: function () {
      ctx.fillStyle = "black";
      ctx.fillRect(this.x, this.y, this.w, this.h);
    },
  };

  const shipImage = new Image();
  shipImage.src = "images/alien-spaceship.png";

  var spaceship = {
    x: w / 2,
    y: h / 2,
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
      ctx.fillStyle = spaceship.fillColor || "rgba(250, 250, 210, 0.3)";
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
      // spaceship.score +=1;
    } else if (
      obj.y > canvas.height - obj.radius &&
      obj.color === "yellow" &&
      obj.x > canvas.width / 2
    ) {
      obj.vy = obj.vy;
      // spaceship.score +=1;
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

  var keys = [];
  document.addEventListener("keydown", function (e) {
    keys[e.which] = true;
  });
  document.addEventListener("keyup", function (e) {
    keys[e.which] = false;
  });

  // let poppedObj = arr.pop()

  function detectGrab(player, obj) {
    if (
      player.x < obj.x + obj.w &&
      player.x + player.w > obj.x &&
      player.y < obj.y + obj.h &&
      player.y + player.h > obj.y
    ) {
      // you.score+=obj.points;
      // player.grabbedItems.push(obj)
      player.grabbedItems.push(obj);
      player.fillColor = colors[obj.color];
      itemArr = itemArr.filter(function (item) {
        return obj.id !== item.id;
      });
      // player.draw(obj.color);
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

  //   if (obj.y > canvas.height - obj.radius) {
  //     obj.vy *= obj.restitution;
  //     obj.y = canvas.height - obj.radius;
  // }

  // if (obj.x > canvas.width - obj.radius) {
  //     obj.vx *= obj.restitution;
  //     obj.x = canvas.width - obj.radius;
  // }
  // if (obj.x < obj.radius) {
  //     obj.vx *= obj.restitution;
  //     obj.x = obj.radius;
  // }

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

  let droppedArr = [];

  function dropObject() {
    if (spaceship.grabbedItems.length > 0) {
      let obj = spaceship.grabbedItems.pop();
      console.log(obj);
      poppedObj.x = spaceship.x;
      poppedObj.y = spaceship.y + 20;
      poppedObj.color = obj.color;
      // poppedObj.x = this.x;
      // poppedObj.y = this.y +20;
      // poppedObj.draw(spaceship.x, spaceship.y + 20, 20, 20)
      droppedArr.push({ ...poppedObj });

      // poppedObj.draw(spaceship.x, spaceship.y + 20, 20, 20)
      // this.x = spaceship.x;
      // this.y = spaceship.y + 20;
      // this.w = 20;
      // this.h = 20;
      // this.fillColor = "black"
    }
  }

  function animloop() {
    requestAnimationFrame(animloop, canvas);
    ctx.clearRect(0, 0, w, h);

    ctx.fillStyle = "white";
    ctx.font = "24px sans-serif";
    ctx.fillText(`Score: ${spaceship.score}`, 70, 30);

    //rotation
    if (keys[37]) spaceship.r -= 0.05;
    if (keys[39]) spaceship.r += 0.05;

    //thrust
    if (keys[38]) {
      spaceship.ax = Math.cos(spaceship.r) * 0.05;
      spaceship.ay = Math.sin(spaceship.r) * 0.05;
    } else {
      spaceship.ax = spaceship.ay = 0;
    }

    if (keys[40]) {
      dropObject();
      keys[40] = null;
      // poppedObj.x = spaceship.x;
      // poppedObj.y = spaceship.y + 20;
    }

    // updatePosition(spaceship);
    spaceship.draw();

    obstacle.draw();

    slider1.draw();
    slider2.draw();

    // poppedObj.draw();

    // updatePosition(droppedObj)

    //
    // let sliderSpeed = 4;

    if (
      (slider1.x + 100 >= canvas.width / 2 && slider1.sliderSpeed > 0) ||
      (slider1.x <= 0 && slider1.sliderSpeed < 0)
    ) {
      {
        slider1.sliderSpeed *= -1;
      }
    }

    slider1.x += slider1.sliderSpeed;

    if (
      (slider2.x + 100 >= canvas.width && slider2.sliderSpeed > 0) ||
      (slider2.x <= canvas.width / 2 && slider2.sliderSpeed < 0)
    ) {
      slider2.sliderSpeed *= -1;
    }

    slider2.x += slider2.sliderSpeed;

    for (let i = 0; i < itemArr.length; i++) {
      const item = itemArr[i];
      ctx.fillStyle = itemArr[i].color;
      ctx.fillRect(item.x, item.y, item.w, item.h);
      detectGrab(spaceship, item);
    }

    for (let i = 0; i < droppedArr.length; i++) {
      let droppedObj = droppedArr[i];
      ctx.fillStyle = droppedArr[i].color;
      ctx.fillRect(
        droppedArr[i].x,
        droppedArr[i].y,
        droppedObj.w,
        droppedObj.h
      );
      // updatePosition(droppedObj)
      // updatePosition(droppedObj)
      detectCollision(droppedObj, obstacle);
      detectCollision(droppedObj, slider1);
      detectCollision(droppedObj, slider2);
      updatePosition(droppedObj);

      if (droppedArr[i].y > canvas.height) {
        spaceship.score += 1;
        droppedArr.splice(i, 1);

        // droppedArr[i].pop();
      }
      // console.log(droppedArr)
      // droppedArr[i].y++
    }

    // if (droppedObj.y === canvas.height && droppedObj.vy === 0 ) {
    //   score -= 1
    // }

    // updatePosition(poppedObj)

    // console.log(spaceship.grabbedItems)
    detectCollision(spaceship, obstacle);
    detectCollision(spaceship, slider1);
    detectCollision(spaceship, slider2);
    updatePosition(spaceship);
    // detectCollision(poppedObj, obstacle)
    // detectCollision(poppedObj, slider1)
    // detectCollision(poppedObj, slider2)

    // if (droppedArr[i].y > canvas.height) {}
  }
};
