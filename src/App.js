import React, { useState, useEffect } from 'react';
import Game from './components/game';
import GameOver from './components/gameOver';
import { shuffle } from './utils/shuffle';

function App() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [passes, setPasses] = useState(3); // Limited number of passes
  const initialWords = shuffle(['apple', 'banana', 'grape', 'orange', 'melon', 'peach', 'berry', 'cherry', 'plum', 'kiwi']);

  const resetGame = () => {
    setScore(0);
    setStrikes(0);
    setPasses(3);
    setIsGameOver(false);
    localStorage.removeItem('scrambleGameProgress');
  };
  
  return (
    <div className="App">
      {isGameOver ? (
        <GameOver score={score} onRestart={resetGame} />
      ) : (
        <Game
          words={initialWords}
          score={score}
          setScore={setScore}
          strikes={strikes}
          setStrikes={setStrikes}
          passes={passes}
          setPasses={setPasses}
          setIsGameOver={setIsGameOver}
        />
      )}
    </div>
  );
}

export default App;