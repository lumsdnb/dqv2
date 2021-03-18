import React, { useState } from 'react';
import useFitText from 'use-fit-text';

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
      <div ref={ref} className="card" style={{ fontSize }}>
        <h4>card type</h4>
        <p>{props.claim}</p>
        {props.role == 'judge' ? (
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
    </>
  );
};

export default Card;
