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
      <div className={c.parent ? 'child-card' : 'd'}>
        <Card
          key={c.id}
          id={c.id}
          claim={c.body}
          index={index}
          saveToDeck={(i) => props.saveToDeck(i)}
          replyToCard={(id) => props.replyToCard(id)}
          type={c.parent ? 'Antwort' : c.type}
          source={c.source}
          parent={props.parent}
          spectatorRating={c.spectatorRating}
          upVotes={c.upVotes}
          downVotes={c.downVotes}
          numberOfQuestions={c.numberOfQuestions}
          rateCard={(i, r) => handleRating(i, r)}
        />
      </div>
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
