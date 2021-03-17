import React from 'react';
import Card from './Card.js';
import './CardTable.css';

const CardTable = (props) => {
  return (
    <>
      <div className="card-table">
        <Card claim={props.arg1} />
        <Card claim={props.arg2} />
        <Card claim="test eins zwei drei" />
        <Card claim="das argument ist falsch weil bla bla" />
      </div>
    </>
  );
};

export default CardTable;
