'use strict';
// selecting Element
const score0El  = document.querySelector('#score--0');
const score1El  = document.getElementById('score--1');
const diceEL    = document.querySelector('.dice');
const btnNew    = document.querySelector('.btn--new');
const btnRoll   = document.querySelector('.btn--roll');
const btnHold   = document.querySelector('.btn--hold');
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const current0EL=document.getElementById('current--0');
const current1EL=document.getElementById('current--1');


//  Starting Conditions
score0El.textContent = String(0);
score1El.textContent = String(0);
diceEL.classList.add('hidden');

//  Game functions
let currentScore,activePlayer,scores,playing;

//  Buttons function
const switchPlayer  = function (){
    activePlayer = activePlayer === 0 ? 1:0;
    currentScore =0;
    player0EL.classList.toggle('player--active');
    player1EL.classList.toggle('player--active');
}
const holdPlayer    = function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`)
            .textContent = String(scores[activePlayer]);
        document.getElementById(`current--${activePlayer}`).textContent = String(0);
        if (scores[activePlayer] >= 100) {
            playing = false;
            diceEL.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
        } else {
            switchPlayer()
        }
    }
}
const rollingDice = function () {
    if (playing){
    const dice = Math.trunc(Math.random()*6)+1;
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;
    if (dice !== 1){
        currentScore +=dice;
        document.getElementById(`current--${activePlayer}`).textContent = String(currentScore);
    }else {
        currentScore = 0;
        document.getElementById(`current--${activePlayer}`).textContent = String(currentScore);
        switchPlayer();
    }
    }
}
const resetGame   = function () {
    currentScore    = 0;
    activePlayer    = 0;
    scores          = [0,0];
    playing         = true;
    current0EL.textContent = String(0);
    current1EL.textContent = String(0);
    player0EL.classList.remove('player--winner')
    player1EL.classList.remove('player--winner')
    score0El.textContent = String(0);
    score1El.textContent = String(0);
    player0EL.classList.add('player--active')
    player1EL.classList.remove('player--active')

}
resetGame();
//  Play the game
btnRoll.addEventListener('click',rollingDice)
btnHold.addEventListener('click',holdPlayer)
btnNew.addEventListener('click',resetGame)