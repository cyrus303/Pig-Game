'use strict';

// Selecting elements
const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');

const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const current0Element = document.querySelector('#current--0');
const current1Element = document.querySelector('#current--1');

const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

score0Element.textContent = 0;
score1Element.textContent = 0;

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

//hide the dice in the beginning
// diceElement.style.display = 'none'; //inl;ine styles

diceElement.classList.add('hidden'); //class method

//roling dice functionality
btnRoll.addEventListener('click', () => {
  if (playing) {
    //1. generating random dice roll
    const diceRoll = Math.trunc(Math.random() * 6) + 1;

    //2.display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${diceRoll}.png`;

    //3.check for rolled 1 if true switch player
    if (diceRoll !== 1) {
      //add dice to current score
      currentScore = currentScore + diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      document.getElementById(`current--${activePlayer}`).textContent = 0;

      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    //1. add current score to active player's score

    scores[activePlayer] += currentScore;
    //   scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    //2. check if the player's scpre is >=100
    //if it is end game
    if (scores[activePlayer] >= 100) {
      //end game
      playing = false;
      diceElement.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }

    //3. if not switch to the next player
  }
});

const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

btnNew.addEventListener('click', () => {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  player0Element.classList.add('player--active');

  score0Element.textContent = 0;
  score1Element.textContent = 0;

  activePlayer = 0;
  playing = true;
  scores = [0, 0];
  currentScore = 0;
});
