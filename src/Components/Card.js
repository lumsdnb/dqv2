import React, { useState } from 'react';
import useFitText from 'use-fit-text';

import './Card.css';

const Card = (props) => {
  const { fontSize, ref } = useFitText();
  const [cardScore, setCardScore] = useState(0);

  //todo: pass this up

  const upvoteCard = () => {
    console.log('updoot');
    props.rateCard(props.index, 1);
  };
  const downvoteCard = () => {
    console.log('downvote');
    props.rateCard(props.index, -1);
  };

  return (
    <>
      <div
        onClick={props.detailCard}
        ref={ref}
        className="card"
        style={{ fontSize }}
      >
        <h4 className="card-top">
          {props.role} {props.type}
        </h4>
        <p className="card-body">{props.claim}</p>
        <div className="card-bottom">
          <progress value={'50'} max="100"></progress>
          {props.userRole == 'judge' ? (
            <div className="rate-card">
              {cardScore == 0 ? (
                <>
                  <button onClick={upvoteCard}>+</button>
                  <button onClick={downvoteCard}>-</button>
                </>
              ) : (
                <h4>score: {cardScore}</h4>
              )}
            </div>
          ) : null}
          <h5>spectator rating: {props.spectatorRating}</h5>
          <h5>judge rating: {props.judgeRating}</h5>
        </div>
      </div>
    </>
  );
};

export default Card;
