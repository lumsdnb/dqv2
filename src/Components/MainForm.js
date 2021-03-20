import React, { useState } from 'react';
import './MainForm.css';

const MainForm = (props) => {
  const [formState, setFormState] = useState();
  function handleChange(e) {
    setFormState(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.handleSubmit(formState);
  }

  return (
    <form className="main-form" onSubmit={handleSubmit}>
      {' '}
      <label className="form-label" for="cardform">
        {props.role === 'judge' ? 'Your ruling' : 'Your Argument'}
      
        <textarea
          id="cardform"
          className="form-textarea"
          onChange={handleChange}
        />{' '}
      </label>
      
      <input type="submit" className="form-btn" value="Place card" />
    </form>
  );
};
export default MainForm;
