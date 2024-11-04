import React from 'react';
import { ListCards } from '../App';

interface Props {
  card: ListCards;
  handleCardClick: (card: ListCards) => void;
}

const Card = ({ card, handleCardClick }: Props) => {
  return (
    <div className={`card ${card.isFlipped ? 'flipped' : ''}`} onClick={() => handleCardClick(card)}>
      <div className="card-inner">
        <div className="card-front">
          <h3>{card.isFlipped ? card.value : "❓"}</h3>
        </div>
        <div className="card-back">
          <h3>❓</h3>
        </div>
      </div>
    </div>
  );
};

export default Card;
