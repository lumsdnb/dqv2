import React, { useState } from 'react';
import './Modal.css';
import { FaBlackTie } from 'react-icons/fa';

import Player from './Player.js';

const VotingModal = (props) => {
  const [canVote, setCanVote] = useState(true);
  const [yourWinner, setYourWinner] = useState('unset');

  function handleSubmitBtn(event) {
    event.preventDefault();
    props.handleSetUser(event.target.value);
  }

  function selectVote(e) {
    setCanVote(false);
    setYourWinner(e);
  }

  const sendVote = () => {
    props.voteFor(yourWinner);
  };

  return (
    <>
      <div className="three-columns">
        <div>bla</div>

        <div className="voting-modal">
          <div>
            <div>
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
                      <textarea />
                    </>
                  ) : null}
                  {yourWinner != 'unset' ? (
                    <button onClick={sendVote}>abstimmen</button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>bla</div>
      </div>
    </>
  );
};

export default VotingModal;
