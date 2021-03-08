import React from 'react';
import Card from './Card.js';
import './CardTable.css';

const CardTable = (props) => {
  return (
    <>
      <div className="table">
        <div className="left">
          <h3>affirmative</h3>
          <Card claim={props.arg1} />
        </div>
        <div className="right">
          <h3>negative</h3>
          <Card claim={props.arg2} />
        </div>
      </div>
    </>
  );
};

export default CardTable;
