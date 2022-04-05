window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  const player = {
    x: 550,
    y: 550,
    w: 120,
    h: 80,
    score: 0,
  };

  class Obstacle {
    constructor() {
      this.x = Math.random() * 400;
      this.y = 0;
      this.w = Math.random() * 300;
      this.h = 20;
    }
  }

  let obstacleArr = [];

  function addObstacle() {
    obstacleArr.push(new Obstacle());
    // player.score++;
    console.log(player.score);
  }

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 1200;
  canvas.height = 650;
  const h = canvas.height;
  const w = canvas.width;

  const car = new Image();
  car.src = "/images/alien-spaceship.png";
  car.onload = function () {
    ctx.drawImage(car, player.x, player.y, player.w, player.h);
  };

  //This variable is the reference for how we stop adding blocks to the array when the game ends
  let int;

  //This gets called when the "StartGame" button is pressed
  function startGame() {
    int = setInterval(addObstacle, 1700);
    animate();
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

  // function move(e) {
  //   switch (e.key) {
  //     case "ArrowLeft":
  //       if (player.x - 10 < 0) {
  //         player.x = 0;
  //       } else {
  //         player.x -= 15;
  //       }
  //       break;
  //     case "ArrowRight":
  //       if (player.x + player.w + 10 > w) {
  //         player.x = w - player.w;
  //       } else {
  //         player.x += 15;
  //       }
  //       break;
  //   }
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
      this.y = Math.random()*canvas.height;
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
      let colorArr = ['red', 'blue', 'green', 'yellow', 'purple']
      let x = Math.floor(Math.random()*colorArr.length)
      return colorArr[x]
    }
    
    generatePoints = () => {
      return Math.floor(Math.random()*5)+1
    }
    
  }

  // var spaceship = {
  //   x: w / 2, y: h / 2,
  //   vx: 0, vy: 0,
  //   ax: 0, ay: 0,
  //   r: -1.55,
  //   mass: 0.1,
  //   radius: 15,
  //   restitution: -0.7,
  //   draw: function(){
  //     ctx.save();
  //     ctx.translate(this.x, this.y);
  //     ctx.rotate(this.r);
  //     ctx.drawImage(shipImage, -30, -60, 60, 120)
  //     // ctx.fillStyle = 'white';
  //     // ctx.fillRect(-10, -5, 20, 10);
  //     ctx.restore();
  //   }
  // };
  
  
  //Add Items to array
  
  let itemArr = []
  let itemsCreated = 0
  
  function addItem(){
    itemArr.push(new Item(itemsCreated))
    itemsCreated++

      for(let i = 0; i< itemArr.length; i++){
      const item = itemArr[i]
      ctx.fillStyle = itemArr[i].color;
      ctx.fillRect(item.x, item.y, item.w, item.h)

  }

  const itemInterval = setInterval(addItem, 2000);

}
  
  // const itemInterval = setInterval(addItem, 2000);

// addItem(Item);





  //   for(let i = 0; i< itemArr.length; i++){
  //     const item = itemArr[i]
  //     ctx.fillStyle = itemArr[i].color;
  //     ctx.fillRect(item.x, item.y, item.w, item.h)
  







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
    draw: function(){
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.r);
      ctx.drawImage(shipImage, -30, -60, 60, 120)
      // ctx.fillStyle = 'white';
      // ctx.fillRect(-10, -5, 20, 10);
      ctx.restore();
    }
  };
  
  var frameRate = 1/40; // Seconds
  var frameDelay = frameRate * 1000; // ms
  
  var Cd = 0.47;  // Dimensionless
  var rho = 1.22; // kg / m^3
  var A = Math.PI * spaceship.radius * spaceship.radius / (10000); // m^2
  var ag = 1.2;  // m / s^2
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
  
  (function animloop(){
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


    // ctx.clearRect(0,0, canvas.width, canvas.height)
  
    // ctx.fillStyle = you.color;
    // ctx.fillRect(you.x, you.y , you.w, you.h)


    // for(let i = 0; i< itemArr.length; i++){
    //   const item = itemArr[i]
    //   ctx.fillStyle = itemArr[i].color;
    //   ctx.fillRect(item.x, item.y, item.w, item.h)



    
    //friction is applied inside the updatePosition function
    updatePosition(spaceship);
    spaceship.draw();



    // addItem(Item);
  })();
};


























