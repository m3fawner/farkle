import React from 'react';
import Roller from '../roller/roller';

const FarkleGame = () => (
  <React.Fragment>
    <Roller numberOfDice={6} bankPoints={() => {}} />
  </React.Fragment>
);

export default FarkleGame;
