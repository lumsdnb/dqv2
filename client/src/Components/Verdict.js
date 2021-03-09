import React from 'react';
import './Verdict.css';

const Verdict = (props) => {
  return (
    <>
    <div className="judge-ruling" style={{display: props.showRuling ? "block" : "none"}}>
        <h2>verdict:</h2>    
        <p>{props.verdict}</p>
        <button onClick={props.closeVerdict}>ok</button>
        <button onClick={props.closeVerdict}>ok</button>
    </div>
    </>
  );
};

export default Verdict;
