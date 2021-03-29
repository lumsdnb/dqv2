import React, { useRef, useEffect } from "react";
import Card from "./Card.js";
import "./CardTable.css";

const CardTable = (props) => {
  //todo: scroll to newest card
  const handleRating = (i, rating) => {
    props.rateCard(i, rating);
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const listOfCards = props.cardList.map((c, index) => {
    if (index != 0)
      return (
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
      );
  });

  //might wanna refactor this..
  const firstCard = props.cardList.map((c, index) => {
    if (index == 0)
      return (
        <Card
          key={c.index}
          claim={c.body}
          index={index}
          role='Hauptargument'
          userRole={props.userRole}
          spectatorRating={c.spectatorRating}
          judgeRating={c.judgeRating}
          rateCard={handleRating}
        />
      );
  });
  useEffect(() => {
    scrollToBottom();
  }, [listOfCards]);

  return (
    <>
      <div className='card-table'>
        <div className='first-card'>{firstCard}</div>
        <div className='scrolling-cards'>
          {listOfCards}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </>
  );
};

export default CardTable;
