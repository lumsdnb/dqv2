import React, { useState } from "react";
import MainForm from "./MainForm.js";
import "./Toolbox.css";
import { GiBangingGavel } from "react-icons/gi";

const Toolbox = (props) => {
  const [yourArgument, setYourArgument] = useState("");
  const [cardType, setCardType] = useState("");
  const [canSend, setCanSend] = useState(true);

  function handleChange(e) {
    setYourArgument(e);
  }

  function handleCardType(c) {
    setCardType(c);
  }
  function sendMessage(e) {
    if (e == "") return;
    const messageObject = {
      body: yourArgument,
      role: props.role,
      type: cardType,
      judgeRating: 0,
      spectatorRating: 0,
    };
  }

  return (
    <div className='toolbox'>
      {props.role == "spectator" ? (
        <>
          <div className='spectator-board'>
            <button onClick={props.playWoo}>woo</button>
            <button onClick={props.playSlap}>slap</button>
            <button onClick={props.playAirhorn}>airhorn</button>
            <button>throw tomato?</button>
          </div>
        </>
      ) : (
        <MainForm
          game={props.game}
          setFormState={setYourArgument}
          formState={yourArgument}
          onChange={handleChange}
          handleCardType={handleCardType}
          handleSubmit={props.sendMessage}
          role={props.role}
        />
      )}
      {props.role == "judge" ? (
        <>
          <button className='gavel-btn' onClick={props.playGavel}>
            <GiBangingGavel />
          </button>
          <button onClick={props.nextRound}>nächste Runde</button>
        </>
      ) : null}
    </div>
  );
};

export default Toolbox;
