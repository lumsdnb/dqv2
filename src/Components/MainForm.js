import React, { useState } from 'react';
import './MainForm.css';

const MainForm = (props) => {
  const [formState, setFormState] = useState();
  function handleChange(e) {
    setFormState(e.target.value);
  }
  function handleCardSource(e) {}
  function handleSubmit(e) {
    e.preventDefault();
    if (e.target.textContent) {
      props.handleSubmit(formState);
    }
  }

  return (
    <form className="main-form" onSubmit={handleSubmit}>
      {' '}
      <div class="form-radios">
        <input
          class="form-check-input"
          type="radio"
          name="card_type"
          value="argument"
          onChange={props.handleCardType}
        />{' '}
        <label class="form-check-label">argument</label>
        <label class="form-check-label">
          <input
            class="form-check-input"
            type="radio"
            name="card_type"
            value="fact"
            onChange={props.handleCardType}
          />
          fact
        </label>
        <label class="form-check-label">
          <input
            class="form-check-input"
            type="radio"
            name="card_type"
            value="question"
            onChange={props.handleCardType}
          />
          question
        </label>
      </div>
      <label className="form-label" for="cardform">
        {props.role === 'judge' ? 'Your ruling' : 'Your Argument'}
        <textarea
          id="cardform"
          className="form-textarea"
          onChange={handleChange}
        />
      </label>
      <label className="form-label" for="cardform">
        {props.type == 'fact' ? (
          <textarea
            id="cardsource"
            className="form-textarea"
            onChange={handleCardSource}
          />
        ) : null}
      </label>{' '}
      <input type="submit" className="form-btn" value="Place card" />
    </form>
  );
};
export default MainForm;
