import React, { useState } from 'react';

import { TiThumbsUp, TiThumbsDown } from 'react-icons/ti';
import { HiOutlineSaveAs } from 'react-icons/hi';
import { FaRegSave } from 'react-icons/fa';
import { RiQuestionnaireLine } from 'react-icons/ri';

import { BiUserCircle } from 'react-icons/bi';

import './Card.css';

const Card = (props) => {
  const [wasRated, setWasRated] = useState('');
  const [cardSaved, setCardSaved] = useState(false);

  const voteOnCard = (v) => {
    console.log('voted');
    setWasRated(v);
    props.rateCard(props.index, v);
  };

  const saveCard = (c) => {};

  const handleCardSave = () => {
    setCardSaved(true);
  };

  return (
    <>
      <div className={props.save ? 'card' : 'card card-hover'}>
        <h4 className='card-top'>
          {props.role === 'Main' && props.type !== 'question'
            ? 'Rundenargument'
            : null}
          {props.role === 'affirmative' && props.type !== 'question'
            ? 'Pro'
            : null}
          {props.role === 'negative' && props.type !== 'question'
            ? 'Contra'
            : null}{' '}
          {props.type === 'argument' ? 'Argument' : null}
          {props.type === 'fact' ? 'Fakt' : null}
          {props.type === 'question' ? 'Frage' : null}
        </h4>
        <p className='card-body'>{props.claim}</p>
        {props.source ? (
          <a href={props.source} target='_blank' rel='noreferrer'>
            source
          </a>
        ) : null}

        {props.size === 'smol' ? null : (
          <>
            <div className='card-bottom'>
              {/*<h5 classname='card-id'>ID: {props.index}</h5>*/}
              <div className='card-ratings'>
                <h5 className='card-bottom__left-corner'>
                  <RiQuestionnaireLine /> {props.questions}
                </h5>

                <h5 style={{ marginLeft: '2rem' }}>{props.upVotes}</h5>
                <h5>
                  <BiUserCircle />
                </h5>
                <h5>{props.downVotes}</h5>
              </div>
              {/*<progress value={'50'} max='100'></progress>*/}
            </div>

            <div className='rate-card'>
              {wasRated ? null : (
                <>
                  <button
                    className={wasRated === 1 ? 'select-highlight' : null}
                    onClick={() => voteOnCard(1)}
                  >
                    <TiThumbsUp />
                  </button>
                  <button
                    className={wasRated === 1 ? 'select-highlight' : null}
                    onClick={() => saveCard(1)}
                  >
                    <FaRegSave />
                  </button>
                  <button
                    className={wasRated === 1 ? 'select-highlight' : null}
                    onClick={() => voteOnCard(3)}
                  >
                    <RiQuestionnaireLine />
                  </button>

                  <button
                    className={wasRated === -1 ? 'select-highlight' : null}
                    onClick={() => voteOnCard(-1)}
                  >
                    <TiThumbsDown />
                  </button>
                </>
              )}
            </div>
          </>
        )}
        {props.save ? (
          <div className='fb100'>
            {cardSaved ? (
              <p>in Deck gespeichert</p>
            ) : (
              <button onClick={handleCardSave}>
                <HiOutlineSaveAs />
              </button>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Card;
