import React from 'react';
import Card from './Card.js';
import './CardTable.css';

import { MdClose } from 'react-icons/md';

const PreparedDeck = (props) => {
  const copiedJSON = [
    {
      body:
        'Wenn man überall mit ÖPNV hinkommt, sinkt der Bedarf an Autos, was ein Vorteil für die Umwelt wäre.',
      type: 'argument',
    },
    {
      body:
        'Durch das Fördern von E-Motoren gehen wir als Vorbild für andere Länder voran.',
      type: 'argument',
    },
    {
      body:
        'Ein großflächiger Umstieg auf ÖPNV würde weniger Autos in der Stadt und somit ein geringeres Unfallrisiko für Fußgänger und Radfahrer bedeuten.',
      type: 'argument',
    },
    {
      body:
        'In dicht besiedelten Städten macht es keinen Sinn, wenn jeder mit dem Auto durch die Gegend fährt.',
      type: 'argument',
    },
    {
      body: '46% der Nutzer sind unzufrieden mit der Pünktlichkeit des ÖPNV.',
      type: 'fact',
      source:
        'https://de.statista.com/statistik/studie/id/64571/dokument/oepnv/',
    },
    {
      body:
        'Kostenlose ÖPNV-Versuche haben gezeigt, dass Autofahrer nicht einfach umsteigen.',
      type: 'fact',
      source: 'https://taz.de/Pro-und-Contra-kostenloser-OePNV/!5589087/',
    },
    {
      body:
        'Finanziell schwachen Leuten wird Mobilität ermöglicht, die sie sich sonst nicht leisten könnten. Das wäre fairer für die Gesellschaft.',
      type: 'argument',
    },
    {
      body: 'ÖPNV ist nie kostenlos: Wir zahlen mehr Steuern.',
      type: 'argument',
    },
  ];

  const playCard = () => {
    console.log('card was clicked');
    props.hideDeck();
  };
  const listOfCards = copiedJSON.map((c, index) => {
    return (
      <button className='preview-btn' onClick={playCard}>
        <Card size={'smol'} key={index} claim={c.body} type={c.type} />
      </button>
    );
  });

  return (
    <div className='modal-outer'>
      <div className='prepared-deck'>
        <div classname='prepared-deck-cardlist'>{listOfCards}</div>
      </div>
      <button className='deck-prep-close' onClick={props.hideDeck}>
        <MdClose />
      </button>
    </div>
  );
};

export default PreparedDeck;
