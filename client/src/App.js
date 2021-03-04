import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

import './Components/CardTable.js';
import CardTable from './Components/CardTable.js';
import './App.css';
import Player from './Components/Player';

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
      <div className="app-header">
        <h4>claim:</h4>
        <h1 className="claim-header">pineapple belongs on pizza</h1>

        <Player className="judge" />
      </div>

      <p>
        It's <time dateTime={response}>{response}</time>
      </p>
      <CardTable />
      <div className="bottom-section">
        <Player />
        <input></input>
        <Player />
      </div>
    </>
  );
}

export default App;
