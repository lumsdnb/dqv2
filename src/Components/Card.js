import React, { useState } from 'react';
import useFitText from 'use-fit-text';

import './Card.css';

const Card = (props) => {
  const { fontSize, ref } = useFitText();
  const [cardScore, setCardScore] = useState(0);

  const upvoteCard = () => {
    console.log('updoot');
    setCardScore(1);
  };
  const downvoteCard = () => {
    console.log('downvote');
    setCardScore(-1);
  };

  return (
    <>
      <div
        onClick={props.detailCard}
        ref={ref}
        className="card"
        style={{ fontSize }}
      >
        <h4 className="card-top">card type: {props.role}</h4>
        <p>{props.claim}</p>
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
        </div>
      </div>
    </>
  );
};

export default Card;
