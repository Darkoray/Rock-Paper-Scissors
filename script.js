'use strict';

// Usable Moves, their emojis and colors
const moves = {
  rock: ['👊', '#d32f2f'],
  paper: ['🖐️', '#1976d2'],
  scissors: ['✌️', '#388e3c'],
};
const movesArr = Object.keys(moves);
const movesArrValues = Object.values(moves);

// Possible results, their msgs and colors
const results = {
  draw: ["It's a Draw", '#ff9800'],
  lose: ['You Lost ;-;', '#f44336'],
  win: ['You Won!!', '#4caf50'],
};

// Selections of elements
const movesEl = document.querySelector('.moves');
const controlsEl = document.querySelector('.controls');
const resultEl = document.querySelector('.result');
const resetBtn = document.querySelector('.reset');

const moveBtns = document.querySelectorAll('.rock, .paper, .scissors');

// Game loading or not
let gameLoading = false;

// Detects changes of move options
moveBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Prevents spam clicks
    if (gameLoading) return;
    gameLoading = true;

    // Hides btns and shows loading animation
    controlsEl.classList.remove('hidden');
    movesEl.classList.add('hidden');

    let dots = 1;
    const loading = setInterval(() => {
      dots = ++dots % 4;
      resultEl.textContent = 'System is making a move' + '.'.repeat(dots);
    }, 300);

    // Player and system moves and their indexes
    const systemMoveIndex = Math.floor(Math.random() * movesArr.length);
    const systemMove = movesArr[systemMoveIndex];

    const playerMove = btn.dataset.move;
    const playerMoveIndex = movesArr.indexOf(playerMove);

    // Checks the result
    let resultKey;

    if (systemMove === playerMove) resultKey = 'draw';
    else if ((playerMoveIndex + 1) % movesArr.length === systemMoveIndex)
      resultKey = 'lose';
    else resultKey = 'win';

    setTimeout(() => {
      clearInterval(loading);

      // Displays the result
      const systemMoveMsg = `<span style='color:${moves[systemMove][1]}'>${systemMove}</span>${moves[systemMove][0]}`;
      const playerMoveMsg = `<span style='color:${moves[playerMove][1]}'>${playerMove}</span>${moves[playerMove][0]}`;
      const resultMsg = `<span style='color:${results[resultKey][1]}'>${results[resultKey][0]}</span>`;

      resultEl.innerHTML =
        resultKey !== 'draw'
          ? `You ${playerMoveMsg} vs System ${systemMoveMsg}<br>${resultMsg}`
          : `Both chose ${systemMoveMsg}. ${resultMsg}`;

      // Shows reset button
      resetBtn.style.opacity = '0';
      resetBtn.style.pointerEvents = 'none';
      resetBtn.classList.remove('hidden');

      setTimeout(() => {
        resetBtn.style.opacity = '1';
        resetBtn.style.pointerEvents = 'auto';
        resetBtn.classList.add('btn-transition');
      }, 1000);
    }, 1500);
  });
});

// Resets everything
resetBtn.addEventListener('click', () =>
  setTimeout(() => {
    resultEl.textContent = '';
    movesEl.classList.remove('hidden');
    controlsEl.classList.add('hidden');
    resetBtn.classList.add('hidden');
    resetBtn.classList.remove('reset-transition');
    gameLoading = false;
  }, 100),
);
