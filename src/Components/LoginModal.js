import React, { useState } from "react";
import "./Modal.css";

import { RiSwordFill } from "react-icons/ri";
import { GiBangingGavel, GiConfirmed } from "react-icons/gi";
import { GrOverview } from "react-icons/gr";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

import AvatarGen from "./AvatarGen.js";

const LoginModal = (props) => {
  const [userHasJoined, setUserHasJoined] = useState(false);
  const [debateID, setDebateID] = useState(0);
  const [textAreaCustom, setTextAreaCustom] = useState("");

  function handleSubmitBtn(event) {
    event.preventDefault();
    props.handleSetUser(event.target.value);
    setUserHasJoined(true);
  }

  function handleName(e) {
    e.preventDefault();
    props.handleNameChange(e);
  }

  const handleResetGame = () => {
    props.resetGame();
    setUserHasJoined(false);
    setTextAreaCustom("");
    setDebateID(-1);
  };

  function handleAviChange(e) {
    props.changeAvi(e);
    props.changeTempAvi(e);
    setDebateID(e);
  }

  const handleCustomTopic = (e) => {
    setTextAreaCustom(e.target.value);
  };

  const setCustomTopic = () => {
    if (textAreaCustom !== "") {
      props.setTopic(textAreaCustom);
      props.handleTopicID(-1);
    }
  };

  const changeDebateTopic = (e) => {
    let temp = props.topicID + e;
    console.log(temp);

    if (temp >= props.debateTopics.length) {
      props.handleTopicID(0);
    } else if (temp < -1) {
      props.handleTopicID(props.debateTopics.length - 1);
    } else props.handleTopicID(temp);

    setDebateID(props.topicID);
  };

  return (
    <>
      <div className='login-modal'>
        <div className='login-grid'>
          <div className='login-topic-carousel'>
            <button type='button' onClick={() => changeDebateTopic(-1)}>
              <AiFillCaretLeft />
            </button>
            <div className='card'>
              <h2>
                {props.topicID === -1
                  ? props.topic
                  : props.debateTopics[props.topicID]}
              </h2>
            </div>
            <button type='button' onClick={() => changeDebateTopic(1)}>
              <AiFillCaretRight />
            </button>
          </div>
          <div className='login-title neo-box-inward'>
            <h2 classname='login-title'>Debate.Quest</h2>
          </div>
          <div className='extra-panel'>
            <button onClick={handleResetGame}>Spiel zurücksetzen</button>
          </div>
          <div className='extra-panel2'>
            <div classname='flex-split'>
              <input
                className='form-name'
                type='textarea'
                onChange={handleCustomTopic}
                maxLength='100'
              />
              <button onClick={setCustomTopic}>eigenes Thema</button>
            </div>
          </div>
          <div className='login-settings'>
            <div>
              {props.gameReady && userHasJoined ? (
                <div className='neo-box-split'>
                  <button
                    className='BUTTON_START'
                    onClick={props.handleStartGame}
                  >
                    {props.role === "spectator"
                      ? "Spiel beobachten"
                      : "Spiel starten!"}
                  </button>{" "}
                </div>
              ) : (
                <div className='neo-box-split'>
                  {userHasJoined ? (
                    <div className='flex-item-center fb100'>
                      warte auf Spieler...
                      <div className='spinner-ellipsis'>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                  ) : (
                    <form>
                      <div className='form-group'>
                        <input
                          type='text'
                          className='form-name'
                          name='name'
                          placeholder='dein Name'
                          onChange={handleName}
                          maxLength='30'
                          required='required'
                          autocomplete='off'
                        />
                      </div>

                      <div className='form-group'>
                        <div className='select-buttons'>
                          {props.game.debater1Name === "" ? (
                            <button
                              type='button'
                              onClick={(e) => props.setRole("player1")}
                              className={
                                props.role === "player1"
                                  ? "select-highlight"
                                  : null
                              }
                              title='Spieler 1'
                            >
                              <RiSwordFill />
                            </button>
                          ) : null}
                          {props.game.debater2Name === "" ? (
                            <button
                              type='button'
                              onClick={(e) => props.setRole("player2")}
                              className={
                                props.role === "player2"
                                  ? "select-highlight"
                                  : null
                              }
                              title='Spieler 2'
                            >
                              <RiSwordFill />
                            </button>
                          ) : null}

                          {props.game.judgeName === "" ? (
                            <button
                              type='button'
                              onClick={(e) => props.setRole("judge")}
                              className={
                                props.role === "judge"
                                  ? "select-highlight"
                                  : null
                              }
                              title='Richter'
                            >
                              <GiBangingGavel />
                            </button>
                          ) : null}

                          <button
                            type='button'
                            onClick={(e) => props.setRole("spectator")}
                            className={
                              props.role === "spectator"
                                ? "select-highlight"
                                : null
                            }
                            title='Zuschauer'
                          >
                            <GrOverview />
                          </button>
                        </div>
                        {userHasJoined ? null : (
                          <div className='neo-box-split'>
                            <div>
                              <AvatarGen
                                canEdit='true'
                                handleAviChange={handleAviChange}
                                style={{ width: "5rem", height: "5rem" }}
                              />
                            </div>
                            {props.userName && props.role && debateID !== -1 ? (
                              <>
                                <button
                                  type='button'
                                  className='BUTTON_START'
                                  name='set'
                                  value='set'
                                  onClick={handleSubmitBtn}
                                >
                                  <GiConfirmed />
                                </button>
                              </>
                            ) : (
                              <button
                                type='button'
                                className='BUTTON_INACTIVE'
                                name='set'
                                value='set'
                              >
                                <GiConfirmed />
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </form>
                  )}
                </div>
              )}
              <div className='neo-box-inward'>
                <div className='triangular-flex-container'>
                  <div className='login-flex-player'>
                    <div className='center-flex'>
                      <GiBangingGavel className='big-icon' />
                      <AvatarGen
                        className='fb100'
                        i={props.game.judgeAvi}
                        style={{ width: "3.8rem", height: "3.8rem" }}
                      />
                      <div>{props.game.judgeName}</div>
                    </div>
                  </div>

                  <div className='login-player fb50'>
                    <div className='login-flex-player'>
                      <strong>?</strong>
                      <AvatarGen
                        className='fb100'
                        i={props.game.debater1Avi}
                        style={{ width: "3.8rem", height: "3.8rem" }}
                      />
                      <RiSwordFill className='big-icon' />{" "}
                      <div>{props.game.debater1Name}</div>
                    </div>
                  </div>
                  <div className='login-player fb50'>
                    <div className='login-flex-player'>
                      <strong>?</strong>
                      <AvatarGen
                        className='fb100'
                        i={props.game.debater2Avi}
                        style={{ width: "3.8rem", height: "3.8rem" }}
                      />
                      <RiSwordFill className='big-icon' />{" "}
                      <div>{props.game.debater2Name}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default LoginModal;
