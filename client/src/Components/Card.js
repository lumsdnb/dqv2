import React from 'react';
import './Card.css';

const Card = (props) => {
  return (
    <>
      <div className="card">
        <h3>hey {props.claim}</h3>
      </div>
    </>
  );
};

export default Card;
