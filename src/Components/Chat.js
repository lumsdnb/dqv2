import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';
import { RiCodeSFill } from 'react-icons/ri';
const Chat = (props) => {
  const [currentMessage, setCurrentMessage] = useState('');

  function handleChatMsg(e) {
    setCurrentMessage(e.target.value);
  }

  const chatMessages = props.chatList.map((msg, index) => (
    <p>
      <i> {msg.name}</i>: {msg.body}
    </p>
  ));

  function handleChatSubmit(e) {
    e.preventDefault();
    if (currentMessage) {
      props.sendChatMsg(currentMessage);
    }
  }

  return (
    <div className='chat-outer'>
      <div className='chat-top'>
        <h4>Chat</h4>
        <p>{props.spectatorList}</p>
      </div>
      <div className='chatmessages'>{chatMessages}</div>
      <form className='chat-controls' onSubmit={handleChatSubmit}>
        <input className='chat-input' type='text' onChange={handleChatMsg} />
        <input type='submit' className='form-btn' value='senden' />
      </form>
    </div>
  );
};

export default Chat;