// var spaceship = {
// 	x: w / 2, y: h / 2,
// 	vx: 0, vy: 0,
// 	ax: 0, ay: 0,
// 	r: 0,
//   mass: 0.1,
//   radius: 15,
//   restitution: -0.7,
//   draw: function(){
// 		ctx.save();
// 		ctx.translate(this.x, this.y);
// 		ctx.rotate(this.r);
// 		ctx.fillStyle = 'white';
// 		ctx.fillRect(-10, -5, 20, 10);
// 		ctx.restore();
// 	}
// };

// var frameRate = 1/40; // Seconds
// var frameDelay = frameRate * 1000; // ms

// var Cd = 0.47;  // Dimensionless
// var rho = 1.22; // kg / m^3
// var A = Math.PI * spaceship.radius * spaceship.radius / (10000); // m^2
// var ag = 1.2;  // m / s^2
// var friction = 0.01;

// function updatePosition(obj){

//   // applyGravity(obj);
// 	// //update velocity
// 	obj.vx += obj.ax;
// 	obj.vy += obj.ay;
	
// 	// applyFriction(obj);
//   var Fx = -0.5 * Cd * A * rho * obj.vx * obj.vx * obj.vx / Math.abs(obj.vx);
//   var Fy = -0.5 * Cd * A * rho * obj.vy * obj.vy * obj.vy / Math.abs(obj.vy);
  
//   Fx = (isNaN(Fx) ? 0 : Fx);
//   Fy = (isNaN(Fy) ? 0 : Fy);
  
//       // Calculate acceleration ( F = ma )
//   var ax = Fx / obj.mass;
//   var ay = ag + (Fy / obj.mass);
//       // Integrate to get velocity
//   obj.vx += ax*frameRate;
//   obj.vy += ay*frameRate;
  
//   //     // Integrate to get position
//   // ball.position.x += ball.velocity.x*frameRate*100;
//   // ball.position.y += ball.velocity.y*frameRate*100;
	
// 	//update position
// 	obj.x += obj.vx*frameRate*100;
// 	obj.y += obj.vy*frameRate*100;
  
//   if (obj.y > canvas.height - obj.radius) {
//         obj.vy *= obj.restitution;
//         obj.y = canvas.height - obj.radius;
//     }
// }

// var keys = [];
// document.addEventListener('keydown', function(e){
// 	keys[e.which] = true;
// });
// document.addEventListener('keyup', function(e){
// 	keys[e.which] = false;
// });

// (function animloop(){
// 	requestAnimationFrame(animloop, canvas);
// 	ctx.clearRect(0, 0, w, h);
	
// 	//rotation
// 	if(keys[37]) spaceship.r -= 0.05;
// 	if(keys[39]) spaceship.r += 0.05;
	
// 	//thrust
// 	if(keys[38]){
// 		spaceship.ax = Math.cos(spaceship.r) * 0.05;
// 		spaceship.ay = Math.sin(spaceship.r) * 0.05;
// 	}else{
// 		spaceship.ax = spaceship.ay = 0;
// 	}
	
// 	//friction is applied inside the updatePosition function
// 	updatePosition(spaceship);
// 	spaceship.draw();
// })();













// var width = 500;
// var height = 400;
// var canvas = ctx = false;
// var frameRate = 1/40; // Seconds
// var frameDelay = frameRate * 1000; // ms
// var loopTimer = false;

// /*
//  * Experiment with values of mass, radius, restitution,
//  * gravity (ag), and density (rho)!
//  * 
//  * Changing the constants literally changes the environment
//  * the ball is in. 
//  * 
//  * Some settings to try:
//  * the moon: ag = 1.6
//  * water: rho = 1000, mass 5
//  * beach ball: mass 0.05, radius 30
//  * lead ball: mass 10, restitution -0.05
//  */
// var ball = {
//     position: {x: width/2, y: 0},
//     velocity: {x: 10, y: 0},
//     mass: 0.1, //kg
//     radius: 15, // 1px = 1cm
//     restitution: -0.7
//     };

// var Cd = 0.47;  // Dimensionless
// var rho = 1.22; // kg / m^3
// var A = Math.PI * ball.radius * ball.radius / (10000); // m^2
// var ag = 9.81;  // m / s^2
// // var mouse = {x: 0, y: 0, isDown: false};

// // function getMousePosition(e) {
// //     mouse.x = e.pageX - canvas.offsetLeft;
// //     mouse.y = e.pageY - canvas.offsetTop;
// // }
// // var mouseDown = function(e) {
// //     if (e.which == 1) {
// //         getMousePosition(e);
// //         mouse.isDown = true;
// //         ball.position.x = mouse.x;
// //         ball.position.y = mouse.y;
// //     }
// // }
// // var mouseUp = function(e) { 
// //     if (e.which == 1) {
// //         mouse.isDown = false;
// //         ball.velocity.y = (ball.position.y - mouse.y) /10;
// //         ball.velocity.x = (ball.position.x - mouse.x) / 10;
// //     }
// // }

