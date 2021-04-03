import React from 'react';
import './Modal.css';

const Modal = (props) => {
  return (
    <>
      <div
        className='judge-ruling'
        style={{ display: props.showModal ? 'block' : 'none' }}
      >
        <div>
          <h3>{props.title}</h3>
          <p>{props.body}</p>
          <button onClick={props.closeModal}>ok</button>
          <button onClick={props.closeModal}>ok</button>
        </div>
      </div>
    </>
  );
};

export default Modal;
