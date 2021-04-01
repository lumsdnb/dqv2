import React, { useState } from 'react';
import './Toolbox.css';
import { GiBangingGavel } from 'react-icons/gi';

const Toolbox = (props) => {
  const [yourArgument, setYourArgument] = useState('');
  const [cardType, setCardType] = useState('argument');
  const [cardSource, setCardSource] = useState('');
  const [canSend, setCanSend] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    if (e.target.textContent) {
      //props.handleSubmit(formState);
    }
  }

  function handleArgument(e) {
    setYourArgument(e.target.value);
  }

  function handleCardType(c) {
    setCardType(c.target.value);
  }

  const handleCardSource = (e) => {
    setCardSource(e.target.value);
  };

  function sendMessage(e) {
    if (e == '') return;
    if (cardType == 'fact') {
      const messageObject = {
        body: yourArgument,
        role: props.role,
        type: cardType,
        source: cardSource,
        judgeRating: 0,
        spectatorRating: 0,
      };
      props.sendMessage(messageObject);
    } else {
      const messageObject = {
        body: yourArgument,
        role: props.role,
        type: cardType,
        judgeRating: 0,
        spectatorRating: 0,
      };
      props.sendMessage(messageObject);
    }
  }

  const spectatorView = () => {
    return (
      <div className='spectator-board'>
        <button onClick={props.playWoo}>woo</button>
        <button onClick={props.playSlap}>slap</button>
        <button onClick={props.playAirhorn}>airhorn</button>
        <button>throw tomato?</button>
      </div>
    );
  };

  return (
    <div>
      {props.role === 'spectator' ? spectatorView : null}

      {props.role == 'judge' ? (
        <div classname='tools-judge'>
          <button className='gavel-btn' onClick={props.playGavel}>
            <GiBangingGavel />
          </button>

          <button onClick={props.nextRound}>nächste Runde</button>
        </div>
      ) : null}
      {props.role == 'affirmative' ||
      props.role == 'negative' ||
      props.role == 'debater' ? (
        <>
          <div class='select-buttons'>
            <button
              className={cardType == 'argument' ? 'select-highlight' : null}
              type='button'
              name='card_type'
              value='argument'
              onClick={handleCardType}
            >
              Arg
            </button>
            <button
              className={cardType == 'fact' ? 'select-highlight' : null}
              type='button'
              name='card_type'
              value='fact'
              onClick={handleCardType}
            >
              Fakt
            </button>
            <button
              className={cardType == 'question' ? 'select-highlight' : null}
              type='button'
              name='card_type'
              value='question'
              onClick={handleCardType}
            >
              ???
            </button>
          </div>
        </>
      ) : null}

      <textarea
        id='cardform'
        className='form-textarea'
        onChange={handleArgument}
        maxLength='200'
      />
      {cardType == 'fact' ? (
        <textarea
          id='cardsource'
          className='source-field'
          onChange={handleCardSource}
        >
          source pls
        </textarea>
      ) : null}

      <button type='button' className='form-btn' onClick={sendMessage}>
        {props.role == 'judge' ? 'Urteil fällen' : 'Karte spielen'}
      </button>
    </div>
  );
};

export default Toolbox;
