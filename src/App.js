import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

import { Helmet } from 'react-helmet';

import CardTable from './Components/CardTable.js';
import Player from './Components/Player.js';
import Toolbox from './Components/Toolbox.js';
import Chat from './Components/Chat.js';
import Modal from './Components/Modal.js';
import LoginModal from './Components/LoginModal.js';
import ReplyModal from './Components/ReplyModal.js';
import TopicChangeModal from './Components/TopicChangeModal.js';

import VotingModal from './Components/VotingModal.js';

import { RiSwordFill } from 'react-icons/ri';

import PreparedDeck from './Components/PreparedDeck.js';

import './App.css';

import crowd from './images/crowd.png';
import deckbtn from './images/cardbtn.png';
import AvatarGen from './Components/AvatarGen.js';

import useSound from 'use-sound';
import soundGavel from './sounds/gavel-2.mp3';
import soundWoo from './sounds/woo.wav';
import soundBoo from './sounds/boo.mp3';
import soundAirhorn from './sounds/airhorn.wav';
import soundBigHammer from './sounds/big-hammer.wav';
import soundMystery from './sounds/mystery.wav';
import soundCard from './sounds/card.mp3';
import soundClick from './sounds/click.mp3';
import soundTick from './sounds/tick.wav';
import soundUp from './sounds/upvote.mp3';
import soundDown from './sounds/downvote.mp3';

const localENDPOINT = 'http://127.0.0.1:4000';
const productionENDPOINT = 'https://dqv2-server.herokuapp.com:443';

