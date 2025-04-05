//Utilituy to shuffle array (Fisher-Yates)
const shuffle = (array) => {
  let currentIndex = array.length;
  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

//Check if placing num in board[row][col] is safe
const isSafe = (board, row, col, num) => {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
  }

  const boxRow = row - (row % 3);
  const boxCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + boxRow][j + boxCol] === num) return false;
    }
  }

  return true;
};

//Solve sudoku using backtracking
const solve = (board) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === null) {
        for (let num of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
          if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (solve(board)) return true;
            board[row][col] = null;
          }
        }
        return false;
      }
    }
  }
  return true;
};

//Generate full soved board
const generateFullBoard = () => {
  const board = Array.from({ length: 9 }, () => Array(9).fill(null));
  solve(board);
  return board;
};

//Remove cells to create puzzle
const removeCells = (board, emptyCells) => {
  const puzzle = board.map((row) => [...row]);

  let count = 0;
  while (count < emptyCells) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (puzzle[row][col] != null) {
      puzzle[row][col] = null;
      count++;
    }
  }

  return puzzle;
};

//Exported function
export const generateSudoku = (emptyCells = 40) => {
  const fullBoard = generateFullBoard();
  return removeCells(fullBoard, emptyCells);
};

//Check if cell is valid
export const isCellValid = (board, row, col) => {
  const num = board[row][col];
  if (num === null) return true;

  for (let i = 0; i < 9; i++) {
    if (i !== col && board[row][i] === num) return false;
    if (i !== row && board[i][col] === num) return false;
  }

  const boxRow = row - (row % 3);
  const boxCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const r = boxRow + i;
      const c = boxCol + j;
      if ((r != row || c !== col) && board[r][c] === num) return false;
    }
  }

  return true;
};

export const isBoardSolved = (board) => {
  if (!board || board.length !== 9) return false;

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === null || !isCellValid(board, row, col)) {
        return false;
      }
    }
  }
  return true;
};

export const solveSudoku = (inputBoard) => {
  const board = inputBoard.map((row) => [...row]); //deep copy

  const solveCurrent = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === null) {
          for (let num = 1; num <= 9; num++) {
            if (isSafe(board, row, col, num)) {
              board[row][col] = num;
              if (solveCurrent()) return true;
              board[row][col] = null;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  if (solveCurrent()) {
    return board;
  } else {
    return null; //unsolvable
  }
};