// var setup = function() {
//     canvas = document.getElementById("canvas");
//     ctx = canvas.getContext("2d");
    
//     canvas.onmousemove = getMousePosition;
//     canvas.onmousedown = mouseDown;
//     canvas.onmouseup = mouseUp;
    
//     ctx.fillStyle = 'red';
//     ctx.strokeStyle = '#000000';
//     loopTimer = setInterval(loop, frameDelay);

// }

















// function updatePosition(obj){

//   // applyGravity(obj);
// 	// //update velocity
// 	obj.vx += obj.ax;
// 	obj.vy += obj.ay;
	
// 	// applyFriction(obj);
//   var Fx = -0.5 * Cd * A * rho * obj.vx * obj.vx * obj.vx / Math.abs(obj.vx);
//   var Fy = -0.5 * Cd * A * rho * obj.vy * obj.vy * obj.vy / Math.abs(obj.vy);
  
//   Fx = (isNaN(Fx) ? 0 : Fx);
//   Fy = (isNaN(Fy) ? 0 : Fy);
  
//       // Calculate acceleration ( F = ma )
//   var ax = Fx / ball.mass;
//   var ay = ag + (Fy / ball.mass);
//       // Integrate to get velocity
//   obj.vx += ax*frameRate;
//   obj.vy += ay*frameRate;
  
//   //     // Integrate to get position
//   // ball.position.x += ball.velocity.x*frameRate*100;
//   // ball.position.y += ball.velocity.y*frameRate*100;
	
// 	//update position
// 	obj.x += obj.vx*frameRate*100;
// 	obj.y += obj.vy*frameRate*100;
// }



// var loop = function() {
//     if ( ! mouse.isDown) {
//         // Do physics
//             // Drag force: Fd = -1/2 * Cd * A * rho * v * v
//         var Fx = -0.5 * Cd * A * rho * ball.velocity.x * ball.velocity.x * ball.velocity.x / Math.abs(ball.velocity.x);
//         var Fy = -0.5 * Cd * A * rho * ball.velocity.y * ball.velocity.y * ball.velocity.y / Math.abs(ball.velocity.y);
        
//         Fx = (isNaN(Fx) ? 0 : Fx);
//         Fy = (isNaN(Fy) ? 0 : Fy);
        
//             // Calculate acceleration ( F = ma )
//         var ax = Fx / ball.mass;
//         var ay = ag + (Fy / ball.mass);
//             // Integrate to get velocity
//         obj.vx += ax*frameRate;
//         obj.vy += ay*frameRate;
        
//             // Integrate to get position
//         ball.position.x += ball.velocity.x*frameRate*100;
//         ball.position.y += ball.velocity.y*frameRate*100;
//     }
//     // Handle collisions
//     if (ball.position.y > height - ball.radius) {
//         ball.velocity.y *= ball.restitution;
//         ball.position.y = height - ball.radius;
//     }
//     if (ball.position.x > width - ball.radius) {
//         ball.velocity.x *= ball.restitution;
//         ball.position.x = width - ball.radius;
//     }
//     if (ball.position.x < ball.radius) {
//         ball.velocity.x *= ball.restitution;
//         ball.position.x = ball.radius;
//     }
//     // Draw the ball
//     (function animloop(){
//       requestAnimationFrame(animloop, canvas);
//       ctx.clearRect(0, 0, w, h);
      
//       //rotation
//       if(keys[37]) spaceship.r -= 0.05;
//       if(keys[39]) spaceship.r += 0.05;
      
//       //thrust
//       if(keys[38]){
//         spaceship.ax = Math.cos(spaceship.r) * 0.05;
//         spaceship.ay = Math.sin(spaceship.r) * 0.05;
//       }else{
//         spaceship.ax = spaceship.ay = 0;
//       }
      
//       //friction is applied inside the updatePosition function
//       updatePosition(spaceship);
//       spaceship.draw();
    
//     // ctx.clearRect(0,0,width,height);
    
//     // ctx.save();
    
//     // ctx.translate(ball.position.x, ball.position.y);
//     // ctx.beginPath();
//     // ctx.arc(0, 0, ball.radius, 0, Math.PI*2, true);
//     // ctx.fill();
//     // ctx.closePath();
    
//     // ctx.restore();



//     // Draw the slingshot
//     // if (mouse.isDown) {
//     //     ctx.beginPath();
//     //     ctx.moveTo(ball.position.x, ball.position.y);
//     //     ctx.lineTo(mouse.x, mouse.y);
//     //     ctx.stroke();
//     //     ctx.closePath();
//     // }
    
