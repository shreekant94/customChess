export function isLegalMove(board, from, to, player) {
  const piece = board[from.row][from.col];
  if (!piece) return false; // No piece to move

  const isWhite = piece === piece.toUpperCase();
  if ((player === 'white' && !isWhite) || (player === 'black' && isWhite)) return false;

  const target = board[to.row][to.col];
  if (target && ((player === 'white' && target === target.toUpperCase()) || (player === 'black' && target === target.toLowerCase()))) {
    return false; // Can't capture own pieces
  }

  const dx = to.col - from.col;
  const dy = to.row - from.row;

  switch (piece.toLowerCase()) {
    case 'p': // Pawn
      return validatePawnMove(board, from, to, piece);
    case 'r': // Rook
      return validateRookMove(board, from, to);
    case 'n': // Knight
      return validateKnightMove(dx, dy);
    case 'b': // Bishop
      return validateBishopMove(board, from, to);
    case 'q': // Queen
      return validateQueenMove(board, from, to);
    case 'k': // King
      return validateKingMove(dx, dy);
    default:
      return false;
  }
}

function validatePawnMove(board, from, to, piece) {
  const direction = piece === 'P' ? -1 : 1; // White moves up (-1), Black moves down (+1)
  const dx = to.col - from.col;
  const dy = to.row - from.row;

  if (dx === 0) {
    // Normal move
    if (board[to.row][to.col] === null && dy === direction) return true;
    // First move (double step)
    if ((from.row === 6 && piece === 'P') || (from.row === 1 && piece === 'p')) {
      return dy === 2 * direction && board[to.row][to.col] === null && board[from.row + direction][from.col] === null;
    }
  } else if (Math.abs(dx) === 1 && dy === direction) {
    // Capture
    return board[to.row][to.col] !== null;
  }

  return false;
}
function validateRookMove(board, from, to) {
  if (from.row !== to.row && from.col !== to.col) return false; // Not straight

  return isPathClear(board, from, to);
}
function validateKnightMove(dx, dy) {
  return (Math.abs(dx) === 2 && Math.abs(dy) === 1) || (Math.abs(dx) === 1 && Math.abs(dy) === 2);
}
function validateBishopMove(board, from, to) {
  if (Math.abs(to.col - from.col) !== Math.abs(to.row - from.row)) return false; // Not diagonal

  return isPathClear(board, from, to);
}
function validateQueenMove(board, from, to) {
  const isDiagonal = Math.abs(to.col - from.col) === Math.abs(to.row - from.row);
  const isStraight = from.row === to.row || from.col === to.col;

  return (isDiagonal || isStraight) && isPathClear(board, from, to);
}
function validateKingMove(dx, dy) {
  return Math.abs(dx) <= 1 && Math.abs(dy) <= 1;
}
function isPathClear(board, from, to) {
  const dx = Math.sign(to.col - from.col);
  const dy = Math.sign(to.row - from.row);

  let x = from.col + dx;
  let y = from.row + dy;

  while (x !== to.col || y !== to.row) {
    if (board[y][x] !== null) return false;
    x += dx;
    y += dy;
  }

  return true;
}


export function isCheck(board, player) {
  const king = player === 'white' ? 'K' : 'k';
  const opponent = player === 'white' ? 'black' : 'white';

  // Find the king's position
  let kingPosition = null;
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (board[row][col] === king) {
        kingPosition = { row, col };
        break;
      }
    }
  }

  // Check if any opponent piece can attack the king
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && ((opponent === 'white' && piece === piece.toUpperCase()) || (opponent === 'black' && piece === piece.toLowerCase()))) {
        if (isLegalMove(board, { row, col }, kingPosition, opponent).valid) {
          return true; // King is in check
        }
      }
    }
  }

  return false; // King is not in check
}

export function isCheckmate(board, player) {
  if (!isCheck(board, player)) return false; // No check, no checkmate

  // Test all possible moves for the current player
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && ((player === 'white' && piece === piece.toUpperCase()) || (player === 'black' && piece === piece.toLowerCase()))) {
        for (let targetRow = 0; targetRow < 8; targetRow++) {
          for (let targetCol = 0; targetCol < 8; targetCol++) {
            const move = { row: targetRow, col: targetCol };
            const from = { row, col };

            if (isLegalMove(board, from, move, player).valid) {
              // Simulate the move
              const newBoard = board.map((r) => [...r]);
              newBoard[targetRow][targetCol] = piece;
              newBoard[row][col] = null;

              if (!isCheck(newBoard, player)) {
                return false; // Found a move that removes the check
              }
            }
          }
        }
      }
    }
  }

  return true; // No legal moves to escape check
}
