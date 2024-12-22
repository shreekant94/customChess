import React, { useState } from 'react';
import Square from './Square';
//  import './Board.scss';

export default function Board({ board, onMove, currentPlayer }) {
  const [selectedSquare, setSelectedSquare] = useState(null);

  const handleSquareClick = (row, col) => {
    const clickedSquare = { row, col };
    const piece = board[row][col];

    // If no piece is selected, select a piece
    if (!selectedSquare) {
      if (piece && (currentPlayer === 'white' ? piece === piece.toUpperCase() : piece === piece.toLowerCase())) {
        setSelectedSquare(clickedSquare);
      }
      return;
    }

    // If a piece is already selected, attempt to move
    onMove(selectedSquare, clickedSquare);
    setSelectedSquare(null);
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((piece, colIndex) => (
            <Square
              key={colIndex}
              piece={piece}
              row={rowIndex}
              col={colIndex}
              isSelected={selectedSquare?.row === rowIndex && selectedSquare?.col === colIndex}
              onClick={() => handleSquareClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
