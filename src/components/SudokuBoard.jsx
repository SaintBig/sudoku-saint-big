import React from "react";
import { isCellValid } from "../sudokuUtils";

const SudokuBoard = ({ board, initialBoard, onCellChange }) => {

	console.log("SudokuBoard - board prop:", board);

	const getBorderClasses = (rowIndex, colIndex) => {
		const classes = [];
		if (rowIndex % 3 === 0) classes.push("top-border");
		if (colIndex % 3 === 0) classes.push("left-border");
		if (rowIndex === 8) classes.push("bottom-border");
		if (colIndex === 8) classes.push("right-border");
		return classes.join(" ");
	};

	return (
		<div className="sudoku-board">
		{board.flatMap((row, rowIndex) =>
		  row.map((cell, colIndex) => {
			const isFixed = initialBoard[rowIndex][colIndex] !== null;
			const isValid = isCellValid(board, rowIndex, colIndex);
			const cellClasses = [
				"sudoku-cell",
				isFixed ? "fixed" : "editable",
				getBorderClasses(rowIndex, colIndex)
			];

			if (!isFixed && !isValid) {
				cellClasses.push("invalid");
			}

			return (
			  <input
				key={`${rowIndex}-${colIndex}`}
				type="text"
				maxLength="1"
				value={cell ?? ""}
				onChange={(e) =>
				  onCellChange(rowIndex, colIndex, e.target.value)
				}
				disabled={isFixed}
				className={cellClasses.join(" ")}
			  />
			);
		  })
		)}
		</div>
	);
  };

export default SudokuBoard;
