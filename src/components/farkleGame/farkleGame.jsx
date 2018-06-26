import React from 'react';
import PropTypes from 'prop-types';
import Roller from '../roller/roller';
import Scoring from '../scoring/scoring.contextual';
import './farkleGame.scss';

const FarkleGame = ({
  bankScore,
  canBank,
  isFarkle,
  nextRollDiceCount,
  rollDice,
  selected,
  updateCurrentRollValues,
  updateSelectedValues,
}) => (
  <div className="c-farkle-game c-app-body">
    <Scoring />
    <Roller
      canBank={canBank}
      selected={selected}
      numberOfDice={nextRollDiceCount}
      bankScore={bankScore}
      isFarkle={isFarkle}
      rollDice={rollDice}
      updateCurrentRollValues={updateCurrentRollValues}
      updateSelectedValues={updateSelectedValues}
    />
  </div>
);

FarkleGame.propTypes = {
  bankScore: PropTypes.func.isRequired,
  canBank: PropTypes.bool.isRequired,
  isFarkle: PropTypes.bool.isRequired,
  nextRollDiceCount: PropTypes.number.isRequired,
  rollDice: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(PropTypes.bool).isRequired,
  updateCurrentRollValues: PropTypes.func.isRequired,
  updateSelectedValues: PropTypes.func.isRequired,
};

export default FarkleGame;
