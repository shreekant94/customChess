import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import Timer from './components/Timer';
import MoveList from './components/MoveList';
import Notification from './components/Notification';
import { isLegalMove, isCheck, isCheckmate } from './utils/chessLogic';
import './App.css';

const initialBoard = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];

export default function App() {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('white');
  const [history, setHistory] = useState([]);
  const [notification, setNotification] = useState(null);
  const [whiteTime, setWhiteTime] = useState(300);
  const [blackTime, setBlackTime] = useState(300);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentPlayer === 'white') {
        setWhiteTime((prev) => Math.max(prev - 1, 0));
      } else {
        setBlackTime((prev) => Math.max(prev - 1, 0));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentPlayer]);

  const handleMove = (from, to) => {
    const piece = board[from.row][from.col];

    if (!isLegalMove(board, from, to, currentPlayer)) {
      setNotification('Illegal move!');
      return;
    }

    const newBoard = board.map((row) => [...row]);
    newBoard[to.row][to.col] = piece;
    newBoard[from.row][from.col] = null;
    setBoard(newBoard);

    const isCheckState = isCheck(newBoard, currentPlayer === 'white' ? 'black' : 'white');
    const isCheckmateState = isCheckmate(newBoard, currentPlayer === 'white' ? 'black' : 'white');

    setHistory((prev) => [
      ...prev,
      { from, to, piece, isCheck: isCheckState, isCheckmate: isCheckmateState },
    ]);

    if (isCheckmateState) {
      setNotification(`${currentPlayer === 'white' ? 'Black' : 'White'} wins by checkmate!`);
      return;
    } else if (isCheckState) {
      setNotification('Check!');
    } else {

    }
    setNotification(null);
    setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
  };

  return (
    <div className="app">
      <div className="game-info">
        <Timer whiteTime={whiteTime} blackTime={blackTime} currentPlayer={currentPlayer} />
        <Notification message={notification} />
      </div>
      <Board board={board} onMove={handleMove} currentPlayer={currentPlayer} />
      <MoveList history={history} />
    </div>
  );
}
