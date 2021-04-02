import React from 'react';
import Card from './Card.js';
import './CardTable.css';

import { MdClose } from 'react-icons/md';

const PreparedDeck = (props) => {
  const opnvDeck = [
    {
      body:
        'Wenn man überall mit ÖPNV hinkommt, sinkt der Bedarf an Autos, was ein Vorteil für die Umwelt wäre.',
      type: 'argument',
      judgeRating: 0,
      spectatorRating: 0,
    },
    {
      body:
        'Durch das Fördern von E-Motoren gehen wir als Vorbild für andere Länder voran.',
      type: 'argument',
      judgeRating: 0,
      spectatorRating: 0,
    },
    {
      body:
        'Ein großflächiger Umstieg auf ÖPNV würde weniger Autos in der Stadt und somit ein geringeres Unfallrisiko für Fußgänger und Radfahrer bedeuten.',
      type: 'argument',
      judgeRating: 0,
      spectatorRating: 0,
    },
    {
      body:
        'In dicht besiedelten Städten macht es keinen Sinn, wenn jeder mit dem Auto durch die Gegend fährt.',
      type: 'argument',
      judgeRating: 0,
      spectatorRating: 0,
    },
    {
      body: '46% der Nutzer sind unzufrieden mit der Pünktlichkeit des ÖPNV.',
      type: 'fact',
      source:
        'https://de.statista.com/statistik/studie/id/64571/dokument/oepnv/',
      judgeRating: 0,
      spectatorRating: 0,
    },
    {
      body:
        'Kostenlose ÖPNV-Versuche haben gezeigt, dass Autofahrer nicht einfach umsteigen.',
      type: 'fact',
      source: 'https://taz.de/Pro-und-Contra-kostenloser-OePNV/!5589087/',
      judgeRating: 0,
      spectatorRating: 0,
    },
    {
      body:
        'Finanziell schwachen Leuten wird Mobilität ermöglicht, die sie sich sonst nicht leisten könnten. Das wäre fairer für die Gesellschaft.',
      type: 'argument',
      judgeRating: 0,
      spectatorRating: 0,
    },
    {
      body: 'ÖPNV ist nie kostenlos: Wir zahlen mehr Steuern.',
      type: 'argument',
      judgeRating: 0,
      spectatorRating: 0,
    },
  ];

  const playCard = (c) => {
    console.log('card was clicked');
    c.role = props.role;

    props.sendMessage(c);
    props.hideDeck();
  };

  const listOfCards = opnvDeck.map((c, index) => {
    return (
      <div classname='d'>
        <Card
          size={'smol'}
          key={index}
          claim={c.body}
          type={c.type}
          source={c.source}
        />
        <button
          type='button'
          className='card-place-btn'
          onClick={() => playCard(c)}
        >
          Karte spielen
        </button>
      </div>
    );
  });

  return (
    <div className='modal-outer'>
      <div className='prepared-deck'>
        <div className='prepared-deck-cardlist'>{listOfCards}</div>
      </div>
      <button className='deck-prep-close' onClick={props.hideDeck}>
        <MdClose />
      </button>
    </div>
  );
};

export default PreparedDeck;
