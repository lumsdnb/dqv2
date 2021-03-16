import React from 'react';
import './UserList.css';
const UserList = (props) => {
  function handleSubmitBtn(event) {
    event.preventDefault();
    props.handleSetUser(event.target.value);
  }
  return (
    <>
      <div className="user-list">
        <form>
          <div class="form-group">
            <label>
              your name *
              <input
                type="text"
                class="form-control"
                name="name"
                placeholder="name"
                onChange={props.handleNameChange}
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
            <input
              type="submit"
              class="btn btn-primary"
              name="set"
              value="set"
              onClick={handleSubmitBtn}
            />
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
