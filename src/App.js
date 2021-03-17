import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

import CardTable from './Components/CardTable.js';
import Player from './Components/Player.js';
//import MainForm from './Components/MainForm.js';
import Chat from './Components/Chat.js';
import Modal from './Components/Modal.js';

import './App.css';
import './Components/MainForm.css';
import MainForm from './Components/MainForm.js';
import UserList from './Components/UserList.js';

import useSound from 'use-sound';
import gavelSound from './sounds/gavel-2.mp3';

const ENDPOINT = 'http://127.0.0.1:4001';
const productionENDPOINT = '192.168.2.199:4001';

const App = () => {
  const [yourID, setYourID] = useState();
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState();
  const [affirmativeMessage, setAffirmativeMessage] = useState('');
  const [yourUnsentArgument, setYourUnsentArgument] = useState('');
  const [NegativeMessage, setNegativeMessage] = useState('');
  const [judgeMessage, setJudgeMessage] = useState('');
  const [canSend, setCanSend] = useState(true);
  const [showRuling, setShowRuling] = useState(false);

  const [userList, setUserList] = useState([]);

  //const [messages, setMessages] = useState([]);
  //setaffirmativeMessages((oldMsgs) => [...oldMsgs, message]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect(ENDPOINT);
    socketRef.current.on('your id', (id) => {
      setYourID(id);
    });
    socketRef.current.on('message', (message) => {
      console.log(message.id);
      console.log(yourID);

      switch (message.type) {
        case 'affirmative':
          setAffirmativeMessage(message.body);

          break;
        case 'negative':
          setNegativeMessage(message.body);

          break;
        case 'judge':
          setJudgeMessage(message.body);
          setShowRuling(true);
          break;

        default:
          break;
      }
    });
    socketRef.current.on('set user', (user) => {});
    socketRef.current.on('user list', (users) => {
      setUserList(users);
      console.log(users);
    });
  }, []);

  function sendMessage(e) {
    e.preventDefault();
    if (canSend) {
      const messageObject = {
        body: yourUnsentArgument,
        id: yourID,
        type: role,
      };
      //setCanSend(false);
      socketRef.current.emit('send message', messageObject);
    }
  }

  function setName(name) {
    setUserName(name);
  }

  function handleChange(e) {
    setYourUnsentArgument(e.target.value);
  }

  function handleRadioChange(e) {
    setRole(e.target.value);
  }

  function handleNameChange(e) {
    setUserName(e.target.value);
  }

  function handleSetuser(e) {
    const messageObject = {
      id: yourID,
      name: userName,
      role: role,
    };
    socketRef.current.emit('set user', messageObject);
  }

  function closeModal() {
    setShowRuling(false);
  }

  const handleSound = () => {
    play();
  };

  const [play] = useSound(gavelSound, {
    volume: 0.5,
  });

  return (
    <>
      <div class="grid-container">
        <div class="chat">
          <UserList
            users={userList}
            handleRadioChange={handleRadioChange}
            handleSetUser={handleSetuser}
            handleNameChange={handleNameChange}
          />
        </div>
        <div class="player1">
          <Player name={userName} role={role} />
        </div>
        <div class="player2">
          <Player name="player2" role="negative" />
        </div>
        <div class="arguments">
          <form className="main-form" onSubmit={sendMessage}>
            {' '}
            <label className="form-label" for="cardform">
              Your Argument:
              <br />
              <textarea
                id="cardform"
                className="form-textarea"
                onChange={handleChange}
              />{' '}
            </label>
            <br />
            <input type="submit" className="form-btn" value="Place card" />
          </form>
        </div>
        <div class="title-claim">
          <h1 className="claim-header">
            <sup>
              <i>claim: </i>
            </sup>
            pineapple belongs on pizza
          </h1>
        </div>
        <div class="tabla">
          <CardTable arg1={affirmativeMessage} arg2={NegativeMessage} />
          <button onClick={handleSound}>gavel</button>
        </div>
        <div class="judge">
          <Player name="bob" role="judge" />
        </div>
      </div>
      <Modal
        verdict="guilty"
        showModal={showRuling}
        verdict={judgeMessage}
        closeModal={closeModal}
      />
    </>
  );
};

export default App;
