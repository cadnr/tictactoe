/* eslint-disable strict */

'use strict';

const displayController = (() => {
  const boardNode = document.querySelector('div.gameboard');
  const updateBoard = (boardState) => {
    for (let r = 1; r <= 3; r += 1) {
      for (let i = 1; i <= 3; i += 1) {
        const square = boardNode.querySelector(`#s${r}${i}`);
        square.textContent = boardState[r - 1][i - 1];
      }
    }
  };
  return { updateBoard };
})();

const gameboard = (() => {
  let board = [];
  const getBoard = () => board;
  const setBoard = (newBoard) => {
    board = newBoard;
  };
  const setSquare = (id, newValue) => {
    const v = board[id[1] - 1][id[2] - 1];
    if (v === 'X' || v === 'O') {
      return 'taken';
    }
    board[id[1] - 1][id[2] - 1] = newValue;
    displayController.updateBoard(gameboard.getBoard());
    return true;
  };
  return { getBoard, setBoard, setSquare };
})();

const game = (() => {
  let playerSign = 'O';
  const init = () => {
    gameboard.setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    displayController.updateBoard(gameboard.getBoard());

    const changePlayer = () => {
      playerSign = playerSign === 'O' ? 'X' : 'O';
    };

    const squares = document.querySelectorAll('.square');
    Object.values(squares).forEach((square) => {
      square.addEventListener('click', (e) => {
        const { id } = e.target;
        if (gameboard.setSquare(id, playerSign) !== 'taken') {
          changePlayer();
        }
      });
    });
  };
  return { init };
})();

game.init();
