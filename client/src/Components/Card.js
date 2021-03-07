import React from 'react';
import './Card.css';

const Card = (props) => {
  return (
    <>
      <div className="card">
        <p>{props.claim}</p>
      </div>
    </>
  );
};

export default Card;
