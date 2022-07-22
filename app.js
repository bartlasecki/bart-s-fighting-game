const display = document.querySelector(".display");
const context = display.getContext("2d");

//screen size

display.width = 1920;
display.height = 1080;

//filling the screen size
context.fillRect(0, 0, display.width, display.height);

//////////////////////////////////////////////////////////////////////

const gravity = 0.7;
// object creation for the fighters, blueprint for the object
// velocity is for movement

///////////////////////////////////////////////////////////////////

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./background hi-res.png",
});

const shop = new Sprite({
  position: {
    x: 1200,
    y: 413,
  },
  imageSrc: "./shop updated.png",
  scale: 1.4,
  framesMax: 6,
});
////////////////////PLAYER 1//////////////////////////////////////

// Creates the red rect as playerOne

const playerOne = new Fighter({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
  imageSrc: "./playerOne/Idle.png",
  framesMax: 8,
  scale: 4,
  offset: {
    x: 215,
    y: 340,
  },
  sprites: {
    idle: {
      imageSrc: "./playerOne/Idle.png",
      framesMax: 8,
    },
    run: {
      imageSrc: "./playerOne/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./playerOne/Jump.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "./playerOne/Fall.png",
      framesMax: 2,
    },
    attack1: {
      imageSrc: "./playerOne/Attack1.png",
      framesMax: 6,
    },
    takeHit: {
      imageSrc: "./playerOne/Take Hit - white silhouette.png",
      framesMax: 4,
    },
    death: {
      imageSrc: "./playerOne/Death.png",
      framesMax: 6,
    },
  },
  attackBox: {
    offset: {
      x: 300,
      y: 0,
    },
    width: 240,
    height: 70,
  },
});

playerOne.drawOutSprite();

//////////////////PLAYER 2///////////////////////////////////////

//creates the red rect as playerTwo

const playerTwo = new Fighter({
  position: {
    x: 1550,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: "red",
  offset: {
    x: -50,
    y: 0,
  },
  imageSrc: "./playerTwo/Idle.png",
  framesMax: 4,
  scale: 4,
  offset: {
    x: 215,
    y: 365,
  },
  sprites: {
    idle: {
      imageSrc: "./playerTwo/Idle.png",
      framesMax: 4,
    },
    run: {
      imageSrc: "./playerTwo/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./playerTwo/Jump.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "./playerTwo/Fall.png",
      framesMax: 2,
    },
    attack1: {
      imageSrc: "./playerTwo/Attack1.png",
      framesMax: 4,
    },
    takeHit: {
      imageSrc: "./playerTwo/Take hit.png",
      framesMax: 3,
    },
    death: {
      imageSrc: "./playerTwo/Death.png",
      framesMax: 7,
    },
  },
  attackBox: {
    offset: {
      x: -150,
      y: 0,
    },
    width: 220,
    height: 70,
  },
});

playerTwo.drawOutSprite();

////////////////////////////////////////////////////////////////////

//creating an animation loop in order for the players to fall down(gravity).

//below is an infinite loop.

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
};
let lastKey;

decreaseTimer();

function playerAnimation() {
  window.requestAnimationFrame(playerAnimation);
  context.fillStyle = " black";
  context.fillRect(0, 0, display.width, display.height);
  background.update();
  shop.update();
  //context.fillStyle = "rgba(255,255,255,0.1";
  //context.fillRect(0, 0, canvas.width, canvas.height);
  playerOne.update();
  playerTwo.update();

  playerOne.velocity.x = 0;
  playerTwo.velocity.x = 0;

  //playerOne movement

  if (keys.a.pressed && playerOne.lastKey === "a") {
    playerOne.velocity.x = -10;
    playerOne.switchSprite("run");
  } else if (keys.d.pressed && playerOne.lastKey === "d") {
    playerOne.velocity.x = 15;
    playerOne.switchSprite("run");
  } else {
    playerOne.switchSprite("idle");
  }

  //playerOne jumping

  if (playerOne.velocity.y < 0) {
    playerOne.switchSprite("jump");
  } else if (playerOne.velocity.y > 0) {
    playerOne.switchSprite("fall");
  }

  //playerTwo movement
  if (keys.ArrowLeft.pressed && playerTwo.lastKey === "ArrowLeft") {
    playerTwo.velocity.x = -10;
    playerTwo.switchSprite("run");
  } else if (keys.ArrowRight.pressed && playerTwo.lastKey === "ArrowRight") {
    playerTwo.velocity.x = 15;
    playerTwo.switchSprite("run");
  } else {
    playerTwo.switchSprite("idle");
  }

  //playerTwo jumping

  if (playerTwo.velocity.y < 0) {
    playerTwo.switchSprite("jump");
  } else if (playerTwo.velocity.y > 0) {
    playerTwo.switchSprite("fall");
  }

  //collision code & playertwo gets hit
  if (
    rectangularCollision({
      rectangle1: playerOne,
      rectangle2: playerTwo,
    }) &&
    playerOne.isAttacking &&
    playerOne.framesCurrent === 4
  ) {
    playerTwo.takeHit();
    playerOne.isAttacking = false;
    //playerTwo.health -= 20;
    document.querySelector(".playerTwo-box").style.width =
      playerTwo.health + "%";
    console.log("player one attacked");
  }

  // if misses attack
  if (playerOne.isAttacking && playerOne.framesCurrent === 4) {
    playerOne.isAttacking = false;
  }
  if (
    rectangularCollision({
      rectangle1: playerTwo,
      rectangle2: playerOne,
    }) &&
    playerTwo.isAttacking &&
    playerTwo.framesCurrent === 2
  ) {
    playerOne.takeHit();
    playerTwo.isAttacking = false;
    console.log("player two attacked");
    //playerOne.health -= 10;
    document.querySelector(".playerOne-box").style.width =
      playerOne.health + "%";
  }
  // if misses attack
  if (playerTwo.isAttacking && playerTwo.framesCurrent === 2) {
    playerTwo.isAttacking = false;
  }

  //who wins based on health
  if (playerTwo.health <= 0 || playerOne.health <= 0) {
    determineWinner({ playerOne, playerTwo, timerId });
  }
}

playerAnimation();

// eventlisteners left-right movement

window.addEventListener("keydown", (event) => {
  if (!playerOne.dead) {
    switch (event.key) {
      //playerOne Keys
      case "d":
        keys.d.pressed = true;
        playerOne.lastKey = "d";
        break;
      case "a":
        keys.a.pressed = true;
        playerOne.lastKey = "a";
        break;
      case "w":
        playerOne.velocity.y = -20;
        break;
      case " ":
        playerOne.attack();
        break;
    }
  }

  if (!playerTwo.dead) {
    //playerTwo Keys
    switch (event.key) {
      case "ArrowRight":
        keys.ArrowRight.pressed = true;
        playerTwo.lastKey = "ArrowRight";
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        playerTwo.lastKey = "ArrowLeft";
        break;
      case "ArrowUp":
        playerTwo.velocity.y = -20;
        break;
      case "ArrowDown":
        playerTwo.attack();
        break;
    }
  }
});
window.addEventListener("keyup", (event) => {
  switch (event.key) {
    //playerOne
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    //playerTwo
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
  }
});
