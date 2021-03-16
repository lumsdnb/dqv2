import React from 'react';
import './UserList.css';
const UserList = (props) => {
  function handleRadioChange(event) {
    // invoke the callback with the new value
    props.onChange(event.target.value);
  }
  return (
    <>
      <div className="user-list">
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
        {props.users.map((item, i) => (
          <li key={i}>
            {item.id} - {item.role}
          </li>
        ))}
      </div>
    </>
  );
};

export default UserList;
