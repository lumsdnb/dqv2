import React, { useState } from 'react';
import Card from './Card.js';
import './Modal.css';
import { FaBlackTie } from 'react-icons/fa';

import Player from './Player.js';

const VotingModal = (props) => {
  const [canVote, setCanVote] = useState(true);
  const [yourWinner, setYourWinner] = useState('unset');
  const [ruling, setRuling] = useState('');

  function handleSubmitBtn(event) {
    event.preventDefault();
    props.handleSetUser(event.target.value);
  }

  const handleRuling = (e) => {
    setRuling(e.target.value);
  };

  const sendRuling = () => {
    props.sendRuling(ruling);
  };

  function selectVote(e) {
    setCanVote(false);
    setYourWinner(e);
  }

  const sendVote = () => {
    if (props.role == 'judge') {
      sendRuling();
    }
    props.voteFor(yourWinner);
  };

  const round1 = props.usedCards[0].map((c, i) => (
    <Card
      size='smol'
      key={c.i}
      claim={c.body}
      index={i}
      role={c.role}
      type={c.type}
      spectatorRating={c.spectatorRating}
      judgeRating={c.judgeRating}
    />
  ));

  const round2 = props.usedCards[1].map((c, i) => (
    <Card
      size='smol'
      key={c.i}
      claim={c.body}
      index={i}
      role={c.role}
      type={c.type}
      spectatorRating={c.spectatorRating}
      judgeRating={c.judgeRating}
    />
  ));

  const round3 = props.usedCards[2].map((c, i) => (
    <Card
      size='smol'
      key={c.i}
      claim={c.body}
      index={i}
      role={c.role}
      type={c.type}
      spectatorRating={c.spectatorRating}
      judgeRating={c.judgeRating}
    />
  ));
  const round4 = props.usedCards[3].map((c, i) => (
    <Card
      size='smol'
      key={c.i}
      claim={c.body}
      index={i}
      role={c.role}
      type={c.type}
      spectatorRating={c.spectatorRating}
      judgeRating={c.judgeRating}
    />
  ));

  return (
    <>
      <div className='voting-modal'>
        <div className='four-rows'>
          <div className='scrolling-cards'>{round1}</div>
          <div className='scrolling-cards'>{round2}</div>
          <div className='scrolling-cards'>{round3}</div>
          <div className='scrolling-cards'>{round4}</div>
        </div>
        <div className='center-column'>
          <div className='neo-box-outward'>
            <h4>
              <sup>Thema:</sup>
              {props.topic}
            </h4>
            <h2>Wer hat am besten argumentiert?</h2>
          </div>
          <div className='neo-box-inward'>
            <div className='flex-row'>
              <button
                style={{
                  border: yourWinner == 'aff' ? 'medium dashed green' : 'none',
                }}
                onClick={() => {
                  selectVote('aff');
                }}
              >
                <Player
                  avi={props.game.affirmativeAvi}
                  name={props.game.affirmativeName}
                  role={'pro'}
                />
              </button>
              <button
                style={{
                  border: yourWinner == 'tie' ? 'medium dashed green' : 'none',
                }}
                onClick={() => {
                  selectVote('tie');
                }}
              >
                <FaBlackTie className='big-icon' />
              </button>
              <button
                style={{
                  border: yourWinner == 'neg' ? 'medium dashed green' : 'none',
                }}
                onClick={() => {
                  selectVote('neg');
                }}
              >
                <Player
                  avi={props.game.negativeAvi}
                  name={props.game.negativName}
                  role={'contra'}
                />
              </button>
            </div>
            <div className='neo-box-outward'>
              {props.role == 'judge' ? (
                <>
                  <h4>dein Urteil:</h4>
                  <textarea onChange={handleRuling} />
                </>
              ) : null}
              {yourWinner != 'unset' ? (
                <button onClick={sendVote}>abstimmen</button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VotingModal;
