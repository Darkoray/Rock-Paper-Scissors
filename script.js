'use strict';

// Usable Moves and their emojis
const moves = {
  rock: '👊',
  paper: '🖐️',
  scissors: '✌️',
};
const movesArr = Object.keys(moves);
const movesArrValues = Object.values(moves);

// Selections of elements
const moveBtns = document.querySelectorAll('.rock, .paper, .scissors');
const resultEl = document.querySelector('.result');
const resetBtn = document.querySelector('.reset');

// Game loading or not
let gameLoading = false;

// Detects changes of move options
moveBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Prevents spam clicks
    if (gameLoading) return;
    gameLoading = true;

    // Player and system moves and their indexes
    const systemMoveIndex = Math.floor(Math.random() * movesArr.length);
    const systemMove = movesArr.at(systemMoveIndex);
    const playerMove = btn.dataset.move;
    const playerMoveIndex = movesArr.indexOf(playerMove);

    // Checks the result
    let result;

    if (systemMove === playerMove) result = "It's a Draw";
    else if ((playerMoveIndex + 1) % movesArr.length === systemMoveIndex)
      result = 'You Lost ;-;';
    else result = 'You Won!!';

    // Shows loading animation
    let dots = 1;
    resultEl.classList.remove('hidden');
    const loading = setInterval(() => {
      dots = ++dots % 4;
      resultEl.textContent = 'System is making a move' + '.'.repeat(dots);
    }, 300);

    // Displays the result
    setTimeout(() => {
      clearInterval(loading);
      const capitalize = str => str.at(0).toUpperCase() + str.slice(1);
      resultEl.textContent = `System played ${capitalize(systemMove)}
      ${movesArrValues.at(systemMoveIndex)}. ${result}`;

      // Shows reset button
      resetBtn.classList.remove('hidden');
    }, 1500);
  });
});

// Resets everything
resetBtn.addEventListener('click', () =>
  setTimeout(() => {
    resultEl.textContent = '';
    resultEl.classList.add('hidden');
    resetBtn.classList.add('hidden');
    gameLoading = false;
  }, 150),
);
