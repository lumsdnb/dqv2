import React, { useState, useEffect } from 'react';
import './Modal.css';

import { RiSwordFill } from 'react-icons/ri';
import { GiBangingGavel, GiConfirmed } from 'react-icons/gi';
import { GrOverview } from 'react-icons/gr';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';

import AvatarGen from './AvatarGen.js';

const LoginModal = (props) => {
  const [userHasJoined, setUserHasJoined] = useState(false);
  const [debateID, setDebateID] = useState(0);
  const [textAreaCustom, setTextAreaCustom] = useState('');

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
    setTextAreaCustom('');
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
    if (textAreaCustom !== '') {
      props.setTopic(textAreaCustom);
      props.handleTopicID(-1);
    }
  };

  const changeDebateTopic = (e) => {
    let temp = props.topicID + e;

    if (temp >= props.debateTopics.length) {
      props.handleTopicID(0);
    } else if (temp < -1) {
      props.handleTopicID(props.debateTopics.length - 1);
    } else props.handleTopicID(temp);

    setDebateID(props.topicID);
  };

  const spectatorList = props.spectators.map((s, i) => {
    return (
      <div>
        <AvatarGen i={s.avi} style={{ width: '3rem', height: '3rem' }} />
      </div>
    );
  });

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
            <h2 classname='login-title'>Karten Konsens</h2>
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
              {userHasJoined ? (
                <div className='neo-box-split'>
                  <button
                    className='BUTTON_START'
                    onClick={props.handleStartGame}
                  >
                    {props.role === 'spectator'
                      ? 'Spiel beobachten'
                      : 'Spiel starten!'}
                  </button>{' '}
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
                        {userHasJoined ? null : (
                          <div className='neo-box-split'>
                            <div>
                              <AvatarGen
                                canEdit='true'
                                handleAviChange={handleAviChange}
                                style={{ width: '5rem', height: '5rem' }}
                              />
                            </div>
                            {props.userName && debateID !== -1 ? (
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
              <div className='neo-box-inward --box-top-margin'></div>
              {spectatorList ? (
                <div className='neo-box-inward --box-top-margin'>
                  Spieler:
                  <div className='login-spectators'>{spectatorList}</div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default LoginModal;
