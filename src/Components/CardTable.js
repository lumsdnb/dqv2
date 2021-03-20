import React, { } from 'react';
import Card from './Card.js';
import './CardTable.css';


const CardTable = (props) => {
  

  const scrollToEnd = (e)=>{
    e.scrollIntoView()
  }
  const listOfCards = props.cardList.map((c) => (
    <Card
      claim={c.body}
      role={c.role}
      userRole={props.userRole}
      spectatorRating={c.spectatorRating}
    />
  ));
  return (
    <>
      <div className="card-table">{listOfCards}</div>
    </>
  );
};

export default CardTable;
