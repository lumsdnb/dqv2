import React, { useRef, useEffect } from 'react';
import Card from './Card.js';
import './CardTable.css';

const CardTable = (props) => {
  const handleRating = (i, rating) => {
    props.rateCard(i, rating);
    console.log(`i: ${i} r: ${rating}`);
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  };

  const listOfCards = props.cardList.map((c, index) => {
    return (
      <Card
        key={c.index}
        claim={c.body}
        index={index}
        role={c.role}
        type={c.type}
        source={c.source}
        userRole={props.userRole}
        spectatorRating={c.spectatorRating}
        judgeRating={c.judgeRating}
        rateCard={(i, r) => handleRating(i, r)}
      />
    );
  });

  return (
    <>
      <div className='card-table'>
        <div className='scrolling-cards'>
          {listOfCards}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </>
  );
};

export default CardTable;
