import React from 'react';
//import './Timer.scss';

export default function Timer({ whiteTime, blackTime, currentPlayer }) {
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="timer">
            <div className={currentPlayer === 'white' ? 'active' : ''}>White: {formatTime(whiteTime)}</div>
            <div className={currentPlayer === 'black' ? 'active' : ''}>Black: {formatTime(blackTime)}</div>
        </div>
    );
}
