import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';
import { RiCodeSFill } from 'react-icons/ri';
const Chat = (props) => {
  const [currentMessage, setCurrentMessage] = useState('');

  const messagesEndRef = useRef(null)

  function handleChatMsg(e) {
    setCurrentMessage(e.target.value);
  }
  
  const chatMessages = props.chatList.map((msg, index) => (
    <p>
      <i> {msg.name}</i> {msg.body}
    </p>
  ));

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  function handleChatSubmit(e) {
    e.preventDefault();
    if (currentMessage){
      props.sendChatMsg(currentMessage);
    }
  }

  return (
    <>
    <div className="chat-top">
        <h4>users:</h4>
        <p>{props.spectatorList}</p>
    </div>
      <div className="chatmessages">
        {chatMessages}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleChatSubmit}>
        <input type="text" onChange={handleChatMsg} />
        <input type="submit" className="form-btn" value="senden" />
      </form>
    </>
  );
};

export default Chat;
