import React from 'react';
import Card from './Card.js';
import './CardTable.css';

const CardTable = (props) => {
  return (
    <>
      <div className="table">
        <div className="left">
          <Card claim={props.arg1} />
        </div>
        <div className="right">
          <Card claim={props.arg2} />
        </div>
      </div>
    </>
  );
};

export default CardTable;