// }
//     // setup();











// // fG = -9.8
// // vFromG = 0
// // function gravity(obj) {
// //   vFromG += fG
// //   if (this.y = 0) {
// //     vFromG = 0
// //   }
// // }











// var canvas = document.getElementById('canvas'),
// ctx = canvas.getContext('2d'),
// w = window.innerWidth,
// h = window.innerHeight;
// canvas.width = w;
// canvas.height = h;
// window.onresize = function(){
// 	canvas.width = w = window.innerWidth;
// 	canvas.height = h = window.innerHeight;
// }

// var spaceship = {
// 	x: w / 2, y: h / 2,
// 	vx: 0, vy: 0,
// 	ax: 0, ay: 0,
// 	r: 0,
//   mass: 0.1,
//   radius: 15,
//   restitution: -0.7,
//   draw: function(){
// 		ctx.save();
// 		ctx.translate(this.x, this.y);
// 		ctx.rotate(this.r);
// 		ctx.fillStyle = 'white';
// 		ctx.fillRect(-10, -5, 20, 10);
// 		ctx.restore();
// 	}
// };

// var Cd = 0.47;  // Dimensionless
// var rho = 1.22; // kg / m^3
// var A = Math.PI * spaceship.radius * spaceship.radius / (10000); // m^2
// var ag = 9.81;  // m / s^2
// var friction = 0.01;

// function updatePosition(obj){

//   // applyGravity(obj);
// 	// //update velocity
// 	obj.vx += obj.ax;
// 	obj.vy += obj.ay;
	
// 	// applyFriction(obj);
//   var Fx = -0.5 * Cd * A * rho * obj.vx * obj.vx * obj.vx / Math.abs(obj.vx);
//   var Fy = -0.5 * Cd * A * rho * obj.vy * obj.vy * obj.vy / Math.abs(obj.vy);
  
//   Fx = (isNaN(Fx) ? 0 : Fx);
//   Fy = (isNaN(Fy) ? 0 : Fy);
  
//       // Calculate acceleration ( F = ma )
//   var ax = Fx / obj.mass;
//   var ay = ag + (Fy / obj.mass);
//       // Integrate to get velocity
//   obj.vx += ax*frameRate;
//   obj.vy += ay*frameRate;
  
//   //     // Integrate to get position
//   // ball.position.x += ball.velocity.x*frameRate*100;
//   // ball.position.y += ball.velocity.y*frameRate*100;
	
// 	//update position
// 	obj.x += obj.vx*frameRate*100;
// 	obj.y += obj.vy*frameRate*100;
// }

// var keys = [];
// document.addEventListener('keydown', function(e){
// 	keys[e.which] = true;
// });
// document.addEventListener('keyup', function(e){
// 	keys[e.which] = false;
// });

// (function animloop(){
// 	requestAnimationFrame(animloop, canvas);
// 	ctx.clearRect(0, 0, w, h);
	
// 	//rotation
// 	if(keys[37]) spaceship.r -= 0.05;
// 	if(keys[39]) spaceship.r += 0.05;
	
// 	//thrust
// 	if(keys[38]){
// 		spaceship.ax = Math.cos(spaceship.r) * 0.05;
// 		spaceship.ay = Math.sin(spaceship.r) * 0.05;
// 	}else{
// 		spaceship.ax = spaceship.ay = 0;
// 	}
	
// 	//friction is applied inside the updatePosition function
// 	updatePosition(spaceship);
// 	spaceship.draw();
// })();














// // var ball = {
// //   position: {x: width/2, y: 0},
// //   velocity: {x: 10, y: 0},
// //   mass: 0.1, //kg
// //   radius: 15, // 1px = 1cm
// //   restitution: -0.7
// //   };

// // var Cd = 0.47;  // Dimensionless
// // var rho = 1.22; // kg / m^3
// // var A = Math.PI * spaceship.radius * spaceship.radius / (10000); // m^2
// // var ag = 9.81;  // m / s^2

// // var friction = 0.01;

// // fG = -9.8
// // // vFromG = 0
// // function applyGravity(obj) {
// //   vFromG += fG
// //   if (this.y = 0) {
// //     vFromG = 0
// //   }
// // }


// function updatePosition(obj){

//   // applyGravity(obj);
// 	// //update velocity
// 	obj.vx += obj.ax;
// 	obj.vy += obj.ay;
	
// 	applyFriction(obj);
	
// 	//update position
// 	obj.x += obj.vx;
// 	obj.y += obj.vy;
// }

