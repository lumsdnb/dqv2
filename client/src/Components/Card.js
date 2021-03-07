import React from 'react';
import useFitText from 'use-fit-text';

import './Card.css';

const Card = (props) => {
  const { fontSize, ref } = useFitText();
  return (
    <>
      <div ref={ref} className="card" style={{ fontSize }}>
        <p>{props.claim}</p>
      </div>
    </>
  );
};

export default Card;
