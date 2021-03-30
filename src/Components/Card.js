import React, { useState } from 'react';

import { AiOutlineStar } from 'react-icons/ai';
import { TiThumbsUp, TiThumbsDown } from 'react-icons/ti';

import './Card.css';

const Card = (props) => {
  const [cardScore, setCardScore] = useState(0);
  const [hover, setHover] = useState(false);

  //todo: pass this up

  const upvoteCard = () => {
    console.log('updoot');
    props.rateCard(props.index, 1);
  };
  const downvoteCard = () => {
    console.log('downvote');
    props.rateCard(props.index, -1);
  };
  const hoverOn = () => {
    console.log('hover on');
    setHover(true);
  };

  const hoverOff = () => {
    console.log('hover off');
    setHover(false);
  };

  return (
    <>
      <div className='card'>
        <h4
          className={'card-top' + ' ' + props.size == 'smol' ? 'card-smol' : ''}
        >
          {props.role} {props.type}
        </h4>
        <p className='card-body'>{props.claim}</p>
        {props.type == 'fact' ? (
          <a href='https://doyourownresearch.io' target='_blank'>
            source
          </a>
        ) : null}
        {props.size == 'smol' ? null : (
          <div className='card-bottom'>
            <progress value={'50'} max='100'></progress>
            {props.userRole == 'judge' || props.userRole == 'spectator' ? (
              <div className='rate-card'>
                {cardScore == 0 ? (
                  <>
                    <button onClick={upvoteCard}>
                      <TiThumbsUp />
                    </button>
                    <button onClick={downvoteCard}>
                      <TiThumbsDown />
                    </button>
                  </>
                ) : (
                  <h4>score: {cardScore}</h4>
                )}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </>
  );
};

export default Card;
