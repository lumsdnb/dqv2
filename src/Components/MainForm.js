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

  const isItyourTurn = () => {
    //even number, list empty, role is affirmative
    if (
      props.game.round % 2 == 1 &&
      props.role == 'affirmative' &&
      props.game.cardList == ''
    ) {
      return true;
    }
    if (
      props.game.round % 2 != 1 &&
      props.role == 'negative' &&
      props.game.cardList == ''
    ) {
      return true;
    }
  };

  return (
    //disable form when its not your turn
    <form className='main-form' onSubmit={handleSubmit}>
      {' '}
      {props.role === 'judge' ? null : (
        <div class='form-radios'>
          <label class='form-check-label'>
            <input
              class='form-check-input'
              type='radio'
              name='card_type'
              value='argument'
              onChange={props.handleCardType}
            />{' '}
            Argument
          </label>
          <label class='form-check-label'>
            <input
              class='form-check-input'
              type='radio'
              name='card_type'
              value='fact'
              onChange={props.handleCardType}
            />
            Fakt
          </label>
          <label class='form-check-label'>
            <input
              class='form-check-input'
              type='radio'
              name='card_type'
              value='question'
              onChange={props.handleCardType}
            />
            Frage
          </label>
        </div>
      )}
      <label className='form-label' for='cardform'>
        {props.role === 'judge' ? 'Your ruling' : 'Your Argument'}
        <textarea
          id='cardform'
          className='form-textarea'
          onChange={handleChange}
        />
      </label>
      <label className='form-label' for='cardform'>
        {props.type == 'fact' ? (
          <textarea
            id='cardsource'
            className='form-textarea'
            onChange={handleCardSource}
          />
        ) : null}
      </label>{' '}
      <input
        type='submit'
        className='form-btn'
        value={props.role == 'judge' ? 'Urteil fällen' : 'Karte platzieren'}
      />
    </form>
  );
};
export default MainForm;
