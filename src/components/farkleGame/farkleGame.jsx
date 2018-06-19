import React from 'react';
import PropTypes from 'prop-types';
import Roller from '../roller/roller';
import Scoring from '../scoring/scoring';
import './farkleGame.scss';

const FarkleGame = ({ selected, updateSelectedValues }) => (
  <div className="c-farkle-game c-app-body">
    <Scoring />
    <Roller
      selected={selected}
      numberOfDice={6}
      bankPoints={() => {}}
      updateCurrentRollValues={() => {}}
      updateSelectedValues={updateSelectedValues}
    />
  </div>
);

FarkleGame.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.bool).isRequired,
  updateSelectedValues: PropTypes.func.isRequired,
};

export default FarkleGame;
