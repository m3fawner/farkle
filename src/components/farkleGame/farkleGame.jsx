import React from 'react';
import Roller from '../roller/roller.contextual';
import Scoring from '../scoring/scoring.contextual';
import './farkleGame.scss';

const FarkleGame = () => (
  <div className="c-farkle-game c-app-body">
    <Scoring />
    <Roller />
  </div>
);

FarkleGame.propTypes = {};

export default FarkleGame;
