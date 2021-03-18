import React from 'react';
import Card from './Card.js';
import './CardTable.css';

const CardTable = (props) => {
  return (
    <>
      <div className="card-table">
        <Card claim={props.arg1} role={props.role} />
        <Card claim={props.arg2} role={props.role} />
        <Card claim="test eins zwei drei" role={props.role} />
        <Card claim="das argument ist falsch weil bla bla" role={props.role} />
      </div>
    </>
  );
};

export default CardTable;
