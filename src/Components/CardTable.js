import React from 'react';
import Card from './Card.js';
import './CardTable.css';

const CardTable = (props) => {
  const detailCard = (e) => {};
  return (
    <>
      <div className="card-table">
        {Object.keys(props.cardList).map((card, i) => {
          console.log(props.cardList);
        })}
        <Card claim={props.arg1} role={props.role} detailCard={detailCard} />
        <Card claim={props.arg2} role={props.role} detailCard={detailCard} />
        <Card
          claim="test eins zwei drei"
          role={props.role}
          detailCard={detailCard}
        />
        <Card
          claim="das argument ist falsch weil bla bla"
          role={props.role}
          detailCard={detailCard}
        />
      </div>
    </>
  );
};

export default CardTable;
