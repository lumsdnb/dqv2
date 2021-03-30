import React from 'react';
import './Player.css';
import AvatarGen from './AvatarGen.js';

const Player = (props) => {
  return (
    <>
      <div className='player'>
        <AvatarGen i={props.avi} style={{ width: '4rem', height: '4rem' }} />
        <div className='player-text'>
          <h3>{props.name}</h3>
          <h4>{props.role}</h4>
        </div>
      </div>
    </>
  );
};

export default Player;
