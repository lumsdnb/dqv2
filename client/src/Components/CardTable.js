import React from 'react';
import Card from './Card.js';
import './CardTable.css';

const CardTable = () => {
  return (
    <>
      <div className="table">
        <div className="left">
          <Card claim="this sucks" />
        </div>
        <div className="right">
          <Card claim="you're wrong" />
        </div>
      </div>
    </>
  );
};

export default CardTable;
