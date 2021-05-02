import React from 'react';
import './Modal.css';

const Modal = (props) => {
  return (
    <>
      <div
        className='modal-popup'
        style={{ display: props.showModal ? 'block' : 'none' }}
      >
        <div>
          <h3>{props.title}</h3>
          <p>{props.body}</p>

          <button className='--red' onClick={props.closeModal}>
            abbrechen
          </button>
          <button className='--green' onClick={props.acceptNewTopic}>
            ok
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
