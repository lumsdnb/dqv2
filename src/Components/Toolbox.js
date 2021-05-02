import React, { useState } from 'react';

import './Toolbox.css';
import { GiBangingGavel } from 'react-icons/gi';

const Toolbox = (props) => {
  const [yourArgument, setYourArgument] = useState('');
  const [cardType, setCardType] = useState('Argument');
  const [cardSource, setCardSource] = useState('');
  const [newTopic, setNewTopic] = useState('');

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
    if (e === '') return;
    if (yourArgument === '') return;
    const cardObject = {
      body: yourArgument,
      type: cardType,
      upVotes: 0,
      downVotes: 0,
      numberOfQuestions: 0,
    };
    if (cardType === 'fact') {
      cardObject.source = cardSource;
    }

    props.sendMessage(cardObject);

    document.getElementById('toolbox-form').reset();
    setYourArgument('');
  }

  function handleNewTopic(e) {
    setNewTopic(e.target.value);
  }

  function requestNewTopic() {
    if (newTopic !== '') {
      props.requestNewTopic(newTopic);
      document.getElementById('topic-form').reset();
      setNewTopic('');
    }
  }

  const spectatorView = () => {
    return (
      <div className='spectator-board'>
        <button onClick={props.playWoo}>woo</button>
        <button onClick={props.playBoo}>boo</button>
        <button onClick={props.playAirhorn}>airhorn</button>
      </div>
    );
  };

  return (
    <div style={{ height: '100vh' }}>
      <div class='select-buttons'>
        <button
          className={cardType === 'Argument' ? 'select-highlight' : null}
          type='button'
          name='card_type'
          value='Argument'
          onClick={handleCardType}
        >
          Argument
        </button>
        <button
          className={cardType === 'fact' ? 'select-highlight' : null}
          type='button'
          name='card_type'
          value='Fakt'
          onClick={handleCardType}
        >
          Fakt
        </button>
        <button
          className={cardType === 'question' ? 'select-highlight' : null}
          type='button'
          name='card_type'
          value='question'
          onClick={handleCardType}
        >
          Frage
        </button>
      </div>

      <form id='toolbox-form'>
        <textarea
          id='cardform'
          className='form-textarea'
          onChange={handleArgument}
          maxLength='200'
        />
        {cardType === 'fact' ? (
          <textarea
            id='cardsource'
            className='source-field'
            onChange={handleCardSource}
          >
            source pls
          </textarea>
        ) : null}

        <button type='button' className='form-btn' onClick={sendMessage}>
          Karte spielen
        </button>
        <form id='topic-form'>
          <textarea
            id='topicform'
            className='form-textarea'
            onChange={handleNewTopic}
            maxLength='200'
          />
        </form>
        <button type='button' className='form-btn' onClick={requestNewTopic}>
          Neues Thema vorschlagen
        </button>
      </form>
    </div>
  );
};

export default Toolbox;