// //user interactivity

// var keys = [];
// document.addEventListener('keydown', function(e){
// 	keys[e.which] = true;
// });
// document.addEventListener('keyup', function(e){
// 	keys[e.which] = false;
// });

// function applyFriction(obj){
// 	var speed = Math.sqrt(obj.vx * obj.vx + obj.vy * obj.vy),
// 		angle = Math.atan2(obj.vy, obj.vx);
// 	if(speed > friction){
// 		speed -= friction;
// 	}else{
// 		speed = 0;
// 	}
// 	obj.vx = Math.cos(angle) * speed;
// 	obj.vy = Math.sin(angle) * speed;
// }

// (function animloop(){
// 	requestAnimationFrame(animloop, canvas);
// 	ctx.clearRect(0, 0, w, h);
	
// 	//rotation
// 	if(keys[37]) spaceship.r -= 0.05;
// 	if(keys[39]) spaceship.r += 0.05;
	
// 	//thrust
// 	if(keys[38]){
// 		spaceship.ax = Math.cos(spaceship.r) * 0.05;
// 		spaceship.ay = Math.sin(spaceship.r) * 0.05;
// 	}else{
// 		spaceship.ax = spaceship.ay = 0;
// 	}
	
// 	//friction is applied inside the updatePosition function
// 	updatePosition(spaceship);
// 	spaceship.draw();
// })();



























// var spaceship = {
// 	x: w / 2, y: h / 2,
// 	vx: 0, vy: 0,
// 	ax: 0, ay: 0,
// 	r: 0,
// 	draw: function(){
// 		ctx.save();
// 		ctx.translate(this.x, this.y);
// 		ctx.rotate(this.r);
// 		ctx.fillStyle = 'white';
// 		ctx.fillRect(-10, -5, 20, 10);
// 		ctx.restore();
// 	}
// };

// var friction = 0.01;

// function updatePosition(obj){
// 	//update velocity
// 	obj.vx += obj.ax;
// 	obj.vy += obj.ay;
	
// 	applyFriction(obj);

//   applyGravity(obj);
	
// 	//update position
// 	obj.x += obj.vx;
// 	obj.y += obj.vy;
// }

// function applyFriction(obj){
// 	var speed = Math.sqrt(obj.vx * obj.vx + obj.vy * obj.vy),
// 		angle = Math.atan2(obj.vy, obj.vx);
// 	if(speed > friction){
// 		speed -= friction;
// 	}else{
// 		speed = 0;
// 	}
// 	obj.vx = Math.cos(angle) * speed;
// 	obj.vy = Math.sin(angle) * speed;
// }

// function applyGravity(obj) {

// }

// (function animloop(){
// 	requestAnimationFrame(animloop, canvas);
// 	ctx.clearRect(0, 0, w, h);
	
// 	//rotation
// 	if(keys[37]) spaceship.r -= 0.05;
// 	if(keys[39]) spaceship.r += 0.05;
	
// 	//thrust
// 	if(keys[38]){
// 		spaceship.ax = Math.cos(spaceship.r) * 0.05;
// 		spaceship.ay = Math.sin(spaceship.r) * 0.05;
// 	}else{
// 		spaceship.ax = spaceship.ay = 0;
// 	}







// var Fx = -0.5 * Cd * A * rho * ball.velocity.x * ball.velocity.x * ball.velocity.x / Math.abs(ball.velocity.x);
// var Fy = -0.5 * Cd * A * rho * ball.velocity.y * ball.velocity.y * ball.velocity.y / Math.abs(ball.velocity.y);

// Fx = (isNaN(Fx) ? 0 : Fx);
// Fy = (isNaN(Fy) ? 0 : Fy);

//     // Calculate acceleration ( F = ma )
// var ax = Fx / ball.mass;
// var ay = ag + (Fy / ball.mass);
//     // Integrate to get velocity
// ball.velocity.x += ax*frameRate;
// ball.velocity.y += ay*frameRate;

//     // Integrate to get position
// ball.position.x += ball.velocity.x*frameRate*100;
// ball.position.y += ball.velocity.y*frameRate*100;



// var ball = {
//   position: {x: width/2, y: 0},
//   velocity: {x: 10, y: 0},
//   mass: 0.1, //kg
//   radius: 15, // 1px = 1cm
//   restitution: -0.7
//   };

// var Cd = 0.47;  // Dimensionless
// var rho = 1.22; // kg / m^3
// var A = Math.PI * ball.radius * ball.radius / (10000); // m^2
// var ag = 9.81;  // m / s^2
// var mouse = {x: 0, y: 0, isDown: false};