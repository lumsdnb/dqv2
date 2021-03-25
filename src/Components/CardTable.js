import React from 'react';
import Card from './Card.js';
import './CardTable.css';

const CardTable = (props) => {
  //todo: scroll to newest card
  const handleRating = (i, rating) => {
    props.rateCard(i, rating);
  };

  const listOfCards = props.cardList.map((c, index) => (
    <Card
      key={c.index}
      claim={c.body}
      index={index}
      role={c.role}
      type={c.type}
      userRole={props.userRole}
      spectatorRating={c.spectatorRating}
      judgeRating={c.judgeRating}
      rateCard={handleRating}
    />
  ));

  return (
    <>
      <div className="card-table">{listOfCards}</div>
    </>
  );
};

export default CardTable;
