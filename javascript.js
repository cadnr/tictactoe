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

    const checkState = () => {
      const board = Object.values(gameboard.getBoard());
      for (let r = 0; r < 3; r += 1)
        if (
          board[r][0] !== '' &&
          board[r][0] === board[r][1] &&
          board[r][0] === board[r][2]
        ) {
          return board[r][0];
        }
      for (let c = 0; c < 3; c += 1)
        if (
          board[0][c] !== '' &&
          board[0][c] === board[1][c] &&
          board[0][c] === board[2][c]
        ) {
          return board[0][c];
        }
      if (
        board[0][0] !== '' &&
        board[0][0] === board[1][1] &&
        board[0][0] === board[2][2]
      ) {
        return board[0][0];
      }
      if (
        board[2][0] !== '' &&
        board[2][0] === board[1][1] &&
        board[2][0] === board[0][2]
      ) {
        return board[2][0];
      }
      return 'continue';
    };

    const squares = document.querySelectorAll('.square');
    Object.values(squares).forEach((square) => {
      square.addEventListener('click', (e) => {
        const { id } = e.target;
        if (gameboard.setSquare(id, playerSign) !== 'taken') {
          console.log(checkState());
          changePlayer();
        }
      });
    });
  };
  return { init };
})();

game.init();
