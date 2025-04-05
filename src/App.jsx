import React, { useEffect, useState} from "react";
import SudokuBoard from "./components/SudokuBoard";
import { generateSudoku, isBoardSolved, solveSudoku } from "./sudokuUtils";

function App() {
  const [initialBoard, setInitialBoard] = useState([]);
  const [board, setBoard] = useState([]);
  const [solved, setSolved] = useState(false);

  //Load puzzle on mount
  useEffect(() => {
    const newPuzzle = generateSudoku();
    console.log("Generated Puzzle:", newPuzzle);
    setInitialBoard(newPuzzle);
    setBoard(newPuzzle);
    setSolved(false);
  }, []);

  const handleCellChange = (row, col, value) => {

    //Allow deleting the value
    if (value === "") {
      const newBoard = board.map((r, rIdx) =>
        r.map((c, cIdx) => (rIdx === row && cIdx === col ? null : c))
      );
      setBoard(newBoard);
      return;
    }

    if (/^[1-9]$/.test(value)) {
      const newBoard = board.map((r, rIdx) =>
        r.map((c, cIdx) => (rIdx === row && cIdx === col ? parseInt(value) : c))
      );
      setBoard(newBoard);
    }
  };

  const handleNewGame = () => {
    const newPuzzle = generateSudoku();
    setInitialBoard(newPuzzle.map(row => [...row]));
    setBoard(newPuzzle.map(row => [...row]));
    setSolved(false);
  };

  const handleSolve = () => {
    const solution = solveSudoku(board);
    if (solution) {
      setBoard(solution);
      setSolved(true);
    } else {
      alert("This puzzle cannot be solved")
    }
  }

  useEffect(() => {
    if (isBoardSolved(board)) {
      setSolved(true);
    }
  }, [board]);

  console.log("App - board:", board);

  return (
    <div className="App">
      <h1>Sudoku</h1>
      {board.length === 9 && board[0]?.length === 9 ? (
        <>
          <div className="sudoku-wrapper">
            <SudokuBoard 
            board={board} 
            initialBoard={initialBoard} 
            onCellChange={handleCellChange} 
            />
          </div>
          <div className="buttons">
            <button onClick={handleNewGame}>New Game</button>
            <button onClick={handleSolve}>Solve Puzzle</button>
          </div>
      {solved && <p className="congrats">Congratulations! You solved the puzzle</p>}
        </>
      ) : (
        <p>Loading puzzle...</p>
      )}
    </div>
  );
}

export default App;