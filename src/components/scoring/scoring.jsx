import React from 'react';
import PropTypes from 'prop-types';
import LocaleKeys from '../../locales/keys';
import Dice from '../dice/dice';
import './scoring.scss';

const Scoring = ({ currentScore, rollScore, previousRolls }, { t }) => (
  <div className="c-scoring">
    <h2 className="c-current-score">{t(LocaleKeys.CURRENT_SCORE, { currentScore })}</h2>
    <div className="c-previous-rolls">
      <h2 className="c-previous-rolls__label">{t(LocaleKeys.PREVIOUS_ROLLS)}</h2>
      {previousRolls.map(roll => (
        <div className="c-roll-score" key={roll.rollNumber}>
          {roll.values.map(value => (<Dice value={value} key={Math.random()} />))}
          <span className="c-roll-score__score">{roll.score}</span>
        </div>
      ))}
    </div>
    <h2 className="c-roll-score">{t(LocaleKeys.ROLL_SCORE, { rollScore })}</h2>
  </div>
);

Scoring.propTypes = {
  currentScore: PropTypes.number,
  rollScore: PropTypes.number,
  previousRolls: PropTypes.arrayOf(PropTypes.shape({
    rollNumber: PropTypes.number,
    values: PropTypes.arrayOf(PropTypes.number),
    score: PropTypes.number,
  })),
};
Scoring.defaultProps = {
  currentScore: 0,
  rollScore: 0,
  previousRolls: [],
};
Scoring.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default Scoring;
