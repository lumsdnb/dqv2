import React, { useState } from 'react';
import './UserList.css';
const UserList = (props) => {
  const [showBtn, setShowBtn] = useState(false);

  function handleSubmitBtn(event) {
    event.preventDefault();
    props.handleSetUser(event.target.value);
  }

  function handleName(e) {
    e.preventDefault();
    setShowBtn(true);
    props.handleNameChange(e);
  }

  return (
    <>
      <div className="user-list">
        <form>
          <div class="form-group">
            <label>
              <input
                type="text"
                class="form-control"
                name="name"
                placeholder="your name"
                onChange={handleName}
                required="required"
              />
            </label>{' '}
          </div>

          <div class="form-group">
            <label>role</label>

            <div class="form-check">
              <label class="form-check-label">
                affirmative
                <input
                  class="form-check-input"
                  type="radio"
                  name="role"
                  value="affirmative"
                  onChange={props.handleRadioChange}
                />{' '}
              </label>
            </div>

            <div class="form-check">
              <label class="form-check-label">
                negative
                <input
                  class="form-check-input"
                  type="radio"
                  name="role"
                  value="negative"
                  onChange={props.handleRadioChange}
                />{' '}
              </label>
            </div>

            <div class="form-check">
              <label class="form-check-label">
                judge
                <input
                  class="form-check-input"
                  type="radio"
                  name="role"
                  value="judge"
                  onChange={props.handleRadioChange}
                />{' '}
              </label>
            </div>

            <div class="form-check">
              <label class="form-check-label">
                spectator
                <input
                  class="form-check-input"
                  type="radio"
                  name="role"
                  value="spectator"
                  onChange={props.handleRadioChange}
                />{' '}
              </label>
            </div>
          </div>

          <div class="form-group">
            {showBtn ? (
              <input
                type="submit"
                class="btn btn-primary"
                name="set"
                value="set"
                onClick={handleSubmitBtn}
              />
            ) : null}
          </div>
        </form>

        <h2>connected users:</h2>
        {props.users.map((item, i) => (
          <p key={i}>
            {item.name} - {item.role}
          </p>
        ))}
      </div>
    </>
  );
};

export default UserList;
