const btn = document.querySelector(".btn");

const scores = [0, 0];
const players = document.querySelectorAll('.player-container');
let currentPlayer = 0;
const diceImage = document.querySelector(".dice-image");
const timeout = 100;

const reset = function () {
  players[currentPlayer].style.backgroundColor = 'slateblue';
  currentPlayer = 0;
  scores.forEach(function (score, index) {
    scores[index] = 0;
    document.querySelector(`.score-player-${index}`).textContent = `Score: 0`;
  });
};

const play = function () {
  btn.setAttribute('disabled', true);
  btn.classList.add('btn-disabled');
  setTimeout(function () {
    if (scores[0] >= 100 || scores[1] >= 100) {
      reset();
    }
    const randomDice = Math.floor(Math.random() * 6) + 1;
    diceImage.setAttribute("src", "images/dice-" + randomDice + ".png");

    if (randomDice % 2 === 1) {
      currentPlayer === 0 ? currentPlayer++ : currentPlayer--;
    } else {
      scores[currentPlayer] += randomDice;
      document.querySelector(
        `.score-player-${currentPlayer}`
      ).textContent = `Score: ${scores[currentPlayer]}`;
    }
    console.log(scores);

    if (scores[currentPlayer] >= 100) {
      players[currentPlayer].style.backgroundColor = 'green';
      btn.classList.remove('btn-disabled');
      btn.removeAttribute('disabled');
      return;
    }

    play();
  }, timeout);
};

btn.addEventListener("click", play);
