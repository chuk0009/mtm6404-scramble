import React from 'react';

function GameOver({ score, onRestart }) {
  return (
    <div>
      <h2>Game Over!</h2>
      <p>Your score: {score}</p>
      <button onClick={onRestart}>Play Again</button>
    </div>
  );
}

export default GameOver;