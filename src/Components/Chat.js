import React, { useState } from 'react';
import './Chat.css';
const Chat = (props) => {
  const [currentMessage, setCurrentMessage] = useState('');

  function handleChatMsg(e) {
    // invoke the callback with the new value
    setCurrentMessage(e.target.value);
  }

  function handleChatSubmit(e) {
    e.preventDefault();
    props.sendChatMsg(currentMessage);
  }

  const chatList = props.chatList.map((msg) => {
    <p>
      name: {msg.name} {msg.body}
    </p>;
  });

  return (
    <>
      <div className="chatmessages">
        <h4>users:</h4>
        <p>{props.spectatorList}</p>
        <h4>user msgs</h4>

        {chatList}
      </div>
      <form onSubmit={handleChatSubmit}>
        <input type="text" onChange={handleChatMsg} />
        <input type="submit" className="form-btn" value="senden" />
      </form>
    </>
  );
};

export default Chat;
