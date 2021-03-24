import React from 'react';
import './Verdict.css';

const Modal = (props) => {
  return (
    <>
      <div
        className="judge-ruling"
        style={{ display: props.showModal ? 'block' : 'none' }}
      >
        <h3>verdict:</h3>
        <p>{props.body}</p>
        <button onClick={props.closeModal}>ok</button>
        <button onClick={props.closeModal}>ok</button>
      </div>
    </>
  );
};

export default Modal;
