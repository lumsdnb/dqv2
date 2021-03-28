import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';
const Chat = (props) => {
  const [currentMessage, setCurrentMessage] = useState('');

  const messagesEndRef = useRef(null)

  function handleChatMsg(e) {
    // invoke the callback with the new value
    setCurrentMessage(e.target.value);
  }
  
  const chatMessages = props.chatList.map((msg, index) => (
    <p>
      name: {msg.name} {msg.body}
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
    props.sendChatMsg(currentMessage);
  }


  return (
    <>
      <div className="chatmessages">
        <h4>users:</h4>
        <p>{props.spectatorList}</p>
        <h4>user msgs</h4>
      
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
