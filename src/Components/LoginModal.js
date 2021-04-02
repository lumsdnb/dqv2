import React, { useState } from 'react';
import './Modal.css';

import { RiSwordFill } from 'react-icons/ri';
import { GiBangingGavel, GiConfirmed } from 'react-icons/gi';
import { GrOverview } from 'react-icons/gr';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';

import AvatarGen from './AvatarGen.js';

const LoginModal = (props) => {
  const [showBtn, setShowBtn] = useState(false);
  const [userHasJoined, setUserHasJoined] = useState(false);
  const [debateTitle, setDebateTitle] = useState('null');
  const [debateID, setDebateID] = useState(0);
  const [textAreaCustom, setTextAreaCustom] = useState('');

  function handleSubmitBtn(event) {
    event.preventDefault();
    props.handleSetUser(event.target.value);
  }

  function handleName(e) {
    e.preventDefault();
    setShowBtn(true);
    props.handleNameChange(e);
  }

  function handleAviChange(e) {
    props.changeAvi(e);
  }

  const handleCustomTopic = (e) => {
    setTextAreaCustom(e.target.value);
  };

  const setCustomTopic = () => {
    props.setTopic(textAreaCustom);
    props.handleTopicID(-1);
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
                {props.topicID == -1
                  ? textAreaCustom
                  : props.debateTopics[props.topicID]}
              </h2>
            </div>
            <button type='button' onClick={() => changeDebateTopic(1)}>
              <AiFillCaretRight />
            </button>
          </div>
          <div className='login-title neo-box-inward'>
            <h2 style={{ textAlign: 'center' }}>DEBATE.QUEST</h2>
          </div>
          <div className='extra-panel'>
            <button onClick={props.resetGame}>Spiel zurücksetzen</button>
          </div>
          <div className='extra-panel2'>
            <div classname='flex-split'>
              <input
                type='textarea'
                onChange={handleCustomTopic}
                maxLength='100'
              />
              <button onClick={setCustomTopic}>eigenes Thema</button>
            </div>
          </div>
          <div className='login-settings'>
            <div>
              {userHasJoined ? null : (
                <div className='neo-box-split'>
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
                        <button
                          type='button'
                          onClick={(e) => props.setRole('debater')}
                          className={
                            props.role == 'debater' ? 'select-highlight' : null
                          }
                          title='debattierer'
                        >
                          <RiSwordFill />
                        </button>

                        <button
                          type='button'
                          onClick={(e) => props.setRole('judge')}
                          className={
                            props.role == 'judge' ? 'select-highlight' : null
                          }
                          title='richter'
                        >
                          <GiBangingGavel />
                        </button>

                        <button
                          type='button'
                          onClick={(e) => props.setRole('spectator')}
                          className={
                            props.role == 'spectator'
                              ? 'select-highlight'
                              : null
                          }
                          title='zuschauer'
                        >
                          <GrOverview />
                        </button>
                      </div>
                      <div className='neo-box-split'>
                        {props.userName && props.role ? (
                          <>
                            <div className='login-role-display'>
                              {props.role}
                            </div>
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
                        ) : null}
                      </div>
                    </div>
                  </form>
                  <div>
                    <AvatarGen
                      canEdit='true'
                      handleAviChange={handleAviChange}
                      style={{ width: '5rem', height: '5rem' }}
                    />
                  </div>
                </div>
              )}
              <div className='neo-box-split'>
                <div>
                  <p>
                    <RiSwordFill /> 1: {props.game.debater1Name}
                  </p>
                  <p>
                    <RiSwordFill /> 2: {props.game.debater2Name}
                  </p>
                  <p>
                    <GiBangingGavel /> {props.game.judgeName}
                  </p>
                </div>
                <div>
                  {props.gameReady ? (
                    <button
                      className='BUTTON_START'
                      onClick={props.handleStartGame}
                    >
                      Spiel starten!
                    </button>
                  ) : (
                    <div className='flex-item-center'>
                      <p>Warte auf weitere Spieler...</p>
                      <div className='spinner-ellipsis'>
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
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default LoginModal;
