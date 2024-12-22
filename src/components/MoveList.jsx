import React from 'react';
//import './MoveList.scss';

export default function MoveList({ history }) {
  return (
    <div className="move-list">
      <h3>Moves</h3>
      <ul>
        {history.map((move, index) => (
          <li key={index}>{`Move ${index + 1}: ${move.piece} from ${move.from.row},${move.from.col} to ${move.to.row},${move.to.col}`}</li>
        ))}
      </ul>
    </div>
  );
}