import React from 'react';
import Card from './Card.js';
import './CardTable.css';

const CardTable = (props) => {
  const detailCard = (e) => {};
  const listOfCards = props.cardList.map((c) => (
    <Card claim={c.body} role={c.role} />
  ));
  return (
    <>
      <div className="card-table">{listOfCards}</div>
    </>
  );
};

export default CardTable;
