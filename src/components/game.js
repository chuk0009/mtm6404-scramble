import React, { useState, useEffect } from 'react';

function Game({ words, score, setScore, strikes, setStrikes, passes, setPasses, setIsGameOver }) {
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    loadProgress();
    scrambleNewWord();
  }, []);
  
  const saveProgress = () => {
    localStorage.setItem(
      'scrambleGameProgress',
      JSON.stringify({ score, strikes, passes, words })
    );
  };

  const loadProgress = () => {
    const savedGame = localStorage.getItem('scrambleGameProgress');
    if (savedGame) {
      const { score, strikes, passes, words } = JSON.parse(savedGame);
      setScore(score);
      setStrikes(strikes);
      setPasses(passes);
    }
  };

  const scrambleNewWord = () => {
    if (words.length === 0) {
      setIsGameOver(true);
      return;
    }
    const wordIndex = Math.floor(Math.random() * words.length);
    const word = words[wordIndex];
    setCurrentWord(word);
    setScrambledWord(word.split('').sort(() => Math.random() - 0.5).join(''));
  };

  const handleGuess = () => {
    if (input.trim().toLowerCase() === currentWord) {
      setScore(score + 1);
      scrambleNewWord();
    } else {
      setStrikes(strikes + 1);
      if (strikes >= 2) setIsGameOver(true); // Limit to 3 strikes
    }
    setInput('');
    saveProgress();
  };

  const handlePass = () => {
    if (passes > 0) {
      setPasses(passes - 1);
      scrambleNewWord();
    }
    saveProgress();
  };

  return (
    <div className="container">
      <h2>Scrambled Word: {scrambledWord}</h2>
      <input
        type="text" placeholder='your guess...' title='guess'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
      />
      <div className="btn-cnt">
      <button onClick={handleGuess} id='one'>Guess</button>
      <button onClick={handlePass} id='two' disabled={passes === 0}>Pass ({passes} left)</button>
      </div>
      
      <div className="score-cnt">
      <p>Score: {score}</p>
      <p>Strikes: {strikes}</p>
      </div>
      
    </div>
  );
}

export default Game;