import React, { useState } from 'react';

import { TiThumbsUp, TiThumbsDown } from 'react-icons/ti';
import { HiOutlineSaveAs } from 'react-icons/hi';
import { FaRegSave } from 'react-icons/fa';
import { RiQuestionnaireLine, RiReplyAllFill } from 'react-icons/ri';

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

  const saveCard = (c) => {
    console.log('s');
    setWasRated(99);
    props.saveToDeck(c);
  };

  const handleCardSave = () => {
    setCardSaved(true);
  };

  return (
    <>
      <div className={props.save ? 'card' : 'card card-hover'}>
        {props.size === 'smol' ? null : (
          <span className='card-above-top'>Karte {props.index}</span>
        )}
        <h4 className='card-top'>{props.type}</h4>
        <p className='card-body'>{props.claim}</p>
        {props.source ? (
          <a href={props.source} target='_blank' rel='noreferrer'>
            source
          </a>
        ) : null}

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
          {props.size === 'smol' ? null : (
            <div className='card-buttons'>
              <button
                className={wasRated === -1 ? 'select-highlight' : '--red'}
                onClick={() => voteOnCard(-1)}
              >
                <TiThumbsDown />
              </button>
              {wasRated === 99 ? null : (
                <button onClick={() => saveCard(props.index)}>
                  <FaRegSave />
                </button>
              )}
              <button
                className={wasRated === 3 ? 'select-highlight' : null}
                onClick={() => voteOnCard(3)}
              >
                <RiQuestionnaireLine />
              </button>
              <button onClick={(id) => props.replyToCard(props.id)}>
                <RiReplyAllFill />
              </button>

              <button
                className={wasRated === 1 ? 'select-highlight' : '--green'}
                onClick={() => voteOnCard(1)}
              >
                <TiThumbsUp />
              </button>
            </div>
          )}
          {/*<progress value={'50'} max='100'></progress>*/}
        </div>

        {props.save ? (
          <div className='fb100'>
            {cardSaved ? (
              <p>in Deck gespeichert</p>
            ) : (
              <button onClick={() => handleCardSave()}>
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
