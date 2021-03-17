import React from 'react';
import './Player.css';
import avatar from '../avatar.jpg';

const Player = (props) => {
  return (
    <>
      <div className="player">
        <img className="player-img" src={avatar} alt="avatar" />
        <div className="player-text">
          <h3>{props.name}</h3>
          <h4>{props.role}</h4>
        </div>
      </div>
    </>
  );
};

export default Player;
