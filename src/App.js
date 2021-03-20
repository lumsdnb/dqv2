import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

import CardTable from './Components/CardTable.js';
import Player from './Components/Player.js';
//import MainForm from './Components/MainForm.js';
import Chat from './Components/Chat.js';
import Modal from './Components/Modal.js';
import UserList from './Components/UserList.js';
import MainForm from './Components/MainForm.js';

import './App.css';
import './Components/MainForm.css';

import useSound from 'use-sound';
import gavelSound from './sounds/gavel-2.mp3';

const ENDPOINT = 'http://127.0.0.1:4001';
const herokuENDPOINT = 'https://cardgame-server-master.herokuapp.com:4001';
const piENDPOINT = 'http://192.168.2.199:4001';

const App = () => {
  const [yourID, setYourID] = useState();
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState();
  const [affirmativeID, setAffirmativeID] = useState('');
  const [yourUnsentArgument, setYourUnsentArgument] = useState('');
  const [NegativeID, setNegativeID] = useState('');
  const [judgeMessage, setJudgeMessage] = useState('guilty');
  const [canSend, setCanSend] = useState(true);
  const [showRuling, setShowRuling] = useState(false);
  const [debateClaim, setDebateClaim] = useState('pineapple belongs on pizza');
  const [game, setGame] = useState({});

  const [userList, setUserList] = useState([]);
  const [cardList, setCardList] = useState([]);

  const [judgeCanAdvance, setJudgeCanAdvance] = useState([])
  //todo: implement card array )doesnt work atm

  //const [messages, setMessages] = useState([]);
  //setaffirmativeMessages((oldMsgs) => [...oldMsgs, message]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect(ENDPOINT);
    socketRef.current.on('your id', (id) => {
      setYourID(id);
    });
    socketRef.current.on('topic', (topic) => {
      setDebateClaim(topic);
    });
    socketRef.current.on('message', (list) => {
      setCardList(list);
    });
    socketRef.current.on('game', (game) => {
      setCardList(game.cardList);
      setGame(game);
      console.log(game);
    });
    socketRef.current.on('judge ruling', (ruling) => {
      setJudgeMessage(ruling);
      setShowRuling(true);
    });
  }, []);

  const setTopic = () => {
    socketRef.current.emit('set topic', debateClaim);
  };

  function sendMessage(e) {
    if (e == '') return;
    if (canSend) {
      const messageObject = {
        body: e,
        role: role,
        judgeRating: 0,
        spectatorRating: 0,
      };
      //setCanSend(false);
      socketRef.current.emit('send message', messageObject);
      setYourUnsentArgument('');
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
      name: userName,
      role: role,
    };
    socketRef.current.emit('set user', messageObject);
  }

  const rateCard = (index, rating) => {
    const msgObj = {
      index: index,
      rating: rating,
    };
    socketRef.current.emit('rate card', msgObj);
  };

  function closeModal() {
    setShowRuling(false);
  }

  const handleSound = () => {
    play();
  };

  const [play] = useSound(gavelSound, {
    volume: 0.8,
  });

  const handleDebateField = (e) => {
    setDebateClaim(e.target.value);
  };

  const nextRound = () => {
    socketRef.current.emit('next round');
  };

  return (
    <>
      <div
        class={
          role == 'judge' ? 'grid-container-judge' : 'grid-container-player'
        }
      >
        <div class="title-claim">
          <h1 className="claim-header">
            <sup>
              <i>claim: </i>
            </sup>
            {debateClaim}
          </h1>
          <h3>Round hey {game.round }</h3>
        </div>
        <div class="chat">
          <textarea
            id="cardform"
            className="form-textarea"
            onChange={handleDebateField}
          />{' '}
          <button onClick={setTopic}>set claim</button>
          <UserList
            aff={game.affirmativeName}
            neg={game.negativeName}
            judge={game.judgeName}
            handleRadioChange={handleRadioChange}
            handleSetUser={handleSetuser}
            handleNameChange={handleNameChange}
          />
        </div>
        {role == 'affirmative' || role == 'negative' ? (
          <>
            <div className="player1">
              <Player name={userName} role={role} />
            </div>
            <div className="player2">
              <Player name="player2" role="negative" />
            </div>
          </>
        ) : null}
        {role == 'judge' ? (
          <div class="players">
            <Player name={game.affirmativeName} role={'affirmative'} />
            <Player name={game.negativeName} role="negative" />
          </div>
        ) : null}
        <div class="toolbox">
          {role == 'spectator' ? null : (
            <MainForm onChange={handleChange} handleSubmit={sendMessage} />
          )}

          {role == 'judge' ? (
            <>
              <button onClick={handleSound}>gavel</button>
              {judgeCanAdvance?<button onClick={nextRound}>next round</button>:null}
              <button>finish game</button>
            </>
          ) : null}
          {role == 'spectator' ? (
            <>
              <button>cheer</button>
              <button>throw tomato</button>
            </>
          ) : null}
        </div>

        <CardTable cardList={cardList} rateCard={rateCard} userRole={role} />

        <div class="judge">
          <Player name={game.judgeName} role="judge" />
        </div>
      </div>

      <Modal
        showModal={showRuling}
        verdict={judgeMessage}
        closeModal={closeModal}
      />
    </>
  );
};

export default App;
