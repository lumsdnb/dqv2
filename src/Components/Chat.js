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
        <h4>user type</h4>
        <div>
          <input
            type="radio"
            id="usertype"
            name="role"
            value="affirmative"
            onChange={props.handleRadioChange}
          />
          <label for="affirmative">affirmative</label>
        </div>
        <div>
          <input
            type="radio"
            id="usertype"
            name="role"
            value="negative"
            onChange={props.handleRadioChange}
          />
          <label for="negative">negative</label>
        </div>
        <div>
          <input
            type="radio"
            id="usertype"
            name="role"
            value="judge"
            onChange={props.handleRadioChange}
          />
          <label for="judge">judge</label>
        </div>

        <p>X DOUBT</p>
        <p>X DOUBT</p>
        <p>X DOUBT</p>
        <p>X DOUBT</p>
        <p>wtf lol</p>
        <p>X DOUBT</p>
        <p>i dont thing those two know what they are talking about</p>
        <p>X DOUBT</p>
      </div>
    </>
  );
};

export default Chat;
