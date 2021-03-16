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
          <label>
            <input
              type="radio"
              id="usertype"
              name="role"
              value="affirmative"
              onChange={props.handleRadioChange}
            />
            affirmative
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              id="usertype"
              name="role"
              value="negative"
              onChange={props.handleRadioChange}
            />
            negative
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              id="usertype"
              name="role"
              value="judge"
              onChange={props.handleRadioChange}
            />
            judge
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              id="usertype"
              name="role"
              value="spectator"
              onChange={props.handleRadioChange}
            />
            spectator
          </label>
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
