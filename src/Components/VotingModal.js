import React, { useState } from 'react';
import Card from './Card.js';
import './Modal.css';
import { FaBlackTie } from 'react-icons/fa';

import Player from './Player.js';

const VotingModal = (props) => {
  const [canVote, setCanVote] = useState(true);
  const [yourWinner, setYourWinner] = useState('unset');
  const [ruling, setRuling]=useState("")


  function handleSubmitBtn(event) {
    event.preventDefault();
    props.handleSetUser(event.target.value);
  }

  const handleRuling = (e) => {
    setRuling(e.target.value)
  };
  
  const sendRuling = ()=>{
    props.sendRuling(ruling);
  }

  function selectVote(e) {
    setCanVote(false);
    setYourWinner(e);
  }

  const sendVote = () => {
    if (props.role == "judge") {
      sendRuling()
    }
    props.voteFor(yourWinner);
  };


  const round1 = props.usedCards[0].map((c, index) => (
    <div key={index} className="voting-cards-inner">
      {c.body}
    </div>
  ));
  const round2 = props.usedCards[1].map((c, index) => (
    <div key={index} className="voting-cards-inner">
      {c.body}
    </div>
  ));
  const round3 = props.usedCards[2].map((c, index) => (
    <div key={index} className="voting-cards-inner">
      {c.body}
    </div>
  ));
  const round4 = props.usedCards[3].map((c, index) => (
    <div key={index} className="voting-cards-inner">
      {c.body}
    </div>
  ));

  return (
    <>
      <div className="voting-modal">
        <div className="three-columns">
          <div className="left-column">
            <div className="card-smol">
              <h3>Argument 1</h3>
              {props.usedCards[0].body}
            </div>
            <div className="card-smol">
              <h3>Argument 3</h3>
              {props.usedCards[2].body}
            </div>
          </div>
          <div className="center-column">
            <div className="neo-box-outward">
              <h4>
                <sup>Thema:</sup>
                {props.topic}
              </h4>
              <h2>Wer hat am besten argumentiert?</h2>
            </div>
            <div className="neo-box-inward">
              <div className="flex-row">
                <button
                  style={{
                    border:
                      yourWinner == 'aff' ? 'medium dashed green' : 'none',
                  }}
                  onClick={() => {
                    selectVote('aff');
                  }}
                >
                  <Player name={props.aff} role={'pro'} />
                </button>
                <button
                  style={{
                    border:
                      yourWinner == 'tie' ? 'medium dashed green' : 'none',
                  }}
                  onClick={() => {
                    selectVote('tie');
                  }}
                >
                  <FaBlackTie className="big-icon" />
                </button>
                <button
                  style={{
                    border:
                      yourWinner == 'neg' ? 'medium dashed green' : 'none',
                  }}
                  onClick={() => {
                    selectVote('neg');
                  }}
                >
                  <Player name={props.neg} role={'contra'} />
                </button>
              </div>
              <div className="neo-box-outward">
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
          <div className="right-column">
            <div className="card-smol">
              <h3>Argument 2</h3>
              {props.usedCards[1].body}
            </div>
            <div className="card-smol">
              <h3>Argument 4</h3>
              {props.usedCards[3].body}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VotingModal;
