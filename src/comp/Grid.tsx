import React from 'react';
import Card from './Card';
import { ListCards } from '../App';

interface Props {
  list: ListCards[];
  setList: (list: ListCards[]) => void;
  handleCardClick: (card: ListCards) => void;
}

const Grid = ({ list, setList, handleCardClick }: Props) => {
  return (
    <div className='grid'>
      {list.map((item) => (
        <Card key={item.id} card={item} handleCardClick={handleCardClick} />
      ))}
    </div>
  );
};

export default Grid;
