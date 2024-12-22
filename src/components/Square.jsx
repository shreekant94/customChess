import React from 'react';
//import './Square.scss';
const pieceIcons = {
  P: '♙',
  R: '♖',
  N: '♘',
  B: '♗',
  Q: '♕',
  K: '♔',
  p: '♟',
  r: '♜',
  n: '♞',
  b: '♝',
  q: '♛',
  k: '♚',
};

export default function Square({ piece, row, col, isSelected, onClick }) {
  return (
    <div
      className={`square ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {piece && <span className="piece">{pieceIcons[piece]}</span>}
    </div>
  );
}