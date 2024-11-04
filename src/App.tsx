import React, { useEffect, useState } from 'react';
import Header from './comp/Header';
import Grid from './comp/Grid';

export interface ListCards {
  id: string;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
  isClicked: boolean;
}

const initialCards: ListCards[] = [
  { id: '1', value: '❤️', isFlipped: false, isMatched: false, isClicked: false },
  { id: '2', value: '❤️‍🔥', isFlipped: false, isMatched: false, isClicked: false },
  { id: '3', value: '💝', isFlipped: false, isMatched: false, isClicked: false },
  // { id: '4', value: '💜', isFlipped: false, isMatched: false, isClicked: false },
  // { id: '5', value: '🩷', isFlipped: false, isMatched: false, isClicked: false },
  // { id: '6', value: '❤️‍🩹', isFlipped: false, isMatched: false, isClicked: false },
  // { id: '7', value: '🩶', isFlipped: false, isMatched: false, isClicked: false },
  // { id: '8', value: '💖', isFlipped: false, isMatched: false, isClicked: false },
  // { id: '9', value: '💙', isFlipped: false, isMatched: false, isClicked: false },
  // { id: '10', value: '💚', isFlipped: false, isMatched: false, isClicked: false },
  // { id: '11', value: '🤎', isFlipped: false, isMatched: false, isClicked: false },
  // { id: '12', value: '🧡', isFlipped: false, isMatched: false, isClicked: false },
 
  
];
const shuffleCards = (cards: ListCards[]) => {
  // שכפול המערך
  const shuffled = [...cards, ...cards]
    .sort(() => Math.random() - 0.5) // ערבוב הכרטיסים
    .map((card, index) => ({
      ...card,
      id: (index + 1).toString(), // להבטיח שה-ID הוא ייחודי
      isFlipped: false,
      isMatched: false,
      isClicked: false,
    }));
  return shuffled;
};

const App = () => {
  const [list, setList] = useState<ListCards[]>(shuffleCards(initialCards));
  const [stepCount, setStep] = useState(0);
  const [flippedCards, setFlippedCards] = useState<ListCards[]>([]);
  const [isGameWon, setIsGameWon] = useState(false);
  const [timer, setTimer] = useState<number>(0);

  const handleCardClick = (card: ListCards) => {
    if (isGameWon || flippedCards.length >= 2 || card.isFlipped) return;

    const newList = list.map(item => {
      if (item.id === card.id) {
        return { ...item, isFlipped: true };
      }
      return item;
    });

    setList(newList);
    setFlippedCards([...flippedCards, card]);

    if (flippedCards.length === 1) {
      const firstCard = flippedCards[0];
      if (firstCard.value === card.value) {
        setFlippedCards([]);
        setStep(prev => prev + 1);
       
        if (newList.every(item => item.isFlipped)) {
          setIsGameWon(true);
        }
      } else {
        setTimeout(() => {
          setList(prevList =>
            prevList.map(item =>
              item.id === card.id || item.id === firstCard.id
                ? { ...item, isFlipped: false }
                : item
            )
          );
          setFlippedCards([]);
          setStep(0);
        }, 1000);
        setStep(prev => prev + 1);
      }
    }

   
  };

  const resetGame = () => {
    setList(shuffleCards(initialCards));
    setStep(0);
    setFlippedCards([]);
    setIsGameWon(false);
    setTimer(0);
  };

  return (
    <div className="app">
      <Header stepCount={stepCount} resetGame={resetGame} isGameWon={isGameWon} timer={timer} setTimer={setTimer}/>
      <Grid list={list} setList={setList} handleCardClick={handleCardClick} />
      {isGameWon && <h1 className="victory-message">ניצחת! כל הכבוד!</h1>}
    </div>
  );
};

export default App;

//מעוניין לעשות שהמובס לא ימחק במקרה של מציאה 
