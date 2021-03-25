import React, { useState } from 'react';
import './Modal.css';
const FinalModal = (props) => {
  const [showBtn, setShowBtn] = useState(false);

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
      <div className="login-modal">
        <div>
          <div>
            <div className="neo-box-outward">
              <h2>ENDE</h2>

              <h3>
                <sup>Thema:</sup>
                {props.topic}
              </h3>
            </div>

            <div className="neo-box-inward">
              <h2>Ergebnis:</h2>
              <h3>
                {props.game.affirmativeName} : {props.finalVotes.aff}
              </h3>
              <h3>
                {props.game.negativeName} : {props.finalVotes.neg}
              </h3>
              <h3>
                {props.game.judgeName} : {props.finalVotes.judge}
              </h3>
            </div>

            <p>Warte auf Ergebnisse...</p>
            <div class="spinner-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinalModal;
