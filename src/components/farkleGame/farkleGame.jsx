import React from 'react';
import PropTypes from 'prop-types';
import Roller from '../roller/roller';
import Scoring from '../scoring/scoring.contextual';
import './farkleGame.scss';

const FarkleGame = ({
  nextRollDiceCount,
  rollDice,
  selected,
  updateCurrentRollValues,
  updateSelectedValues,
}) => (
  <div className="c-farkle-game c-app-body">
    <Scoring />
    <Roller
      selected={selected}
      numberOfDice={nextRollDiceCount}
      bankPoints={() => {}}
      rollDice={rollDice}
      updateCurrentRollValues={updateCurrentRollValues}
      updateSelectedValues={updateSelectedValues}
    />
  </div>
);

FarkleGame.propTypes = {
  nextRollDiceCount: PropTypes.number.isRequired,
  rollDice: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(PropTypes.bool).isRequired,
  updateCurrentRollValues: PropTypes.func.isRequired,
  updateSelectedValues: PropTypes.func.isRequired,
};

export default FarkleGame;
