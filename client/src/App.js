import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

import './Components/CardTable.js';
import CardTable from './Components/CardTable.js';
import './App.css';
import Player from './Components/Player';
import MainForm from './Components/MainForm.js';
import Chat from './Components/Chat.js';

const ENDPOINT = 'http://127.0.0.1:4001';

function App() {
  const [response, setResponse] = useState('');

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('FromAPI', (data) => {
      setResponse(data);
    });
  }, []);

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
          <MainForm />
        </div>
        <div class="title-claim">
          <h4>claim:</h4>
          <h1 className="claim-header">pineapple belongs on pizza</h1>
        </div>
        <div class="table">
          <CardTable />
        </div>
        <div class="judge">
          <Player name="bob" role="judge" />
        </div>
      </div>

      <p>
        It's <time dateTime={response}>{response}</time>
      </p>
    </>
  );
}

export default App;
