import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

import CardTable from './Components/CardTable.js';
import Player from './Components/Player.js';
import MainForm from './Components/MainForm.js';
import Chat from './Components/Chat.js';

import './App.css';
import './Components/MainForm.css';

const ENDPOINT = 'http://127.0.0.1:4001';

const App = () => {
  const [yourID, setYourID] = useState();
  const [role, setRole] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect(ENDPOINT);
    socketRef.current.on('your id', (id) => {
      setYourID(id);
      console.log(id);
    });
    socketRef.current.on('message', (message) => {
      setMessage(message.body);
      receivedMessage(message.body);
    });
  }, []);

  function receivedMessage(message) {
    setMessages((oldMsgs) => [...oldMsgs, message]);
  }

  function sendMessage(e) {
    e.preventDefault();
    const messageObject = {
      body: message,
      id: yourID,
    };
    socketRef.current.emit('send message', messageObject);
  }

  function handleChange(e) {
    setMessage(e.target.value);
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
          <CardTable arg1={message} arg2="examination card" />
        </div>
        <div class="judge">
          <Player name="bob" role="judge" />
        </div>
      </div>
    </>
  );
};

export default App;
