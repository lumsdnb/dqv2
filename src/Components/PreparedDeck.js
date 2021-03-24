import React from 'react';
import Card from './Card.js';
import './CardTable.css';

const PreparedDeck = (props) => {

    const listOfCards = props.cardList.map((c, index) => (
        <Card
            claim={c.body}
            index={index}
            type={c.type}
            userRole={props.userRole}
           
        />
    ));

    return (
        <>
            <div className="prepared-deck">{listOfCards}</div>
        </>
    );
};

export default PreparedDeck;
