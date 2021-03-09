import React from 'react';
import './Chat.css';
const Chat = (props) => {
  function handleRadioChange(event) {
    // invoke the callback with the new value
    props.onChange(event.target.value);
  }
  return (
    <>
      <div className="chatmessages">
        <div>
          <input
            type="radio"
            id="negative"
            name="role"
            value="affirmative"
            onChange={props.handleRadioChange}
          />
          <label for="affirmative">affirmative</label>
        </div>
        <div>
          <input
            type="radio"
            id="negative"
            name="role"
            value="negative"
            onChange={props.handleRadioChange}
          />
          <label for="negative">negative</label>
        </div>
        <div>
          <input
            type="radio"
            id="judge"
            name="role"
            value="judge"
            onChange={props.handleRadioChange}
          />
          <label for="judge">judge</label>
        </div>

        <p>DOUBT</p>
        <p>DOUBT</p>
        <p>DOUBT</p>
        <p>DOUBT</p>
        <p>wtf lol</p>
        <p>DOUBT</p>
        <p>i dont thing those two know what they are talking about</p>
        <p>DOUBT</p>
      </div>
    </>
  );
};

export default Chat;
