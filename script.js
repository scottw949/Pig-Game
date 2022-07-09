'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayerOne = 0;
let playing = true;

//toggle players function
function togglePlayers() {
  document.getElementById(`current--${activePlayerOne}`).textContent = 0;
  currentScore = 0;
  activePlayerOne = activePlayerOne === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

//rolling dice funtionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //generate random rold
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //check if roll was #1, if so, swith players
    if (dice !== 1) {
      //add dice val to current score
      currentScore += dice;

      //add dice to current score
      document.getElementById(`current--${activePlayerOne}`).textContent =
        currentScore;
    } else {
      //switch players and make score 0 & dont add score to total score

      togglePlayers();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current score to total score of active player
    scores[activePlayerOne] += currentScore;
    document.getElementById(`score--${activePlayerOne}`).textContent =
      scores[activePlayerOne];

    //2. check if score is score  >=100
    if (scores[activePlayerOne] >= 100) {
      //finish game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayerOne}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayerOne}`)
        .classList.remove('player--active');
    } else {
      //switch player if not 100
      togglePlayers();
    }
  }
});

btnNew.addEventListener('click', function () {
  playing = true;
  diceEl.classList.add('hidden');
  scores[0] = 0;
  scores[1] = 0;
  document.getElementById('score--0').textContent = scores[0];
  document.getElementById('score--1').textContent = scores[1];

  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#current--1').textContent = 0;

  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');

  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
});
