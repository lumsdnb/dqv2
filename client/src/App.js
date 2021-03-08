import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

import CardTable from './Components/CardTable.js';
import Player from './Components/Player.js';
//import MainForm from './Components/MainForm.js';
import Chat from './Components/Chat.js';

import './App.css';
import './Components/MainForm.css';

const ENDPOINT = 'http://127.0.0.1:4001';

const App = () => {
  const [yourID, setYourID] = useState();
  const [role, setRole] = useState();
  const [affirmativeMessage, setAffirmativeMessage] = useState('');
  const [yourUnsentArgument, setYourUnsentArgument] = useState('');
  const [NegativeMessage, setNegativeMessage] = useState('');
  const [argType, setArgType] = useState('');

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
      if (message.type == 'affirmative') {
        setAffirmativeMessage(message.body);
      }
      if (message.type == 'negative') {
        setNegativeMessage(message.body);
      }
    });
  }, []);

  function sendMessage(e) {
    e.preventDefault();
    const messageObject = {
      body: yourUnsentArgument,
      id: yourID,
      type: argType,
    };
    socketRef.current.emit('send message', messageObject);
  }

  function handleChange(e) {
    setYourUnsentArgument(e.target.value);
  }

  function handleRadioChange(e) {
    setArgType(e.target.value);
  }

  return (
    <>
      <div class="grid-container">
        <div class="chat">
          <Chat />
        </div>
        <div class="player1">
          <Player name="player1" role=" affirmative" />
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
            <div>
              <input
                type="radio"
                id="negative"
                name="role"
                value="affirmative"
                onChange={handleRadioChange}
              />
              <label for="affirmative">affirmative</label>
            </div>
            <div>
              <input
                type="radio"
                id="negative"
                name="role"
                value="negative"
                onChange={handleRadioChange}
              />
              <label for="negative">negative</label>
            </div>
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
        <div class="table">
          <CardTable arg1={affirmativeMessage} arg2={NegativeMessage} />
        </div>
        <div class="judge">
          <Player name="bob" role="judge" />
        </div>
      </div>
    </>
  );
};

export default App;
