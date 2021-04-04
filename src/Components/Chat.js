import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
const Chat = (props) => {
  const [currentMessage, setCurrentMessage] = useState("");

  function handleChatMsg(e) {
    setCurrentMessage(e.target.value);
  }

  const chatMessagesEndRef = useRef(null);

  const scrollToBottom = () => {
    chatMessagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  const chatMessages = props.chatList.map((msg, index) => (
    <p>
      <i className={msg.type === "notification" ? "chatmsg-highlight" : ""}>
        {" "}
        {msg.name}
      </i>
      : {msg.body}
    </p>
  ));

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  function handleChatSubmit(e) {
    e.preventDefault();
    if (currentMessage) {
      props.sendChatMsg(currentMessage);
    }
    document.getElementById("chat-form").reset();
  }

  return (
    <div className='chat-outer'>
      <div className='chatmessages'>
        {chatMessages}
        <div ref={chatMessagesEndRef} />
      </div>
      <form
        id='chat-form'
        className='chat-controls'
        onSubmit={handleChatSubmit}
      >
        <input className='chat-input' type='text' onChange={handleChatMsg} />
        <input type='submit' className='form-btn' value='senden' />
      </form>
    </div>
  );
};

export default Chat;
