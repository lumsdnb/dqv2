import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

import CardTable from './Components/CardTable.js';
import Player from './Components/Player.js';
//import MainForm from './Components/MainForm.js';
import Chat from './Components/Chat.js';
import Modal from './Components/Modal.js';
import LoginModal from './Components/LoginModal.js';
import MainForm from './Components/MainForm.js';

import './App.css';
import './Components/MainForm.css';

import useSound from 'use-sound';
import soundGavel from './sounds/gavel-2.mp3';
import soundWoo from './sounds/woo.wav';
import soundSlap from './sounds/smol.wav';
import soundAirhorn from './sounds/airhorn.wav';
import soundBigHammer from './sounds/big-hammer.wav';

const ENDPOINT = 'http://127.0.0.1:4001';
const herokuENDPOINT = 'https://cardgame-server-master.herokuapp.com:4001';
const piENDPOINT = 'http://192.168.2.199:4001';

const App = () => {
  const [yourID, setYourID] = useState();
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState();
  const [affirmativeID, setAffirmativeID] = useState('');
  const [NegativeID, setNegativeID] = useState('');
  const [judgeID, setJudgeID] = useState('');
  const [yourUnsentArgument, setYourUnsentArgument] = useState('');
  const [judgeMessage, setJudgeMessage] = useState('guilty');
  const [canSend, setCanSend] = useState(true);
  const [showRuling, setShowRuling] = useState(false);
  const [topic, setTopic] = useState('ÖPNV sollte kostenlos sein');
  const [game, setGame] = useState({});
  const [showLogin, setShowLogin] = useState(true);

  const [chatList, setChatList] = useState([]);

  const [serverMessage, setServerMessage] = useState('');

  const [userList, setUserList] = useState([]);

  const [cardList, setCardList] = useState([]);
  const [receivedVerdict, setReceivedVerdict] = useState(false);
  const [isTyping] = useState(false);

  const [newCardType, setNewCardType] = useState();

  const [gameReady, setGameReady] = useState('');

  const [judgeCanAdvance, setJudgeCanAdvance] = useState([]);

  function onKeyPressed(e) {
    console.log(e.key);
    if (role == 'spectator') {
      switch (e.key) {
        case 'w':
          playWoo();
          break;
        case 's':
          playSlap();
          break;
        case 'a':
          playAirhorn();
          break;
        default:
          break;
      }
    }
  }

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect(ENDPOINT);
    socketRef.current.on('your id', (id) => {
      setYourID(id);
    });
    socketRef.current.on('topic', (topic) => {
      setTopic(topic);
    });
    socketRef.current.on('message', (cards) => {
      setCardList(cards);
    });

    socketRef.current.on('get ready', () => {
      setServerMessage('All players have joined, get ready...');
      setGameReady(true);
    });

    socketRef.current.on('game', (gameObj) => {
      setAffirmativeID(gameObj.affirmativeID);
      setNegativeID(gameObj.NegativeID);
      setJudgeID(gameObj.judgeID);
      setCardList(gameObj.cardList);
      setGame(gameObj);
      console.log(game);
    });
    socketRef.current.on('chat messages', (msgList) => {
      setChatList(msgList);
    });
    socketRef.current.on('judge ruling', (ruling) => {
      setJudgeMessage(ruling);
      setShowRuling(true);
    });
  }, []);

  const sendTopic = () => {
    socketRef.current.emit('set topic', topic);
  };

  //todo: send question cards
  function sendMessage(e) {
    if (e == '') return;
    if (canSend) {
      const messageObject = {
        body: e,
        role: role,
        type: newCardType,
        judgeRating: 0,
        spectatorRating: 0,
      };

      //setCanSend(false);
      socketRef.current.emit('send message', messageObject);
      setYourUnsentArgument('');
    }
  }

  const handleStartGame = () => {
    setShowLogin(false);
  };

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

  function handleCardType(e) {
    setNewCardType(e.target.value);
  }

  function handleSetUser(e) {
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
  //=============================================
  // sound triggers

  const [playGavel] = useSound(soundGavel, {
    volume: 0.8,
  });

  const [playWoo, { stop }] = useSound(soundWoo, {
    volume: 0.8,
  });

  const [playSlap] = useSound(soundSlap, {
    volume: 0.8,
  });
  const [playAirhorn] = useSound(soundAirhorn, {
    volume: 0.8,
  });
  const [playBigHammer] = useSound(soundBigHammer, {
    volume: 0.8,
  });

  //use this for increasing pitch of slaps

  const [playbackRate, setPlaybackRate] = React.useState(0.75);

  const handleClick = () => {
    setPlaybackRate(playbackRate + 0.1);
    playSlap();
  };

  const handleSoundKeys = (e) => {
    console.log(e.key);
  };

  const handleDebateField = (e) => {
    setTopic(e.target.value);
  };

  const nextRound = () => {
    socketRef.current.emit('next round');
  };

  const sendChatMsg = (msg) => {
    const msgObj = {
      name: userName,
      body: msg,
    };
    socketRef.current.emit('chat message', msgObj);
  };

  return (
    <>
      {showLogin ? (
        <LoginModal
          aff={game.affirmativeName}
          neg={game.negativeName}
          judge={game.judgeName}
          handleRadioChange={handleRadioChange}
          handleSetUser={handleSetUser}
          handleNameChange={handleNameChange}
          handleStartGame={handleStartGame}
          gameReady={gameReady}
          topic={topic}
        />
      ) : null}

      <div
        class={
          role == 'judge' ? 'grid-container-judge' : 'grid-container-player'
        }
        onKeyDown={onKeyPressed}
        tabIndex={0}
      >
        <div class="title-claim">
          <h1 className="claim-header">
            <sup>
              <i>claim: </i>
            </sup>
            {topic}
          </h1>
          <h3>Runde {game.round}</h3>
          <h4>
            {game.round % 2 == 1
              ? 'pro spielt als erstes'
              : 'contra spielt als erstes'}
          </h4>
        </div>
        <div class="chat">
          <Chat sendChatMsg={sendChatMsg} chatList={chatList} />
        </div>
        {role == 'affirmative' ? (
          <>
            <div className="player1">
              <Player name={userName} role={role} />
            </div>
            <div className="player2">
              <Player name={game.NegativeName} role="contra" />
            </div>
          </>
        ) : null}
        {role == 'negative' ? (
          <>
            <div className="player1">
              <Player name={userName} role={role} />
            </div>
            <div className="player2">
              <Player name={game.affirmativeName} role="pro" />
            </div>
          </>
        ) : null}
        {role == 'judge' ? (
          <div class="players">
            <Player name={game.affirmativeName} role={'pro'} />
            <Player name={game.negativeName} role="contra" />
          </div>
        ) : null}
        <div class="toolbox">
          {role == 'spectator' ? null : (
            <MainForm
              onChange={handleChange}
              handleCardType={handleCardType}
              handleSubmit={sendMessage}
            />
          )}

          {role == 'judge' ? (
            <>
              <button onClick={playGavel}>gavel</button>
              {judgeCanAdvance ? (
                <button onClick={nextRound}>next round</button>
              ) : null}
              <button>finish game</button>
            </>
          ) : null}
          {role == 'spectator' ? (
            <>
              <div onKeyPress={handleSoundKeys}>
                <button onClick={playWoo}>woo</button>
                <button onClick={playSlap}>slap</button>
                <button onClick={playAirhorn}>airhorn</button>
                <button>throw tomato?</button>
              </div>
            </>
          ) : null}
        </div>

        <CardTable cardList={cardList} userRole={role} rateCard={rateCard} />

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
