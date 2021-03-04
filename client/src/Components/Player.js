import React from 'react';
import './Player.css';
import avatar from '../avatar.jpg';

const Player = () => {
  return (
    <>
      <div className="player">
        <img src={avatar} alt="avatar" />
        <h3>player name</h3>
        <h4>player role</h4>
      </div>
    </>
  );
};

export default Player;
