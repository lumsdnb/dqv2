import React from 'react';
import './Verdict.css';

const Modal = (props) => {
  return (
    <>
      <div
        className="judge-ruling"
        style={{ display: props.showModal ? 'block' : 'none' }}
      >
        <h2>verdict:</h2>
        <p>{props.verdict}</p>
        <button onClick={props.closeModal}>ok</button>
        <button onClick={props.closeModal}>ok</button>
      </div>
    </>
  );
};

export default Modal;
