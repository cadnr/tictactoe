/* eslint-disable strict */

'use strict';

const gameboard = (() => {
  let board = [
    ['X', 'O', 'X'],
    ['O', 'X', 'O'],
    ['X', 'O', 'X'],
  ];
  const getBoard = () => board;
  return { getBoard };
})();

const displayController = (() => {
  const boardNode = document.querySelector('div.gameboard');
  const updateBoard = (boardState) => {
    console.dir(boardNode);
    console.table(boardState);
    for (let r = 1; r <= 3; r += 1) {
      for (let i = 1; i <= 3; i += 1) {
        const square = document.querySelector(`#s${r}${i}`);
        square.textContent = boardState[r - 1][i - 1];
        console.log(square);
      }
    }
  };
  return { updateBoard };
})();

const game = (() => {
  const init = () => {
    displayController.updateBoard(gameboard.getBoard());
  };
  return { init };
})();

game.init();
