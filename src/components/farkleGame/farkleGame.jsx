import React from 'react';
import Roller from '../roller/roller';
import Scoring from '../scoring/scoring';
import './farkleGame.scss';

const FarkleGame = () => (
  <div className="c-farkle-game c-app-body">
    <Scoring />
    <Roller
      numberOfDice={6}
      bankPoints={() => {}}
      updateCurrentRollValues={(values) => {
        console.log(values);
      }}
      updateSelectedValues={(values) => {
        console.log(values);
      }}
    />
  </div>
);

export default FarkleGame;
