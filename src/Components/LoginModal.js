import React, { useState } from 'react';
import './Modal.css';
const LoginModal = (props) => {
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
              <h2>KNOWLEDGE DECKS&trade;</h2>

              <h3>
                <sup>Thema:</sup>
                {props.topic}
              </h3>
              <button onClick={props.resetGame}>reset game</button>
            </div>

            <div className="neo-box-inward">
              <form>
                <div class="form-group">
                  <label>
                    <input
                      type="text"
                      class="form-control"
                      name="name"
                      placeholder="your name"
                      onChange={handleName}
                      maxlength="10"
                      required="required"
                      autocomplete="off"
                    />
                  </label>{' '}
                </div>

                <div class="form-group">
                  <label>Wähle deine Rolle:</label>

                  <div class="form-check">
                    <label class="form-check-label">
                      Pro
                      <input
                        class="form-check-input"
                        type="radio"
                        name="role"
                        value="affirmative"
                        onChange={props.handleRadioChange}
                      />{' '}
                    </label>
                  </div>

                  <div class="form-check">
                    <label class="form-check-label">
                      Contra
                      <input
                        class="form-check-input"
                        type="radio"
                        name="role"
                        value="negative"
                        onChange={props.handleRadioChange}
                      />{' '}
                    </label>
                  </div>

                  <div class="form-check">
                    <label class="form-check-label">
                      Richter
                      <input
                        class="form-check-input"
                        type="radio"
                        name="role"
                        value="judge"
                        onChange={props.handleRadioChange}
                      />{' '}
                    </label>
                  </div>

                  <div class="form-check">
                    <label class="form-check-label">
                      Zuschauer
                      <input
                        class="form-check-input"
                        type="radio"
                        name="role"
                        value="spectator"
                        onChange={props.handleRadioChange}
                      />{' '}
                    </label>
                  </div>
                </div>

                <div class="form-group">
                  {showBtn ? (
                    <input
                      type="submit"
                      class="btn btn-primary"
                      name="set"
                      value="set"
                      onClick={handleSubmitBtn}
                    />
                  ) : null}
                </div>
              </form>
            </div>

            <div className="neo-box-inward">
              <h2>verbundene Spieler:</h2>
              <p>PRO: {props.aff}</p>
              <p>CONTRA: {props.neg}</p>
              <p>RICHTER: {props.judge}</p>
            </div>

            {props.gameReady ? (
              <button className="BUTTON_START" onClick={props.handleStartGame}>
                start game!
              </button>
            ) : (
              <>
                <p>Warte auf weitere Spieler...</p>
                <div class="spinner-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
