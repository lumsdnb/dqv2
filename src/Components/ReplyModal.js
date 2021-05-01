import React, { useState } from 'react';
import './Modal.css';

import { RiSwordFill } from 'react-icons/ri';
import { GiBangingGavel } from 'react-icons/gi';

import AvatarGen from './AvatarGen.js';

const ReplyModal = (props) => {
  const [reply, setReply] = useState('');
  const handleReply = (e) => {
    setReply(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reply === '') return;

    const cardObject = {
      parent: props.parent,
      body: reply,
      type: 'Antwort',
      upVotes: 0,
      downVotes: 0,
    };
    // if (cardType === 'fact') {
    //   cardObject.source = cardSource;
    // }
    props.sendMessage(cardObject);

    document.getElementById('reply-form').reset();
    setReply('');
    props.closeModal();
  };

  const handleClose = (e) => {
    e.preventDefault();
    props.closeModal();
  };

  return (
    <>
      <div
        className='modal-popup'
        style={{ display: props.showModal ? 'block' : 'none' }}
      >
        <div>
          <h3>{props.title}</h3>
          <p>{props.body}</p>
          <form id='reply-form'>
            <textarea onChange={handleReply} />
            <br />
            <button
              style={{ backgroundColor: '#757575', color: '#fff' }}
              onClick={handleClose}
            >
              abbrechen
            </button>
            <button
              style={{ backgroundColor: '#2b8a5b' }}
              onClick={handleSubmit}
            >
              antworten
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReplyModal;
