export function getMoveNotation(from, to, piece, isCapture, isCheck, isCheckmate) {
    const cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const rows = ['8', '7', '6', '5', '4', '3', '2', '1'];

    const fromNotation = `${cols[from.col]}${rows[from.row]}`;
    const toNotation = `${cols[to.col]}${rows[to.row]}`;
    const captureNotation = isCapture ? 'x' : '';

    let move = `${piece.toUpperCase()}${captureNotation}${toNotation}`;
    if (isCheckmate) {
        move += '#';
    } else if (isCheck) {
        move += '+';
    }

    return move;
}
