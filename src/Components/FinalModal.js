import React, { useState } from 'react';
import './Modal.css';
const FinalModal = (props) => {
  const [showBtn, setShowBtn] = useState(false);
  const doneVoting = () => {
    if (
      props.finalVotes.aff &&
      props.finalVotes.neg &&
      props.finalVotes.judge
    ) {
      return true;
    }
  };

  function handleSubmitBtn(event) {
    event.preventDefault();
    props.handleSetUser(event.target.value);
  }

  function handleName(e) {
    e.preventDefault();
    setShowBtn(true);
    props.handleNameChange(e);
  }

  return (
    <>
      <div className='login-modal'>
        <div>
          <div>
            <div className='neo-box-outward'>
              <h2>RUNDENENDE</h2>

              <h3>
                <sup>Thema:</sup>
                {props.topic}
              </h3>
            </div>

            <div className='neo-box-inward'>
              <h3>Ergebnis:</h3>
              <h5>
                {props.game.affirmativeName} : {props.finalVotes.aff}
              </h5>
              <h5>
                {props.game.negativeName} : {props.finalVotes.neg}
              </h5>
              <h5>
                {props.game.judgeName} : {props.finalVotes.judge}
              </h5>
            </div>

            <div className='neo-box-inward'>
              Richter sagt: {props.finalRuling}
            </div>

            {doneVoting ? null : (
              <div className='neo-box-outward'>
                <p>Warte auf Ergebnisse...</p>
                <div class='spinner-ellipsis'>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FinalModal;
