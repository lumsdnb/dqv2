import React, { useState } from 'react';

import { AiOutlineStar } from 'react-icons/ai';
import { TiThumbsUp, TiThumbsDown } from 'react-icons/ti';

import './Card.css';

const Card = (props) => {
  const [hover, setHover] = useState(false);
  const [wasRated, setWasRated] = useState('');

  //todo: pass this up

  const voteOnCard = (v) => {
    console.log('vote');
    setWasRated(v);
    props.rateCard(props.index, v);
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
        <h4 className='card-top'>
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
                {wasRated ? (
                  wasRated
                ) : (
                  <>
                    <button
                      className={wasRated == 1 ? 'select-highlight' : null}
                      onClick={() => voteOnCard(1)}
                    >
                      <TiThumbsUp />
                    </button>
                    <button
                      className={wasRated == -1 ? 'select-highlight' : null}
                      onClick={() => voteOnCard(-1)}
                    >
                      <TiThumbsDown />
                    </button>
                  </>
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
