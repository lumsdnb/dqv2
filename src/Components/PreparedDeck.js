import React from 'react';
import Card from './Card.js';
import './CardTable.css';

import { MdClose } from 'react-icons/md';

const PreparedDeck = (props) => {
  const demoDeck = [
    [
      {
        body:
          'Wenn man überall mit ÖPNV hinkommt, sinkt der Bedarf an Autos, was ein Vorteil für die Umwelt wäre.',
        type: 'Argument',
        upVotes: 0,
        downVotes: 0,
      },
      {
        body:
          'Nicht alle Menschen nutzen den ÖPNV - diese sollten nicht mitbezahlen müssen',
        type: 'Argument',
        upVotes: 0,
        downVotes: 0,
      },
      {
        body:
          'Durch das Fördern von E-Motoren gehen wir als Vorbild für andere Länder voran.',
        type: 'Argument',
        upVotes: 0,
        downVotes: 0,
      },
      {
        body:
          'Ein großflächiger Umstieg auf ÖPNV würde weniger Autos in der Stadt und somit ein geringeres Unfallrisiko für Fußgänger und Radfahrer bedeuten.',
        type: 'Argument',
        upVotes: 0,
        downVotes: 0,
      },
      {
        body:
          'In dicht besiedelten Städten macht es keinen Sinn, wenn jeder mit dem Auto durch die Gegend fährt.',
        type: 'Argument',
        judgeRating: 0,
        spectatorRating: 0,
      },

      {
        body: 'ÖPNV ist zu Stoßzeiten eh schon überfüllt.',
        type: 'Argument',
        upVotes: 0,
        downVotes: 0,
      },
      {
        body: '46% der Nutzer sind unzufrieden mit der Pünktlichkeit des ÖPNV.',
        type: 'fact',
        source:
          'https://de.statista.com/statistik/studie/id/64571/dokument/oepnv/',
        upVotes: 0,
        downVotes: 0,
      },
      {
        body:
          'Kostenlose ÖPNV-Versuche haben gezeigt, dass Autofahrer nicht einfach umsteigen.',
        type: 'fact',
        source: 'https://taz.de/Pro-und-Contra-kostenloser-OePNV/!5589087/',
        upVotes: 0,
        downVotes: 0,
      },
      {
        body:
          'Finanziell schwachen Leuten wird Mobilität ermöglicht, die sie sich sonst nicht leisten könnten. Das wäre fairer für die Gesellschaft.',
        type: 'Argument',
        upVotes: 0,
        downVotes: 0,
      },
      {
        body: 'ÖPNV ist nie kostenlos: Wir zahlen mehr Steuern.',
        type: 'Argument',
        upVotes: 0,
        downVotes: 0,
      },
    ],
    ,
    [
      {
        body:
          'Fact: Straßenverkehr verursacht 18% des weltweiten CO2 Ausstoßes.',
        type: 'fact',
        source:
          'https://de.statista.com/statistik/daten/studie/317683/umfrage/verkehrsttraeger-anteil-co2-emissionen-fossile-brennstoffe/',
        upVotes: 0,
        downVotes: 0,
      },
      {
        body:
          'Durch das Fördern von E-Motoren gehen wir als Vorbild für andere Länder voran.',
        type: 'Argument',
        upVotes: 0,
        downVotes: 0,
      },
      {
        body:
          'Unsere Abhängigkeit von ausländischen Energielieferanten würde sinken.',
        type: 'Argument',
        upVotes: 0,
        downVotes: 0,
      },
      {
        body: '94% aller Fahrzeuge haben einen Verbrennungsmotor.',
        type: 'fact',
        source:
          'https://de.statista.com/statistik/daten/studie/572962/umfrage/anteil-der-jeweiligen-antriebsart-an-an-der-weltweiten-antriebsproduktion-bis-2025/',
        upVotes: 0,
        downVotes: 0,
      },
      {
        body: 'Verbrennungsmotoren haben keinerlei ökologische Vorteile.',
        type: 'Argument',
        upVotes: 0,
        downVotes: 0,
      },
      {
        body:
          'Statt Verbrenner zu verbieten, sollte in nachhaltige synthetische Treibstoffe investiert werden.',
        type: 'Argument',
        upVotes: 0,
        downVotes: 0,
      },
      {
        body:
          'Ein generelles Verbot würde alle existierenden Geräte mit solchen Motoren obsolet machen und einen massiven wirtschaftlichen Schaden anrichten.',
        type: 'Argument',
        upVotes: 0,
        downVotes: 0,
      },
      {
        body:
          'Ein Verbot aus umweltschutzgründen macht keinen Sinn, wenn Alternativen wie Elektroautos immer noch nicht nachhaltig sind.',
        type: 'Argument',
        upVotes: 0,
        downVotes: 0,
      },
    ],
    [
      {
        body:
          'Eine Mietpreisbremse würde nicht dazu führen, dass finanziell schwache Gruppen eine Wohnung tatsächlich bekämen. Mieter würden sich trotzdem für die Familien mit stabilem Einkommen entscheiden, und diese würden dann noch mehr profitieren als vorher.',
        type: 'Argument',
        upVotes: 0,
        downVotes: 0,
      },
      {
        body:
          'Niemand MUSS in einer Großstadt leben. Wer sich Wohnungen in beliebten Gebieten mit Platzmangel nicht leisten kann, soll sich an weniger dicht besiedelten Orten Wohnraum suchen.',
        type: 'Argument',
        upVotes: 0,
        downVotes: 0,
      },
      {
        body:
          'Eine Mietpreisbremse alleine reicht nicht aus, um finanziell schwache Gruppen zu unterstützen.',
        type: 'Argument',
        upVotes: 0,
        downVotes: 0,
      },
    ],
  ];

  const playCard = (c) => {
    console.log('card was clicked');
    c.role = props.role;

    props.sendMessage(c);
    props.hideDeck();
  };

  const listOfNewCards = props.newCards.map((c, index) => {
    if (props.newCards) {
      return (
        <div classname='d'>
          <Card
            size={'smol'}
            key={index}
            claim={c.body}
            type={c.type}
            source={c.source}
            upVotes={c.upVotes}
            downVotes={c.downVotes}
          />
          {props.canSend ? (
            <button
              type='button'
              className='card-place-btn'
              onClick={() => playCard(c)}
            >
              Karte spielen
            </button>
          ) : null}
        </div>
      );
    }
  });

  const listOfCards = demoDeck[props.topicID === 0 ? 0 : props.topicID + 1].map(
    (c, index) => {
      return (
        <div classname='d'>
          <Card
            size={'smol'}
            key={index}
            claim={c.body}
            type={c.type}
            source={c.source}
            upVotes={c.upVotes}
            downVotes={c.downVotes}
          />
          {props.canSend ? (
            <button
              type='button'
              className='card-place-btn'
              onClick={() => playCard(c)}
            >
              Karte legen
            </button>
          ) : null}
        </div>
      );
    }
  );

  return (
    <div className='modal-outer'>
      <div className='prepared-deck'>
        <div className='prepared-deck-cardlist'>
          {props.topicID === -1 ? null : (
            <>
              <h3 className='card-deck-title flex100'>Deck: </h3>
              {listOfCards}
            </>
          )}
          <br></br>
          <hr className='flex100' />
          {listOfNewCards === [] ? null : (
            <h3 className='card-deck-title flex100'>Neue Karten</h3>
          )}
          {listOfNewCards}
        </div>
      </div>
      <button className='deck-prep-close' onClick={props.hideDeck}>
        <MdClose />
      </button>
    </div>
  );
};

export default PreparedDeck;