const App = () => {
  const [yourID, setYourID] = useState();
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('');
  const [yourUnsentArgument, setYourUnsentArgument] = useState('');
  const [judgeMessage, setJudgeMessage] = useState('guilty');
  const [finalRuling, setFinalRuling] = useState('');
  const [canSend, setCanSend] = useState(true);
  const [showRuling, setShowRuling] = useState(false);
  const [topic, setTopic] = useState('');
  const [topicID, setTopicID] = useState(0);
  const [game, setGame] = useState({});

  const [showLogin, setShowLogin] = useState(true);
  const [showVoting, setShowVoting] = useState(false);

  const [showCommentary, setShowCommentary] = useState(true);

  const [userAvi, setUserAvi] = useState(0);
  const [tempSpectatorAvi, setTempSpectatorAvi] = useState(0);

  const [yourDeck, setYourDeck] = useState([]);
  const [showCardDeck, setShowCardDeck] = useState(false);

  const [chatList, setChatList] = useState([]);

  const [cardList, setCardList] = useState([]);
  const [isTyping] = useState(false);

  const [newCardType, setNewCardType] = useState();

  const [showInput, setShowInput] = useState();

  const [gameReady, setGameReady] = useState('');

  const [showTimer, setShowTimer] = useState(false);
  const [roundTimerWasUsed, setRoundTimerWasUsed] = useState(false);

  const [showInfo, setShowInfo] = useState(false);

  const [judgeCanAdvance, setJudgeCanAdvance] = useState([]);

  const [showReply, setShowReply] = useState(false);

  const [replyCardID, setReplyCardID] = useState('');
  const [showTopicRequest, setShowTopicRequest] = useState('');

  const debateTopics = [
    'Der ÖPNV sollte kostenlos für alle verfügbar sein.',
    'Autos mit Verbrennungsmotor sollten verboten werden.',
    'Die Mietpreisbremse ist ineffektiv und sollte abgeschafft werden.',
  ];

  const socketRef = useRef();

  const requestNewTopic = (t) => {
    socketRef.current.emit('request topic', t);
  };

  const topicRequested = (t) => {
    setShowTopicRequest(t);
  };
  const acceptNewTopic = () => {
    socketRef.current.emit('accept topic change');
    setShowTopicRequest(false);
  };
  //=============================================
  // sound triggers

  const [playGavel] = useSound(soundGavel, {
    volume: 0.7,
  });

  const [playMystery] = useSound(soundMystery, {
    volume: 0.3,
  });

  const [playClick] = useSound(soundClick, {
    volume: 0.5,
  });

  const [playTick] = useSound(soundTick, {
    volume: 0.8,
  });

  const [playCard] = useSound(soundCard, {
    volume: 0.5,
  });

  const [playWoo, { stop }] = useSound(soundWoo, {
    volume: 0.2,
  });

  const [playBoo] = useSound(soundBoo, {
    volume: 0.2,
  });
  const [playAirhorn] = useSound(soundAirhorn, {
    volume: 0.2,
  });
  const [playBigHammer] = useSound(soundBigHammer, {
    volume: 0.2,
  });

  const [playUp] = useSound(soundUp, {
    volume: 0.6,
  });
  const [playDown] = useSound(soundDown, {
    volume: 0.6,
  });
  useEffect(() => {
    socketRef.current = io.connect(productionENDPOINT);
    socketRef.current.on('your id', (id) => {
      setYourID(id);
    });
    socketRef.current.on('topic', (topic) => {
      setTopic(topic);
    });
    socketRef.current.on('requested topic change', (t) => {
      console.log('requested topic: ' + t);
      topicRequested(t);
    });
    socketRef.current.on('game reset', () => {
      setGameReady(false);
      setUserName('');
      setRole('');
      closeModal();
      setShowLogin(true);
      setRoundTimerWasUsed(false);
    });

    socketRef.current.on('topic id', (id) => {
      setTopicID(id);
      if (id != -1) {
        setTopic(debateTopics[id]);
      }
    });

    socketRef.current.on('message', (cards) => {
      setCardList(cards);
    });
    socketRef.current.on('latest card', (card) => {
      if (card.type === 'question') {
        playMystery();
      }
      if (card.type === 'argument' || 'fact') {
        playCard();
      }
    });
    socketRef.current.on('topic id', (id) => {
      setTopicID(id);
    });

    socketRef.current.on('next round', () => {
      console.log('nextround');
      setShowCommentary(true);
      setRoundTimerWasUsed(false);
      setShowTimer(false);
    });

    socketRef.current.on('get ready', () => {
      setGameReady(true);
      setShowCommentary(true);
    });

    socketRef.current.on('game', (gameObj) => {
      setGame(gameObj);
      setCardList(gameObj.cardList);
    });
    socketRef.current.on('chat messages', (msgList) => {
      setChatList(msgList);
    });

    socketRef.current.on('play sound', (sound) => {
      switch (sound) {
        case 'airhorn':
          playAirhorn();

          break;
        case 'boo':
          playBoo();

          break;
        case 'gavel':
          playGavel();

          break;
        case 'woo':
          playWoo();

          break;
        case 'timer':
          playTick();
          break;
        case 'up':
          playUp();
          break;
        case 'down':
          playDown();
          break;
        default:
          break;
      }
    });

    socketRef.current.on('please vote', () => {
      setShowVoting(true);
    });
  }, [socketRef]);

  const oneTimerPerRound = () => {
    if (!roundTimerWasUsed) {
      console.log('bang');
      setShowTimer(true);
      setRoundTimerWasUsed(true);
    }
  };

  const saveToDeck = (i) => {
    setYourDeck((yourDeck) => [...yourDeck, cardList[i]]);
    console.log(yourDeck);
  };
  useEffect(() => {}, [cardList, role, game.round]);

  const replyToCard = (id) => {
    setShowReply(true);
    setReplyCardID(id);
    console.log(id);
  };

  const [spectators, setSpectators] = useState([]);

  useEffect(() => {
    if (game.spectators) setSpectators(game.spectators);
  }, [game.spectators]);

  const spectatorList = spectators.map((s, i) => {
    if (s.id !== yourID)
      return (
        <div className='spectator-small'>
          <AvatarGen i={s.avi} style={{ width: '3rem', height: '3rem' }} />
          <h2>{s.name}</h2>
        </div>
      );
  });

  const sendTopic = () => {
    socketRef.current.emit('set topic', topic);
  };

  const handleTopicID = (id) => {
    socketRef.current.emit('topic number', id);
  };

  //send cards from prep deck & toolbox
  function sendMessage(e) {
    if (e === '') return;

    socketRef.current.emit('send message', e);
    setYourUnsentArgument('');
  }

  const handleStartGame = () => {
    setRole('spectator');

    setShowLogin(false);
  };

  const showDeck = () => {
    setShowCardDeck(true);
  };
  const hideDeck = () => {
    setShowCardDeck(false);
  };

  const handleFinalRuling = (e) => {
    socketRef.current.emit('final ruling', e);
  };

  function setName(name) {
    setUserName(name);
  }

  function handleChange(e) {
    setYourUnsentArgument(e.target.value);
  }

  function handleSetRole(e) {
    setRole('spectator');
  }

  function handleNameChange(e) {
    setUserName(e.target.value);
  }

  function handleCardType(e) {
    setNewCardType(e.target.value);
  }

  const voteFor = (e) => {
    const voteObj = {
      role: role,
      vote: e,
    };
    socketRef.current.emit('send final vote', voteObj);
    closeModal();
  };

  function handleSetUser(e) {
    const messageObject = {
      name: userName,
      role: 'spectator',
      avi: userAvi,
    };
    socketRef.current.emit('set user', messageObject);
  }

  const rateCard = (index, rating) => {
    const msgObj = {
      index: index,
      type: role,
      rating: rating,
    };
    socketRef.current.emit('rate card', msgObj);
  };

  function closeModal() {
    setShowRuling(false);

    setShowVoting(false);
    setShowInfo(false);
  }

  const closeTopicRequest = () => setShowTopicRequest(false);

  const closeReply = () => setShowReply(false);

  function changeAvi(e) {
    setUserAvi(e);
  }

  const handleShowInfo = () => {
    setShowInfo(true);
  };

  const handleShowReply = (id) => {
    setShowReply(true);
  };

  //use this for increasing pitch of slaps

  const [playbackRate, setPlaybackRate] = React.useState(0.75);

  const handleClick = () => {
    setPlaybackRate(playbackRate + 0.1);
    playBoo();
  };

  const handleSetCustomTopic = (t) => {
    socketRef.current.emit('set topic', t);
  };

  const handleSoundKeys = (e) => {
    console.log(e.key);
  };

  const handleDebateField = (e) => {
    setTopic(e.target.value);
  };

  const handleTempAvi = (e) => {
    setTempSpectatorAvi(e);
  };

  const nextRound = () => {
    emitGavel();
    if (game.round <= 4) socketRef.current.emit('next round');
  };
  const finishGame = (e) => {
    closeModal();
    socketRef.current.emit('end game');
  };

  const resetGame = () => {
    socketRef.current.emit('reset');
    setGameReady(false);
    setUserName('');
    setRole('');
    closeModal();
    setShowLogin(true);
    setChatList([]);
    setShowTimer(false);
  };

  const sendChatMsg = (msg) => {
    const msgObj = {
      name: userName,
      body: msg,
    };
    socketRef.current.emit('chat message', msgObj);
  };

  const startTimer = () => {
    setShowTimer(true);
  };

  const emitAirhorn = () => {
    socketRef.current.emit('emit sound', 'airhorn');
  };

  const emitBoo = () => {
    socketRef.current.emit('emit sound', 'boo');
  };
  const emitGavel = () => {
    socketRef.current.emit('emit sound', 'gavel');
  };
  const silenceChat = () => {
    emitGavel();
    socketRef.current.emit('silence chat');
  };
  const emitWoo = () => {
    socketRef.current.emit('emit sound', 'woo');
  };

  const emitUp = () => {
    socketRef.current.emit('emit sound', 'up');
  };

  const emitDown = () => {
    socketRef.current.emit('emit sound', 'down');
  };

  const emitTimer = () => {
    socketRef.current.emit('start timer');
  };

  const finishCounting = () => {
    if (role !== 'judge') {
      setCanSend(false);
    }
    setShowTimer(false);
    console.log('app f received');
  };

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>v2</title>
      </Helmet>

      <Modal
        title='Debate Quest'
        showModal={showInfo}
        body={'hier stehen infos über das Spiel'}
        closeModal={closeModal}
      />

      <Modal
        title='Richter sagt:'
        showModal={showRuling}
        body={judgeMessage}
        closeModal={closeModal}
      />

      <ReplyModal
        title='Auf Karte antworten'
        showModal={showReply}
        body={''}
        parent={replyCardID}
        closeModal={closeReply}
        sendMessage={sendMessage}
      />

      <TopicChangeModal
        title='Neuer Themenvorschlag:'
        showModal={showTopicRequest}
        body={showTopicRequest}
        closeModal={closeTopicRequest}
        acceptNewTopic={acceptNewTopic}
      />

      {showVoting ? (
        <VotingModal
          game={game}
          topic={topic}
          voteFor={voteFor}
          role={role}
          usedCards={game.pastRounds}
          handleRuling={handleFinalRuling}
        />
      ) : null}

      {showLogin ? (
        <LoginModal
          game={game}
          role={role}
          userName={userName}
          setRole={handleSetRole}
          spectators={spectators}
          handleSetUser={handleSetUser}
          handleNameChange={handleNameChange}
          handleStartGame={handleStartGame}
          changeAvi={changeAvi}
          changeTempAvi={handleTempAvi}
          gameReady={gameReady}
          topic={topic}
          setTopic={handleSetCustomTopic}
          debateTopics={debateTopics}
          topicID={topicID}
          handleTopicID={handleTopicID}
          resetGame={resetGame}
        />
      ) : null}
      {showCardDeck ? (
        <PreparedDeck
          canSend={canSend}
          cardList={game.preparedDeck}
          newCards={yourDeck}
          sendMessage={sendMessage}
          hideDeck={hideDeck}
          role={role}
          topicID={topicID}
          debateTopics={debateTopics}
        />
      ) : null}
      <div className='grid-container'>
        <div className='chat'>
          <Chat
            sendChatMsg={sendChatMsg}
            chatList={chatList}
            spectatorList={game.spectators}
          />
          <RiSwordFill />
        </div>
        <div className='player1'>
          {role === 'affirmative' ? (
            <Player
              avi={game.affirmativeAvi}
              name={game.affirmativeName}
              role='Pro'
            />
          ) : null}
          {role === 'negative' ? (
            <Player
              avi={game.negativeAvi}
              name={game.negativeName}
              role='Contra'
            />
          ) : null}
          {role === 'judge' ? (
            <Player avi={game.judgeAvi} name={game.judgeName} role='Richter' />
          ) : null}
          {role === 'spectator' ? (
            <Player avi={tempSpectatorAvi} name={userName} role=' ' />
          ) : null}
        </div>
        <div className='title'>
          <h1>
            <sup>
              <i>Thema: </i>
            </sup>
            {topic}
          </h1>
          <div className='game-commentary'>
            {showCommentary ? <h3>Was ist deine Perspektive dazu?</h3> : null}
          </div>
        </div>
        <div className='card-table'>
          <CardTable
            cardList={cardList}
            userRole={role}
            saveToDeck={(i) => saveToDeck(i)}
            replyToCard={(id) => replyToCard(id)}
            rateCard={(i, r) => rateCard(i, r)}
          />
        </div>
        <div className='crowd'>
          {spectatorList}
          <img src={crowd} alt='crowd cheering' draggable='false'></img>
        </div>
        <div className='card-deck'>
          {role === 'judge' ? null : (
            <button className='deck-button' onClick={showDeck}>
              <img src={deckbtn} alt='deck öffnen' draggable='false'></img>
            </button>
          )}
        </div>
        <div className='navbar'>
          <button onClick={handleShowInfo}>Info</button>
        </div>
        <div className='toolbox'>
          <Toolbox
            game={game}
            onChange={handleChange}
            handleCardType={handleCardType}
            sendMessage={sendMessage}
            nextRound={nextRound}
            role={role}
            yourID={yourID}
            canSend={canSend}
            playWoo={emitWoo}
            playBoo={emitBoo}
            requestNewTopic={requestNewTopic}
            playAirhorn={emitAirhorn}
            playGavel={silenceChat}
          />
        </div>
      </div>
    </>
  );
};

export default App;
