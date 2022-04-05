window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };



  // class Obstacle {
  //   constructor() {
  //     this.x = Math.random() * 400;
  //     this.y = 0;
  //     this.w = Math.random() * 300;
  //     this.h = 20;
  //   }
  // }

  // let obstacleArr = [];

  // function addObstacle() {
  //   obstacleArr.push(new Obstacle());
  //   // player.score++;
  //   console.log(player.score);
  // }

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 1200;
  canvas.height = 650;
  const h = canvas.height;
  const w = canvas.width;

  const ship = new Image();
  ship.src = "/images/alien-spaceship.png";
  ship.onload = function () {
    ctx.drawImage(ship, player.x, player.y, player.w, player.h);
  };

  //This variable is the reference for how we stop adding blocks to the array when the game ends
  let int;

  //This gets called when the "StartGame" button is pressed
  function startGame() {
    int = setInterval(addItem, 2000);
    animloop();
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

  // function gameOver() {
  //   window.cancelAnimationFrame(game);
  //   clearInterval(int);
  //   ctx.fillStyle = "black";
  //   ctx.fillRect(0, 0, w, h);
  //   ctx.fillStyle = "red";
  //   ctx.font = "50px sans-serif";
  //   ctx.fillText("GAME OVER", 100, 100);
  //   ctx.fillStyle = "white";
  //   ctx.font = "40px sans-serif";
  //   ctx.fillText(`Final Score: ${player.score}`, 100, 300);
  // }



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
    constructor(id){
      this.x = Math.random()*canvas.width;
      this.y = Math.random()*canvas.height/2;
      this.w = 20;
      this.h = 20;
      this.color = this.generateColor();
      this.points = this.generatePoints();
      this.id = id;
      this.colorArray = []
      this.fillstyle,
      this.fillRect
    }
    
    generateColor = () => {

      let col = '';
        if (this.x > canvas.width/2) {
          col = "red"
        } else {
          col = "yellow"
        }

      return col

      // let colorArr = ['red', 'blue']
      // let x = Math.floor(Math.random()*colorArr.length)
      // return colorArr[x]
    }
    
    generatePoints = () => {
      return Math.floor(Math.random()*5)+1
    }
    
  }


  
  
  //Add Items to array
  
  let itemArr = []
  let itemsCreated = 0
  
  // const itemInterval = setInterval(addItem, 2000);

  function addItem(){
 

    itemArr.push(new Item(itemsCreated++))


  }

  let colors = {
    yellow: "rgba(250, 250, 210, 0.3)",
    red: "rgba(240, 128, 128, 0.3)"
  }


  const shipImage = new Image()
  shipImage.src = "/images/alien-spaceship.png"

  var spaceship = {
    x: w / 2, y: h / 2,
    vx: 0, vy: 0,
    ax: 0, ay: 0,
    r: -1.55,
    mass: 0.1,
    radius: 15,
    restitution: -0.7,
    fillColor : 'white',
    draw: function(){
      ctx.fillStyle = "rgba(250, 250, 210, 0.3)"
      ctx.beginPath();
      ctx.arc(this.x, this.y, 60, 0, Math.PI*2)
      ctx.fill();
      ctx.closePath()
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.r);
      ctx.drawImage(shipImage, -30, -60, 60, 120)
      ctx.restore();
  
    }
  };
  
  var frameRate = 1/40; 
  var frameDelay = frameRate * 1000; 
  
  var Cd = 0.47;  
  var rho = 1.22; 
  var A = Math.PI * spaceship.radius * spaceship.radius / (10000); 
  var ag = 1.2;  
  var friction = 0.01;
  
  function updatePosition(obj){
  
    obj.vx += obj.ax;
    obj.vy += obj.ay;
    
    var Fx = -0.5 * Cd * A * rho * obj.vx * obj.vx * obj.vx / Math.abs(obj.vx);
    var Fy = -0.5 * Cd * A * rho * obj.vy * obj.vy * obj.vy / Math.abs(obj.vy);
    
    Fx = (isNaN(Fx) ? 0 : Fx);
    Fy = (isNaN(Fy) ? 0 : Fy);
    
    var ax = Fx / obj.mass;
    var ay = ag + (Fy / obj.mass);

    obj.vx += ax*frameRate;
    obj.vy += ay*frameRate;
    
    obj.x += obj.vx*frameRate*100;
    obj.y += obj.vy*frameRate*100;
    
    if (obj.y > canvas.height - obj.radius) {
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
  document.addEventListener('keydown', function(e){
    keys[e.which] = true;
  });
  document.addEventListener('keyup', function(e){
    keys[e.which] = false;
  });
  
  function animloop(){
    requestAnimationFrame(animloop, canvas);
    ctx.clearRect(0, 0, w, h);
    
    //rotation
    if(keys[37]) spaceship.r -= 0.05;
    if(keys[39]) spaceship.r += 0.05;
    
    //thrust
    if(keys[38]){
      spaceship.ax = Math.cos(spaceship.r) * 0.05;
      spaceship.ay = Math.sin(spaceship.r) * 0.05;
    }else{
      spaceship.ax = spaceship.ay = 0;
    }



    updatePosition(spaceship);
    spaceship.draw();

    
      for(let i = 0; i< itemArr.length; i++){
     
      const item = itemArr[i]
      ctx.fillStyle = itemArr[i].color;
      ctx.fillRect(item.x, item.y, item.w, item.h)

  };



 }

}
