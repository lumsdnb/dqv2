import React from 'react';
import './MainForm.css';

const MainForm = (props) => {
  function handleChange(event) {
    props.onChange(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (this.state.value === '') {
      return;
    }
    props.onSubmit(event.target.value);
  }

  return (
    <form className="main-form" onSubmit={handleSubmit}>
      {' '}
      <label className="form-label" for="cardform">
        Your Argument:
        <br />
        <textarea
          id="cardform"
          className="form-textarea"
          onChange={handleChange}
        />{' '}
      </label>
      <br />
      <input type="submit" className="form-btn" value="Place card" />
    </form>
  );
};
export default MainForm;
