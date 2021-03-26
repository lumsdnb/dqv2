import React, { useState } from 'react';
import useFitText from 'use-fit-text';

import { AiOutlineStar } from 'react-icons/ai';
import { BiUpvote, BiDownvote } from 'react-icons/bi';

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
      <div onClick={props.detailCard} ref={ref} className="card">
        <h4 className="card-top">
          {props.role} {props.type}
        </h4>
        <p className="card-body">{props.claim}</p>
        {props.type == 'fact' ? (
          <a href="https://doyourownresearch.io" target="_blank">
            source
          </a>
        ) : null}
        {props.size == 'smol' ? null : (
          <div className="card-bottom">
            <progress value={'50'} max="100"></progress>
            {props.userRole == 'judge' || props.userRole == 'spectator' ? (
              <div className="rate-card">
                {cardScore == 0 ? (
                  <>
                    <button onClick={upvoteCard}>
                      <BiUpvote />
                    </button>
                    <button onClick={downvoteCard}>
                      <BiDownvote />
                    </button>
                  </>
                ) : (
                  <h4>score: {cardScore}</h4>
                )}
              </div>
            ) : null}
            <AiOutlineStar />
          </div>
        )}
        {props.size == 'smol' ? null : (
          <>
            <h6>spectator rating: {props.spectatorRating}</h6>
            <h6>judge rating: {props.judgeRating}</h6>
          </>
        )}
      </div>
    </>
  );
};

export default Card;
