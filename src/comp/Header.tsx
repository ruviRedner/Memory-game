import React, { useEffect, useState } from 'react';

interface Props {
  stepCount: number;
  resetGame: () => void;
  isGameWon: boolean;
  timer:number;
  setTimer:  React.Dispatch<React.SetStateAction<number>>;
}

const Header = ({ stepCount, resetGame, isGameWon ,setTimer,timer}: Props) => {
  // טיימר

  useEffect(() => {
    const interval = setInterval(() => {
      
      setTimer((prevTimer:number) => prevTimer + 1); // עדכון הטיימר כל שנייה
    }, 1000);
    return () => clearInterval(interval); // ניקוי
  }, []);

  return (
    <div className='header'>
      <h1>Memory Game</h1>
      <div className='item-header'>
        <p>⭐⭐⭐⭐</p>
        <p>{stepCount} Moves</p>
        <p>Timer: 00:{timer < 10 ? `0${timer}` : timer}</p> 
       
        <button onClick={resetGame}>↺</button>
      </div>
    </div>
  );
}

export default Header;
