function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}

function determineWinner({ playerOne, playerTwo, timerId }) {
  clearTimeout(timerId);
  document.querySelector(".result-tie").style.display = "flex";
  if (playerOne.health === playerTwo.health) {
    document.querySelector(".result-tie").innerHTML = "Tie!";
  } else if (playerOne.health > playerTwo.health) {
    document.querySelector(".result-tie").innerHTML = "Player 1 Wins!";
  } else if (playerTwo.health > playerOne.health) {
    document.querySelector(".result-tie").innerHTML = "Player 2 Wins!";
  }
}

let timer = 60;
let timerId;
function decreaseTimer() {
  timerId = setTimeout(decreaseTimer, 1000);
  if (timer > 0) {
    timer--;
    document.querySelector(".timer").innerHTML = timer;
  }
  if (timer == 0) {
    determineWinner({ playerOne, playerTwo });
  }
}
