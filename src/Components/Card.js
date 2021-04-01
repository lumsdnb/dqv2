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
      <div className='card card-hover'>
        <h4
          className={'card-top' + ' ' + props.size == 'smol' ? 'card-smol' : ''}
        >
          {props.role == 'Main' ? 'Hauptargument' : null}
          {props.role == 'affirmative' ? 'pro' : null}
          {props.role == 'negative' ? 'contra' : null}{' '}
          {props.type == 'argument' ? 'Argument' : null}
          {props.type == 'fact' ? 'Fakt' : null}
          {props.type == 'question' ? 'Frage' : null}
        </h4>
        <p className='card-body'>{props.claim}</p>
        {props.source ? (
          <a href={props.source} target='_blank'>
            source
          </a>
        ) : null}
        {props.size == 'smol' ? null : (
          <div className='card-bottom'>
            <h5>ID: {props.index}</h5>
            <h5>JR: {props.judgeRating}</h5>
            <h5>SR: {props.spectatorRating}</h5>
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
